import { type FieldPath } from "react-hook-form";
import { type LucideIcon } from "lucide-react";

export type AccountType = "personal" | "sme" | "organization";

export type DocumentApprovalStatus = "pending" | "approved" | "rejected" | "uploading";

export type SignupFormValues = {
  accountType: AccountType;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  country: string;
  businessName: string;
  registrationNumber: string;
  taxId: string;
  industry: string;
  website: string;
  teamSize: string;
  idType: string;
  idNumber: string;
  dateOfBirth: string;
  issuingCountry: string;
  residentialAddress: string;
  city: string;
  idDocument: FileList;
  proofOfAddress: FileList;
  businessDocument: FileList;
  selfie: FileList;
  kycConsent: boolean;
};

export type AccountTypeOption = {
  value: AccountType;
  label: string;
  detail: string;
  icon: LucideIcon;
};

export type Step = {
  title: string;
  icon: LucideIcon;
};

export type DocumentApprovalState = {
  idDocument: DocumentApprovalStatus;
  proofOfAddress: DocumentApprovalStatus;
  businessDocument: DocumentApprovalStatus;
  selfie: DocumentApprovalStatus;
};
