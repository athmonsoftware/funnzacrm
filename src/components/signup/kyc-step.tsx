import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getBusinessDocumentLabel } from "./constants";
import { DocumentApprovalIndicator } from "./document-approval-indicator";
import { type AccountType, type DocumentApprovalState } from "./types";

export function KYCStep({
  accountType,
  register,
  errors,
  documentApproval,
  handleGovernmentIdUpload,
  handleSelfieUpload,
  handleBusinessDocUpload,
  handleProofAddressUpload,
}: {
  accountType: AccountType;
  register: any;
  errors: any;
  documentApproval: DocumentApprovalState;
  handleGovernmentIdUpload: (file: File) => Promise<void>;
  handleSelfieUpload: (file: File) => Promise<void>;
  handleBusinessDocUpload: (file: File) => Promise<void>;
  handleProofAddressUpload: (file: File) => Promise<void>;
}) {
  const businessDocumentLabel = getBusinessDocumentLabel(accountType);

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-base font-semibold">Identity verification</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          KYC is required for every Funza workspace before account activation.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="id-type" className="text-sm font-semibold">
            ID type
          </FieldLabel>
          <select
            id="id-type"
            aria-invalid={Boolean(errors.idType)}
            className="h-11 w-full rounded-md border border-input bg-input/20 px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20"
            {...register("idType", {
              required: "ID type is required",
            })}
          >
            <option value="national_id">National ID</option>
            <option value="passport">Passport</option>
            <option value="drivers_license">Driver&apos;s license</option>
            <option value="voter_id">Voter ID</option>
          </select>
          {errors.idType && (
            <FieldDescription className="text-destructive">
              {errors.idType.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="id-number" className="text-sm font-semibold">
            ID number
          </FieldLabel>
          <Input
            id="id-number"
            type="text"
            placeholder="GHA-000000000-0"
            aria-invalid={Boolean(errors.idNumber)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("idNumber", {
              required: "ID number is required",
            })}
          />
          {errors.idNumber && (
            <FieldDescription className="text-destructive">
              {errors.idNumber.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="date-of-birth" className="text-sm font-semibold">
            Date of birth
          </FieldLabel>
          <Input
            id="date-of-birth"
            type="date"
            aria-invalid={Boolean(errors.dateOfBirth)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("dateOfBirth", {
              required: "Date of birth is required",
            })}
          />
          {errors.dateOfBirth && (
            <FieldDescription className="text-destructive">
              {errors.dateOfBirth.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel
            htmlFor="issuing-country"
            className="text-sm font-semibold"
          >
            Issuing country
          </FieldLabel>
          <Input
            id="issuing-country"
            type="text"
            placeholder="Ghana"
            aria-invalid={Boolean(errors.issuingCountry)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("issuingCountry", {
              required: "Issuing country is required",
            })}
          />
          {errors.issuingCountry && (
            <FieldDescription className="text-destructive">
              {errors.issuingCountry.message}
            </FieldDescription>
          )}
        </Field>

        <Field className="sm:col-span-2">
          <FieldLabel
            htmlFor="residential-address"
            className="text-sm font-semibold"
          >
            Residential address
          </FieldLabel>
          <Input
            id="residential-address"
            type="text"
            placeholder="Street, area, house number"
            autoComplete="street-address"
            aria-invalid={Boolean(errors.residentialAddress)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("residentialAddress", {
              required: "Residential address is required",
            })}
          />
          {errors.residentialAddress && (
            <FieldDescription className="text-destructive">
              {errors.residentialAddress.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="city" className="text-sm font-semibold">
            City
          </FieldLabel>
          <Input
            id="city"
            type="text"
            placeholder="Accra"
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.city)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("city", {
              required: "City is required",
            })}
          />
          {errors.city && (
            <FieldDescription className="text-destructive">
              {errors.city.message}
            </FieldDescription>
          )}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="id-document" className="text-sm font-semibold">
            Government ID
          </FieldLabel>
          <Input
            type="file"
            accept="image/*,.pdf"
            {...register("idDocument")}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              await handleGovernmentIdUpload(file);
            }}
          />
          <div className="mt-1">
            <DocumentApprovalIndicator status={documentApproval.idDocument} />
          </div>
          {errors.idDocument && (
            <FieldDescription className="text-destructive">
              {errors.idDocument.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel
            htmlFor="proof-of-address"
            className="text-sm font-semibold"
          >
            Proof of address
          </FieldLabel>
          <Input
            id="proof-of-address"
            type="file"
            accept="image/*,.pdf"
            aria-invalid={Boolean(errors.proofOfAddress)}
            className="h-11 px-3 py-2 text-sm md:text-sm"
            {...register("proofOfAddress", {
              validate: (files: any) =>
                Boolean(files?.length) || "Upload proof of address",
            })}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              await handleProofAddressUpload(file);
            }}
          />
          <div className="mt-1">
            <DocumentApprovalIndicator status={documentApproval.proofOfAddress} />
          </div>
          {errors.proofOfAddress && (
            <FieldDescription className="text-destructive">
              {errors.proofOfAddress.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel
            htmlFor="business-document"
            className="text-sm font-semibold"
          >
            {businessDocumentLabel}
          </FieldLabel>
          <Input
            id="business-document"
            type="file"
            accept="image/*,.pdf"
            aria-invalid={Boolean(errors.businessDocument)}
            className="h-11 px-3 py-2 text-sm md:text-sm"
            {...register("businessDocument", {
              validate: (files: any) =>
                Boolean(files?.length) ||
                `Upload ${businessDocumentLabel.toLowerCase()}`,
            })}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              await handleBusinessDocUpload(file);
            }}
          />
          <div className="mt-1">
            <DocumentApprovalIndicator status={documentApproval.businessDocument} />
          </div>
          {errors.businessDocument && (
            <FieldDescription className="text-destructive">
              {errors.businessDocument.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="selfie" className="text-sm font-semibold">
            Selfie check
          </FieldLabel>
          <Input
            id="selfie"
            type="file"
            accept="image/*"
            aria-invalid={Boolean(errors.selfie)}
            className="h-11 px-3 py-2 text-sm md:text-sm"
            {...register("selfie", {
              validate: (files: any) =>
                Boolean(files?.length) || "Upload a selfie image",
            })}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              await handleSelfieUpload(file);
            }}
          />
          <div className="mt-1">
            <DocumentApprovalIndicator status={documentApproval.selfie} />
          </div>
          {errors.selfie && (
            <FieldDescription className="text-destructive">
              {errors.selfie.message}
            </FieldDescription>
          )}
        </Field>
      </div>

      <Field>
        <label
          htmlFor="kyc-consent"
          className="flex gap-3 rounded-md border border-border bg-input/20 p-4 text-sm"
        >
          <input
            id="kyc-consent"
            type="checkbox"
            className="mt-1 size-4 shrink-0 accent-foreground"
            aria-invalid={Boolean(errors.kycConsent)}
            {...register("kycConsent", {
              required:
                "Consent is required to complete identity verification",
            })}
          />
          <span>
            I confirm the information provided is accurate and I authorize
            Funza CRM to verify my identity and business documents.
          </span>
        </label>
        {errors.kycConsent && (
          <FieldDescription className="text-destructive">
            {errors.kycConsent.message}
          </FieldDescription>
        )}
      </Field>
    </section>
  );
}
