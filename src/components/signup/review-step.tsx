import { CheckCircle } from "lucide-react";
import { getAccountTypeLabel } from "./constants";
import { type AccountType, type SignupFormValues } from "./types";

export function ReviewStep({
  accountType,
  businessDocumentLabel,
  values,
}: {
  accountType: AccountType;
  businessDocumentLabel: string;
  values: SignupFormValues;
}) {
  const items = [
    ["Category", getAccountTypeLabel(accountType)],
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Country", values.country],
    ["Workspace", values.businessName],
    ["ID type", values.idType?.replace(/_/g, " ")],
    ["ID number", values.idNumber],
    ["Address", `${values.residentialAddress}, ${values.city}`],
  ];

  const documents = [
    ["Government ID", values.idDocument?.[0]?.name],
    ["Proof of address", values.proofOfAddress?.[0]?.name],
    [businessDocumentLabel, values.businessDocument?.[0]?.name],
    ["Selfie check", values.selfie?.[0]?.name],
  ];

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-base font-semibold">Review registration</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your identity verification must be complete before submission.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="min-h-16 rounded-md border border-border bg-input/20 p-3"
          >
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              {label}
            </p>
            <p className="mt-1 truncate text-sm font-semibold capitalize">
              {value || "Not provided"}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-md border border-funza-primary/30 bg-funza-primary-light p-4 text-funza-primary">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <CheckCircle className="size-4" />
          KYC ready for submission
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {documents.map(([label, value]) => (
            <p key={label} className="truncate text-xs">
              <span className="font-semibold">{label}:</span>{" "}
              {value || "Missing"}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
