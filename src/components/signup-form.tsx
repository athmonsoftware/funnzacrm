"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import { CheckCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { signUp, signInWithGoogle, useSession } from "@/lib/auth-client";

import {
  type SignupFormValues,
  type AccountType,
  type DocumentApprovalStatus,
} from "./signup/types";
import {
  accountTypes,
  steps,
  baseFields,
  identityFields,
  getProfileFields,
  getBusinessDocumentLabel,
} from "./signup/constants";
import { AccountTypeStep } from "./signup/account-type-step";
import { ProfileStep } from "./signup/profile-step";
import { KYCStep } from "./signup/kyc-step";
import { ReviewStep } from "./signup/review-step";
import {
  uploadGovernmentId,
  uploadSelfie,
  uploadBusinessDoc,
  uploadProofAddress,
} from "./signup/upload-handlers";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [step, setStep] = useState(0);
  const [documentApproval, setDocumentApproval] = useState<{
    idDocument: DocumentApprovalStatus;
    proofOfAddress: DocumentApprovalStatus;
    businessDocument: DocumentApprovalStatus;
    selfie: DocumentApprovalStatus;
  }>({
    idDocument: "pending",
    proofOfAddress: "pending",
    businessDocument: "pending",
    selfie: "pending",
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    defaultValues: {
      accountType: "personal",
      idType: "national_id",
      country: "Ghana",
      issuingCountry: "Ghana",
      kycConsent: false,
    },
    mode: "onTouched",
  });

  const accountType = useWatch({ control, name: "accountType" }) ?? "personal";
  const password = useWatch({ control, name: "password" }) ?? "";
  const formValues = useWatch({ control });
  const businessDocumentLabel = getBusinessDocumentLabel(accountType);
  const selectedAccountType = useMemo(
    () => accountTypes.find((type) => type.value === accountType),
    [accountType],
  );

  const { data: session } = useSession();

  // Save draft on form changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (step > 0 && session?.user?.id) {
        saveDraft();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [accountType, password, step, session]);

  useEffect(() => {
    async function loadDraft() {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/kyc/draft`;

      console.log("Loading draft from:", url);

      try {
        const res = await fetch(url, {
          credentials: "include",
        });

        console.log("Response status:", res.status);

        const text = await res.text();

        console.log("Response body:", text);

        const result = text ? JSON.parse(text) : null;

        if (!result?.data) {
          console.log("No draft found");
          return;
        }

        console.log("Draft data to restore:", result.data);

        Object.entries(result.data).forEach(([key, value]) => {
          console.log(`Setting ${key} to:`, value);
          setValue(key as any, value as any);
        });

        // Restore step position if saved
        if (result.data.step !== undefined) {
          setStep(result.data.step);
        }
      } catch (error) {
        console.error("Failed to load draft:", error);
        console.error("URL was:", url);
      }
    }

    loadDraft();
  }, [setValue]);

  async function saveDraft() {
    if (!session?.user?.id) {
      console.log("[KYC] No user session, skipping draft save");
      return;
    }

    try {
      const data = getValues();

      // Exclude sensitive fields from draft
      const {
        password,
        confirmPassword,
        idDocument,
        proofOfAddress,
        businessDocument,
        selfie,
        ...safeData
      } = data;

      const draftData = {
        ...safeData,
        step,
        userId: session.user.id,
      };

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/kyc/draft`;

      console.log("[KYC] Saving draft to:", url);
      console.log("[KYC] Payload:", draftData);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draftData),
        credentials: "include",
      });

      const responseText = await res.text();

      console.log("[KYC] Response status:", res.status);
      console.log("[KYC] Response body:", responseText);

      if (!res.ok) {
        throw new Error(`Failed to save draft: ${res.status}`);
      }

      console.log("[KYC] Draft saved successfully");
    } catch (error) {
      console.error("[KYC] Error saving draft:", error);
    }
  }

  async function goNext() {
    // STEP 0 → ACCOUNT TYPE
    if (step === 0) {
      const isValid = await trigger(["accountType"]);
      if (!isValid) return;
      setStep(1);
      return;
    }

    // STEP 1 → CREATE ACCOUNT
    if (step === 1) {
      const isValid = await trigger([
        ...baseFields,
        ...getProfileFields(accountType),
      ]);

      if (!isValid) {
        toast.error("Please complete required fields.");
        return;
      }

      setIsCreatingAccount(true);

      const data = getValues();

      const { error, data: result } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      setIsCreatingAccount(false);

      if (error) {
        toast.error(error.message ?? "Signup failed");
        return;
      }

      if (!result?.user?.id) {
        toast.error("User creation failed");
        return;
      }
      setStep(2);
      await saveDraft();
      return;
    }

    // STEP 2 → KYC VALIDATION ONLY
    if (step === 2) {
      const isValid = await trigger(identityFields);

      if (!isValid) {
        toast.error("Please complete KYC fields.");
        return;
      }

      // Check if all documents are approved
      const requiredDocs = ["idDocument", "proofOfAddress", "selfie"];
      if (accountType !== "personal") {
        requiredDocs.push("businessDocument");
      }

      const allApproved = requiredDocs.every(
        (doc) =>
          documentApproval[doc as keyof typeof documentApproval] === "approved",
      );

      if (!allApproved) {
        const pendingDocs = requiredDocs.filter(
          (doc) =>
            documentApproval[doc as keyof typeof documentApproval] !==
            "approved",
        );
        toast.error(
          `Please wait for all documents to be approved. Pending: ${pendingDocs.join(", ")}`,
        );
        return;
      }

      setStep(3);
      await saveDraft();
    }
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  const handleGovernmentIdUpload = async (file: File) => {
    setDocumentApproval((prev) => ({ ...prev, idDocument: "uploading" }));

    try {
      const result = await uploadGovernmentId(file, session?.user?.id || "");
      console.log("Government ID response:", result);
      if (result.success) {
        setValue("idNumber", result.extractedData.id_number);
        setValue("dateOfBirth", result.extractedData.date_of_birth);

        if (result.extractedData.full_name) {
          setValue("name", result.extractedData.full_name);
        }

        setDocumentApproval((prev) => ({ ...prev, idDocument: "approved" }));
        toast.success("Ghana Card verified and approved");
      } else {
        setDocumentApproval((prev) => ({ ...prev, idDocument: "pending" }));
        toast.error("Verification pending approval");
      }
    } catch (error) {
      setDocumentApproval((prev) => ({ ...prev, idDocument: "rejected" }));
      toast.error(error instanceof Error ? error.message : "Upload failed");
      console.error("UPLOAD FAILED", error);
    }
  };

  const handleSelfieUpload = async (file: File) => {
    setDocumentApproval((prev) => ({ ...prev, selfie: "uploading" }));

    try {
      const result = await uploadSelfie(file, session?.user?.id || "");

      console.log("🤳 FULL Selfie Response:", result);
      console.log("📦 result.data:", result?.data);

      if (!result.success) {
        console.log("❌ Upload failed:", result?.error);

        setDocumentApproval((prev) => ({ ...prev, selfie: "rejected" }));
        toast.error(result?.error || "Upload failed");
        return;
      }

      const status = result?.data?.status;

      console.log("📊 Extracted status:", status);

      if (status === "approved") {
        console.log("✅ APPROVED");

        setDocumentApproval((prev) => ({ ...prev, selfie: "approved" }));
        toast.success("Selfie verified and approved");
      } else if (status === "pending") {
        console.log("⏳ PENDING");

        setDocumentApproval((prev) => ({ ...prev, selfie: "pending" }));
        toast("Selfie pending approval");
      } else {
        console.log("❌ REJECTED:", status);

        setDocumentApproval((prev) => ({ ...prev, selfie: "rejected" }));
        toast.error("Selfie rejected");
      }
    } catch (error) {
      console.error("💥 Upload error:", error);

      setDocumentApproval((prev) => ({ ...prev, selfie: "rejected" }));
      toast.error(error instanceof Error ? error.message : "Upload failed");
    }
  };

  const handleBusinessDocUpload = async (file: File) => {
    setDocumentApproval((prev) => ({
      ...prev,
      businessDocument: "uploading",
    }));

    try {
      const result = await uploadBusinessDoc(file, session?.user?.id || "");

      console.log("📄 Business Doc FULL response:", result);
      console.log("📦 verification object:", result?.verification);
      console.log("📊 status:", result?.verification?.status);

      if (!result.success) {
        setDocumentApproval((prev) => ({
          ...prev,
          businessDocument: "rejected",
        }));
        toast.error(result?.error || "Upload failed");
        return;
      }

      const status = result?.verification?.status;

      if (status === "approved") {
        setDocumentApproval((prev) => ({
          ...prev,
          businessDocument: "approved",
        }));
        toast.success("Business document verified and approved");
      } else if (status === "pending") {
        setDocumentApproval((prev) => ({
          ...prev,
          businessDocument: "pending",
        }));
        toast("Business document pending approval");
      } else {
        setDocumentApproval((prev) => ({
          ...prev,
          businessDocument: "rejected",
        }));
        toast.error("Business document rejected");
      }
    } catch (error) {
      console.error("💥 Business doc upload error:", error);

      setDocumentApproval((prev) => ({
        ...prev,
        businessDocument: "rejected",
      }));

      toast.error(error instanceof Error ? error.message : "Upload failed");
    }
  };

  const handleProofAddressUpload = async (file: File) => {
    setDocumentApproval((prev) => ({
      ...prev,
      proofOfAddress: "uploading",
    }));

    try {
      const result = await uploadProofAddress(file, session?.user?.id || "");

      console.log("📄 Proof of Address response:", result);

      if (!result.success) {
        setDocumentApproval((prev) => ({
          ...prev,
          proofOfAddress: "rejected",
        }));
        toast.error(result?.message || "Upload failed");
        return;
      }

      const status = result?.data?.status;

      console.log("📊 Status:", status);

      if (status === "approved") {
        setDocumentApproval((prev) => ({
          ...prev,
          proofOfAddress: "approved",
        }));
        toast.success("Proof of address verified and approved");
      } else if (status === "pending") {
        setDocumentApproval((prev) => ({
          ...prev,
          proofOfAddress: "pending",
        }));
        toast("Proof of address pending approval");
      } else {
        setDocumentApproval((prev) => ({
          ...prev,
          proofOfAddress: "rejected",
        }));
        toast.error("Proof of address rejected");
      }
    } catch (error) {
      setDocumentApproval((prev) => ({
        ...prev,
        proofOfAddress: "rejected",
      }));

      toast.error(error instanceof Error ? error.message : "Upload failed");
      console.error("UPLOAD FAILED", error);
    }
  };
  async function submitKYC() {
    const requiredDocs = ["idDocument", "proofOfAddress", "selfie"];

    if (accountType !== "personal") {
      requiredDocs.push("businessDocument");
    }

    const allApproved = requiredDocs.every(
      (doc) =>
        documentApproval[doc as keyof typeof documentApproval] === "approved",
    );

    if (!allApproved) {
      toast.error("Please complete and approve all KYC documents");
      return;
    }

    try {
      setIsCreatingAccount(true);

      const data = getValues();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/kyc/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userId: session?.user?.id,
            ...data,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to complete registration");
      }

      toast.success("Account created. Check your email for verification.");

      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to complete registration",
      );
    } finally {
      setIsCreatingAccount(false);
    }
  }
  return (
    <Card className={cn("gap-6 py-7", className)} {...props}>
      <CardHeader className="space-y-4 px-6 sm:px-8">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create your Funza account
          </CardTitle>
          <CardDescription className="text-sm">
            Choose your workspace type and complete verification before account
            activation.
          </CardDescription>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {steps.map((item, index) => {
            const StepIcon = item.icon;
            const isActive = index === step;
            const isDone = index < step;

            return (
              <div
                key={item.title}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 rounded-md border px-2 text-center text-xs font-semibold transition",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : isDone
                      ? "border-[#16a34a] bg-[#e8f6ef] text-[#047857]"
                      : "border-border bg-muted/40 text-muted-foreground",
                )}
              >
                <StepIcon className="size-4" />
                <span className="hidden sm:inline">{item.title}</span>
              </div>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-6 sm:px-8">
        <form onSubmit={(e) => e.preventDefault()}>
          <FieldGroup className="gap-6">
            {step === 0 && (
              <AccountTypeStep
                accountType={accountType}
                setValue={setValue}
                errors={errors}
              />
            )}

            {step === 1 && (
              <ProfileStep
                accountType={accountType}
                selectedAccountType={selectedAccountType}
                register={register}
                errors={errors}
                password={password}
              />
            )}

            {step === 2 && (
              <KYCStep
                accountType={accountType}
                register={register}
                errors={errors}
                documentApproval={documentApproval}
                handleGovernmentIdUpload={handleGovernmentIdUpload}
                handleSelfieUpload={handleSelfieUpload}
                handleBusinessDocUpload={handleBusinessDocUpload}
                handleProofAddressUpload={handleProofAddressUpload}
              />
            )}

            {step === 3 && (
              <>
                {console.log("ReviewStep formValues:", formValues)}
                <ReviewStep
                  accountType={accountType}
                  businessDocumentLabel={businessDocumentLabel}
                  values={formValues as SignupFormValues}
                />
              </>
            )}

            <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="h-11 gap-2 text-sm font-semibold sm:w-auto"
                >
                  <ChevronLeft className="size-4" />
                  Back
                </Button>
              ) : null}

              {step < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={goNext}
                  disabled={isCreatingAccount}
                  className="h-11 gap-2 text-sm font-semibold sm:ml-auto sm:w-auto"
                >
                  {step === 1 && isCreatingAccount ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="size-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={submitKYC}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="size-4" />
                      Create account
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="space-y-2 text-center">
              <Button
                onClick={() => signInWithGoogle()}
                variant="outline"
                type="button"
                className="h-11 w-full text-sm font-semibold"
              >
                Sign up with Google
              </Button>
              <FieldDescription className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold">
                  Sign in
                </Link>
              </FieldDescription>
              <FieldDescription className="text-center text-sm">
                <Link href="/forgot-password" className="font-medium">
                  Forgot your password?
                </Link>
              </FieldDescription>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
