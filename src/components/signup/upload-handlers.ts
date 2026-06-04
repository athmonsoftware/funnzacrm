import { type DocumentApprovalStatus } from "./types";

export async function uploadGovernmentId(file: File, userId: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/kyc/tier2/government-id`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    },
  );

  const result = await res.json();

  console.log("UPLOAD RESPONSE:", result);

  if (!res.ok) {
    throw new Error(
      result.message || result.error || "Government ID upload failed",
    );
  }
  return result;
}

export async function uploadSelfie(file: File, userId: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/kyc/tier2/selfie`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Selfie upload failed");
  }

  return result;
}

export async function uploadBusinessDoc(file: File, userId: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/kyc/tier2/business-doc`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Business document upload failed");
  }

  return result;
}

export async function uploadProofAddress(file: File, userId: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/kyc/tier3/proof-address`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Proof of address upload failed");
  }

  return result;
}

export type SetDocumentApproval = React.Dispatch<
  React.SetStateAction<{
    idDocument: DocumentApprovalStatus;
    proofOfAddress: DocumentApprovalStatus;
    businessDocument: DocumentApprovalStatus;
    selfie: DocumentApprovalStatus;
  }>
>;

export function createUploadHandler(
  uploadFn: (file: File) => Promise<any>,
  setDocumentApproval: SetDocumentApproval,
  docKey: keyof ReturnType<typeof setDocumentApproval>,
  successMessage: string,
  pendingMessage: string,
) {
  return async (file: File) => {
    setDocumentApproval((prev) => ({ ...prev, [docKey]: "uploading" }));

    try {
      const result = await uploadFn(file);

      if (result.approved || result.success) {
        setDocumentApproval((prev) => ({ ...prev, [docKey]: "approved" }));
        return { success: true, data: result };
      } else {
        setDocumentApproval((prev) => ({ ...prev, [docKey]: "pending" }));
        return { success: false, data: result };
      }
    } catch (error) {
      setDocumentApproval((prev) => ({ ...prev, [docKey]: "rejected" }));
      throw error;
    }
  };
}
