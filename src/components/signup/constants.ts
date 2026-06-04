import { User, Building, Users, Fingerprint, CheckCircle } from "lucide-react";
import { type FieldPath } from "react-hook-form";
import { type AccountType, type SignupFormValues, type AccountTypeOption, type Step } from "./types";

export const accountTypes: AccountTypeOption[] = [
  {
    value: "personal",
    label: "Personal",
    detail: "Single business owner",
    icon: User,
  },
  {
    value: "sme",
    label: "SME",
    detail: "Growing business team",
    icon: Building,
  },
  {
    value: "organization",
    label: "Organization",
    detail: "Company or institution",
    icon: Users,
  },
];

export const steps: Step[] = [
  { title: "Account type", icon: User },
  { title: "Profile", icon: Building },
  { title: "KYC", icon: Fingerprint },
  { title: "Review", icon: CheckCircle },
];

export const baseFields: FieldPath<SignupFormValues>[] = [
  "accountType",
  "name",
  "email",
  "password",
  "confirmPassword",
  "phone",
  "country",
];

export const identityFields: FieldPath<SignupFormValues>[] = [
  "idType",
  "idNumber",
  "dateOfBirth",
  "issuingCountry",
  "residentialAddress",
  "city",
  "idDocument",
  "proofOfAddress",
  "businessDocument",
  "selfie",
  "kycConsent",
];

export function getProfileFields(
  accountType: AccountType
): FieldPath<SignupFormValues>[] {
  if (accountType === "personal") {
    return ["businessName", "industry"];
  }

  return [
    "businessName",
    "registrationNumber",
    "taxId",
    "industry",
    "teamSize",
  ];
}

export function getBusinessDocumentLabel(accountType: AccountType) {
  if (accountType === "personal") return "Business ownership proof";
  if (accountType === "sme") return "Business registration document";
  return "Organization registration document";
}

export function getAccountTypeLabel(accountType: AccountType) {
  return accountTypes.find((type) => type.value === accountType)?.label ?? "";
}

export function hasFile(files?: FileList) {
  return Boolean(files?.length);
}
