//this is the old code just in case you dont like the changes that i made

// "use client";

// import { useMemo, useState } from "react";
// import { useForm, useWatch, type FieldPath } from "react-hook-form";
// import Link from "next/link";
// import {
//   Building,
//   CheckCircle,
//   ChevronLeft,
//   ChevronRight,
//   Fingerprint,
//   Loader2,
//   User,
//   Users,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { signUp, signInWithGoogle } from "@/lib/auth-client";

// type AccountType = "personal" | "sme" | "organization";

// type SignupFormValues = {
//   accountType: AccountType;
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   phone: string;
//   country: string;
//   businessName: string;
//   registrationNumber: string;
//   taxId: string;
//   industry: string;
//   website: string;
//   teamSize: string;
//   idType: string;
//   idNumber: string;
//   dateOfBirth: string;
//   issuingCountry: string;
//   residentialAddress: string;
//   city: string;
//   idDocument: FileList;
//   proofOfAddress: FileList;
//   businessDocument: FileList;
//   selfie: FileList;
//   kycConsent: boolean;
// };

// const accountTypes: Array<{
//   value: AccountType;
//   label: string;
//   detail: string;
//   icon: typeof User;
// }> = [
//   {
//     value: "personal",
//     label: "Personal",
//     detail: "Single business owner",
//     icon: User,
//   },
//   {
//     value: "sme",
//     label: "SME",
//     detail: "Growing business team",
//     icon: Building,
//   },
//   {
//     value: "organization",
//     label: "Organization",
//     detail: "Company or institution",
//     icon: Users,
//   },
// ];

// const steps = [
//   { title: "Account type", icon: User },
//   { title: "Profile", icon: Building },
//   { title: "KYC", icon: Fingerprint },
//   { title: "Review", icon: CheckCircle },
// ];

// const baseFields: FieldPath<SignupFormValues>[] = [
//   "accountType",
//   "name",
//   "email",
//   "password",
//   "confirmPassword",
//   "phone",
//   "country",
// ];

// const identityFields: FieldPath<SignupFormValues>[] = [
//   "idType",
//   "idNumber",
//   "dateOfBirth",
//   "issuingCountry",
//   "residentialAddress",
//   "city",
//   "idDocument",
//   "proofOfAddress",
//   "businessDocument",
//   "selfie",
//   "kycConsent",
// ];

// function getProfileFields(
//   accountType: AccountType
// ): FieldPath<SignupFormValues>[] {
//   if (accountType === "personal") {
//     return ["businessName", "industry"];
//   }

//   return [
//     "businessName",
//     "registrationNumber",
//     "taxId",
//     "industry",
//     "teamSize",
//   ];
// }

// function getBusinessDocumentLabel(accountType: AccountType) {
//   if (accountType === "personal") return "Business ownership proof";
//   if (accountType === "sme") return "Business registration document";
//   return "Organization registration document";
// }

// function getAccountTypeLabel(accountType: AccountType) {
//   return accountTypes.find((type) => type.value === accountType)?.label ?? "";
// }

// function hasFile(files?: FileList) {
//   return Boolean(files?.length);
// }

// export function SignupForm({
//   className,
//   ...props
// }: React.ComponentProps<typeof Card>) {
//   const router = useRouter();
//   const [step, setStep] = useState(0);
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     trigger,
//     getValues,
//     formState: { errors, isSubmitting },
//   } = useForm<SignupFormValues>({
//     defaultValues: {
//       accountType: "personal",
//       idType: "national_id",
//       country: "Ghana",
//       issuingCountry: "Ghana",
//       kycConsent: false,
//     },
//     mode: "onTouched",
//   });

//   const accountType = useWatch({ control, name: "accountType" }) ?? "personal";
//   const password = useWatch({ control, name: "password" }) ?? "";
//   const businessDocumentLabel = getBusinessDocumentLabel(accountType);
//   const selectedAccountType = useMemo(
//     () => accountTypes.find((type) => type.value === accountType),
//     [accountType]
//   );

//   async function goNext() {
//     const fields: FieldPath<SignupFormValues>[] =
//       step === 0
//         ? ["accountType"]
//         : step === 1
//         ? [...baseFields, ...getProfileFields(accountType)]
//         : identityFields;

//     const isValid = await trigger(fields);
//     if (!isValid) {
//       toast.error("Please complete the highlighted fields.");
//       return;
//     }
//     setStep((current) => Math.min(current + 1, steps.length - 1));
//   }

//   function goBack() {
//     setStep((current) => Math.max(current - 1, 0));
//   }

//   async function onSubmit(data: SignupFormValues) {
//     const isValid = await trigger([
//       ...baseFields,
//       ...getProfileFields(data.accountType),
//       ...identityFields,
//     ]);

//     if (!isValid) {
//       toast.error("Complete your KYC verification before creating an account.");
//       return;
//     }

//     const signupPayload = {
//       name: data.name,
//       email: data.email,
//       password: data.password,
//       accountType: data.accountType,
//       phone: data.phone,
//       country: data.country,
//       businessName: data.businessName,
//       registrationNumber: data.registrationNumber,
//       taxId: data.taxId,
//       industry: data.industry,
//       website: data.website,
//       teamSize: data.teamSize,
//       kycStatus: "submitted",
//       kycProfile: {
//         idType: data.idType,
//         idNumber: data.idNumber,
//         dateOfBirth: data.dateOfBirth,
//         issuingCountry: data.issuingCountry,
//         residentialAddress: data.residentialAddress,
//         city: data.city,
//         documents: {
//           idDocument: data.idDocument?.[0]?.name,
//           proofOfAddress: data.proofOfAddress?.[0]?.name,
//           businessDocument: data.businessDocument?.[0]?.name,
//           selfie: data.selfie?.[0]?.name,
//         },
//       },
//     };

//     const { error } = await signUp.email(signupPayload);
//     if (error) {
//       toast.error(error.message ?? "Could not create account.");
//       return;
//     }
//     toast.success("Account created. Check your email for verification.");
//     // router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
//   }

//   return (
//     <Card className={cn("gap-6 py-7", className)} {...props}>
//       <CardHeader className="space-y-4 px-6 sm:px-8">
//         <div className="space-y-2">
//           <CardTitle className="text-2xl font-bold tracking-tight">
//             Create your Funza account
//           </CardTitle>
//           <CardDescription className="text-sm">
//             Choose your workspace type and complete verification before account
//             activation.
//           </CardDescription>
//         </div>
//         <div className="grid grid-cols-4 gap-2">
//           {steps.map((item, index) => {
//             const StepIcon = item.icon;
//             const isActive = index === step;
//             const isDone = index < step;

//             return (
//               <div
//                 key={item.title}
//                 className={cn(
//                   "flex min-h-16 flex-col items-center justify-center gap-1 rounded-md border px-2 text-center text-xs font-semibold transition",
//                   isActive
//                     ? "border-foreground bg-foreground text-background"
//                     : isDone
//                     ? "border-[#16a34a] bg-[#e8f6ef] text-[#047857]"
//                     : "border-border bg-muted/40 text-muted-foreground"
//                 )}
//               >
//                 <StepIcon className="size-4" />
//                 <span className="hidden sm:inline">{item.title}</span>
//               </div>
//             );
//           })}
//         </div>
//       </CardHeader>
//       <CardContent className="px-6 sm:px-8">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <FieldGroup className="gap-6">
//             {step === 0 && (
//               <section className="space-y-4">
//                 <div>
//                   <h2 className="text-base font-semibold">
//                     Registering category
//                   </h2>
//                   <p className="mt-1 text-sm text-muted-foreground">
//                     This determines the profile and verification details needed
//                     for your workspace.
//                   </p>
//                 </div>
//                 <div className="grid gap-3 sm:grid-cols-3">
//                   {accountTypes.map((type) => {
//                     const TypeIcon = type.icon;
//                     const selected = accountType === type.value;

//                     return (
//                       <button
//                         key={type.value}
//                         type="button"
//                         onClick={() =>
//                           setValue("accountType", type.value, {
//                             shouldDirty: true,
//                             shouldValidate: true,
//                           })
//                         }
//                         className={cn(
//                           "flex min-h-24 items-start gap-3 rounded-md border p-4 text-left transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none",
//                           selected
//                             ? "border-foreground bg-foreground text-background"
//                             : "border-border bg-input/20 hover:bg-input/40"
//                         )}
//                         aria-pressed={selected}
//                       >
//                         <span
//                           className={cn(
//                             "grid size-10 shrink-0 place-items-center rounded-md",
//                             selected
//                               ? "bg-background/15"
//                               : "bg-background ring-1 ring-border"
//                           )}
//                         >
//                           <TypeIcon className="size-5" />
//                         </span>
//                         <span className="min-w-0">
//                           <span className="block text-sm font-semibold">
//                             {type.label}
//                           </span>
//                           <span
//                             className={cn(
//                               "mt-1 block text-xs leading-5",
//                               selected
//                                 ? "text-background/75"
//                                 : "text-muted-foreground"
//                             )}
//                           >
//                             {type.detail}
//                           </span>
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//                 <input type="hidden" {...register("accountType")} />
//                 {errors.accountType && (
//                   <FieldDescription className="text-destructive">
//                     {errors.accountType.message}
//                   </FieldDescription>
//                 )}
//               </section>
//             )}

//             {step === 1 && (
//               <section className="space-y-5">
//                 <div className="flex items-center gap-3 rounded-md border border-border bg-muted/30 p-3">
//                   {selectedAccountType ? (
//                     <selectedAccountType.icon className="size-5 shrink-0" />
//                   ) : null}
//                   <div className="min-w-0">
//                     <p className="text-sm font-semibold">
//                       {getAccountTypeLabel(accountType)} registration
//                     </p>
//                     <p className="truncate text-xs text-muted-foreground">
//                       {selectedAccountType?.detail}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <Field>
//                     <FieldLabel
//                       htmlFor="name"
//                       className="text-sm font-semibold"
//                     >
//                       Legal full name
//                     </FieldLabel>
//                     <Input
//                       id="name"
//                       type="text"
//                       placeholder="John Doe"
//                       autoComplete="name"
//                       aria-invalid={Boolean(errors.name)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("name", {
//                         required: "Legal full name is required",
//                       })}
//                     />
//                     {errors.name && (
//                       <FieldDescription className="text-destructive">
//                         {errors.name.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="email"
//                       className="text-sm font-semibold"
//                     >
//                       Email
//                     </FieldLabel>
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="m@example.com"
//                       autoComplete="email"
//                       aria-invalid={Boolean(errors.email)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("email", {
//                         required: "Email is required",
//                         pattern: {
//                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                           message: "Enter a valid email address",
//                         },
//                       })}
//                     />
//                     {errors.email && (
//                       <FieldDescription className="text-destructive">
//                         {errors.email.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="phone"
//                       className="text-sm font-semibold"
//                     >
//                       Phone number
//                     </FieldLabel>
//                     <Input
//                       id="phone"
//                       type="tel"
//                       placeholder="+233 20 000 0000"
//                       autoComplete="tel"
//                       aria-invalid={Boolean(errors.phone)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("phone", {
//                         required: "Phone number is required",
//                       })}
//                     />
//                     {errors.phone && (
//                       <FieldDescription className="text-destructive">
//                         {errors.phone.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="country"
//                       className="text-sm font-semibold"
//                     >
//                       Country
//                     </FieldLabel>
//                     <Input
//                       id="country"
//                       type="text"
//                       placeholder="Ghana"
//                       autoComplete="country-name"
//                       aria-invalid={Boolean(errors.country)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("country", {
//                         required: "Country is required",
//                       })}
//                     />
//                     {errors.country && (
//                       <FieldDescription className="text-destructive">
//                         {errors.country.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="password"
//                       className="text-sm font-semibold"
//                     >
//                       Password
//                     </FieldLabel>
//                     <Input
//                       id="password"
//                       type="password"
//                       autoComplete="new-password"
//                       aria-invalid={Boolean(errors.password)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("password", {
//                         required: "Password is required",
//                         minLength: {
//                           value: 8,
//                           message: "Must be at least 8 characters long",
//                         },
//                       })}
//                     />
//                     {errors.password ? (
//                       <FieldDescription className="text-destructive">
//                         {errors.password.message}
//                       </FieldDescription>
//                     ) : (
//                       <FieldDescription>
//                         Must be at least 8 characters long.
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="confirm-password"
//                       className="text-sm font-semibold"
//                     >
//                       Confirm password
//                     </FieldLabel>
//                     <Input
//                       id="confirm-password"
//                       type="password"
//                       autoComplete="new-password"
//                       aria-invalid={Boolean(errors.confirmPassword)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("confirmPassword", {
//                         required: "Please confirm your password",
//                         validate: (value) =>
//                           value === password || "Passwords do not match",
//                       })}
//                     />
//                     {errors.confirmPassword && (
//                       <FieldDescription className="text-destructive">
//                         {errors.confirmPassword.message}
//                       </FieldDescription>
//                     )}
//                   </Field>
//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <Field>
//                     <FieldLabel
//                       htmlFor="business-name"
//                       className="text-sm font-semibold"
//                     >
//                       {accountType === "personal"
//                         ? "Business or trade name"
//                         : "Registered name"}
//                     </FieldLabel>
//                     <Input
//                       id="business-name"
//                       type="text"
//                       placeholder="Funza Retail"
//                       aria-invalid={Boolean(errors.businessName)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("businessName", {
//                         required: "Business name is required",
//                       })}
//                     />
//                     {errors.businessName && (
//                       <FieldDescription className="text-destructive">
//                         {errors.businessName.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="industry"
//                       className="text-sm font-semibold"
//                     >
//                       Industry
//                     </FieldLabel>
//                     <Input
//                       id="industry"
//                       type="text"
//                       placeholder="Retail"
//                       aria-invalid={Boolean(errors.industry)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("industry", {
//                         required: "Industry is required",
//                       })}
//                     />
//                     {errors.industry && (
//                       <FieldDescription className="text-destructive">
//                         {errors.industry.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   {accountType !== "personal" && (
//                     <>
//                       <Field>
//                         <FieldLabel
//                           htmlFor="registration-number"
//                           className="text-sm font-semibold"
//                         >
//                           Registration number
//                         </FieldLabel>
//                         <Input
//                           id="registration-number"
//                           type="text"
//                           placeholder="CS000000000"
//                           aria-invalid={Boolean(errors.registrationNumber)}
//                           className="h-11 px-3 text-sm md:text-sm"
//                           {...register("registrationNumber", {
//                             required: "Registration number is required",
//                           })}
//                         />
//                         {errors.registrationNumber && (
//                           <FieldDescription className="text-destructive">
//                             {errors.registrationNumber.message}
//                           </FieldDescription>
//                         )}
//                       </Field>

//                       <Field>
//                         <FieldLabel
//                           htmlFor="tax-id"
//                           className="text-sm font-semibold"
//                         >
//                           Tax ID
//                         </FieldLabel>
//                         <Input
//                           id="tax-id"
//                           type="text"
//                           placeholder="TIN"
//                           aria-invalid={Boolean(errors.taxId)}
//                           className="h-11 px-3 text-sm md:text-sm"
//                           {...register("taxId", {
//                             required: "Tax ID is required",
//                           })}
//                         />
//                         {errors.taxId && (
//                           <FieldDescription className="text-destructive">
//                             {errors.taxId.message}
//                           </FieldDescription>
//                         )}
//                       </Field>

//                       <Field>
//                         <FieldLabel
//                           htmlFor="team-size"
//                           className="text-sm font-semibold"
//                         >
//                           Team size
//                         </FieldLabel>
//                         <select
//                           id="team-size"
//                           aria-invalid={Boolean(errors.teamSize)}
//                           className="h-11 w-full rounded-md border border-input bg-input/20 px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20"
//                           {...register("teamSize", {
//                             required: "Team size is required",
//                           })}
//                         >
//                           <option value="">Select team size</option>
//                           <option value="2-10">2-10</option>
//                           <option value="11-50">11-50</option>
//                           <option value="51-250">51-250</option>
//                           <option value="251+">251+</option>
//                         </select>
//                         {errors.teamSize && (
//                           <FieldDescription className="text-destructive">
//                             {errors.teamSize.message}
//                           </FieldDescription>
//                         )}
//                       </Field>

//                       <Field>
//                         <FieldLabel
//                           htmlFor="website"
//                           className="text-sm font-semibold"
//                         >
//                           Website
//                         </FieldLabel>
//                         <Input
//                           id="website"
//                           type="url"
//                           placeholder="https://example.com"
//                           className="h-11 px-3 text-sm md:text-sm"
//                           {...register("website")}
//                         />
//                       </Field>
//                     </>
//                   )}
//                 </div>
//               </section>
//             )}

//             {step === 2 && (
//               <section className="space-y-5">
//                 <div>
//                   <h2 className="text-base font-semibold">
//                     Identity verification
//                   </h2>
//                   <p className="mt-1 text-sm text-muted-foreground">
//                     KYC is required for every Funza workspace before account
//                     activation.
//                   </p>
//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <Field>
//                     <FieldLabel
//                       htmlFor="id-type"
//                       className="text-sm font-semibold"
//                     >
//                       ID type
//                     </FieldLabel>
//                     <select
//                       id="id-type"
//                       aria-invalid={Boolean(errors.idType)}
//                       className="h-11 w-full rounded-md border border-input bg-input/20 px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20"
//                       {...register("idType", {
//                         required: "ID type is required",
//                       })}
//                     >
//                       <option value="national_id">National ID</option>
//                       <option value="passport">Passport</option>
//                       <option value="drivers_license">
//                         Driver&apos;s license
//                       </option>
//                       <option value="voter_id">Voter ID</option>
//                     </select>
//                     {errors.idType && (
//                       <FieldDescription className="text-destructive">
//                         {errors.idType.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="id-number"
//                       className="text-sm font-semibold"
//                     >
//                       ID number
//                     </FieldLabel>
//                     <Input
//                       id="id-number"
//                       type="text"
//                       placeholder="GHA-000000000-0"
//                       aria-invalid={Boolean(errors.idNumber)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("idNumber", {
//                         required: "ID number is required",
//                       })}
//                     />
//                     {errors.idNumber && (
//                       <FieldDescription className="text-destructive">
//                         {errors.idNumber.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="date-of-birth"
//                       className="text-sm font-semibold"
//                     >
//                       Date of birth
//                     </FieldLabel>
//                     <Input
//                       id="date-of-birth"
//                       type="date"
//                       aria-invalid={Boolean(errors.dateOfBirth)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("dateOfBirth", {
//                         required: "Date of birth is required",
//                       })}
//                     />
//                     {errors.dateOfBirth && (
//                       <FieldDescription className="text-destructive">
//                         {errors.dateOfBirth.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="issuing-country"
//                       className="text-sm font-semibold"
//                     >
//                       Issuing country
//                     </FieldLabel>
//                     <Input
//                       id="issuing-country"
//                       type="text"
//                       placeholder="Ghana"
//                       aria-invalid={Boolean(errors.issuingCountry)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("issuingCountry", {
//                         required: "Issuing country is required",
//                       })}
//                     />
//                     {errors.issuingCountry && (
//                       <FieldDescription className="text-destructive">
//                         {errors.issuingCountry.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field className="sm:col-span-2">
//                     <FieldLabel
//                       htmlFor="residential-address"
//                       className="text-sm font-semibold"
//                     >
//                       Residential address
//                     </FieldLabel>
//                     <Input
//                       id="residential-address"
//                       type="text"
//                       placeholder="Street, area, house number"
//                       autoComplete="street-address"
//                       aria-invalid={Boolean(errors.residentialAddress)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("residentialAddress", {
//                         required: "Residential address is required",
//                       })}
//                     />
//                     {errors.residentialAddress && (
//                       <FieldDescription className="text-destructive">
//                         {errors.residentialAddress.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="city"
//                       className="text-sm font-semibold"
//                     >
//                       City
//                     </FieldLabel>
//                     <Input
//                       id="city"
//                       type="text"
//                       placeholder="Accra"
//                       autoComplete="address-level2"
//                       aria-invalid={Boolean(errors.city)}
//                       className="h-11 px-3 text-sm md:text-sm"
//                       {...register("city", {
//                         required: "City is required",
//                       })}
//                     />
//                     {errors.city && (
//                       <FieldDescription className="text-destructive">
//                         {errors.city.message}
//                       </FieldDescription>
//                     )}
//                   </Field>
//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <Field>
//                     <FieldLabel
//                       htmlFor="id-document"
//                       className="text-sm font-semibold"
//                     >
//                       Government ID
//                     </FieldLabel>
//                     <Input
//                       id="id-document"
//                       type="file"
//                       accept="image/*,.pdf"
//                       aria-invalid={Boolean(errors.idDocument)}
//                       className="h-11 px-3 py-2 text-sm md:text-sm"
//                       {...register("idDocument", {
//                         validate: (files) =>
//                           hasFile(files) || "Upload a government ID",
//                       })}
//                     />
//                     {errors.idDocument && (
//                       <FieldDescription className="text-destructive">
//                         {errors.idDocument.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="proof-of-address"
//                       className="text-sm font-semibold"
//                     >
//                       Proof of address
//                     </FieldLabel>
//                     <Input
//                       id="proof-of-address"
//                       type="file"
//                       accept="image/*,.pdf"
//                       aria-invalid={Boolean(errors.proofOfAddress)}
//                       className="h-11 px-3 py-2 text-sm md:text-sm"
//                       {...register("proofOfAddress", {
//                         validate: (files) =>
//                           hasFile(files) || "Upload proof of address",
//                       })}
//                     />
//                     {errors.proofOfAddress && (
//                       <FieldDescription className="text-destructive">
//                         {errors.proofOfAddress.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="business-document"
//                       className="text-sm font-semibold"
//                     >
//                       {businessDocumentLabel}
//                     </FieldLabel>
//                     <Input
//                       id="business-document"
//                       type="file"
//                       accept="image/*,.pdf"
//                       aria-invalid={Boolean(errors.businessDocument)}
//                       className="h-11 px-3 py-2 text-sm md:text-sm"
//                       {...register("businessDocument", {
//                         validate: (files) =>
//                           hasFile(files) ||
//                           `Upload ${businessDocumentLabel.toLowerCase()}`,
//                       })}
//                     />
//                     {errors.businessDocument && (
//                       <FieldDescription className="text-destructive">
//                         {errors.businessDocument.message}
//                       </FieldDescription>
//                     )}
//                   </Field>

//                   <Field>
//                     <FieldLabel
//                       htmlFor="selfie"
//                       className="text-sm font-semibold"
//                     >
//                       Selfie check
//                     </FieldLabel>
//                     <Input
//                       id="selfie"
//                       type="file"
//                       accept="image/*"
//                       aria-invalid={Boolean(errors.selfie)}
//                       className="h-11 px-3 py-2 text-sm md:text-sm"
//                       {...register("selfie", {
//                         validate: (files) =>
//                           hasFile(files) || "Upload a selfie image",
//                       })}
//                     />
//                     {errors.selfie && (
//                       <FieldDescription className="text-destructive">
//                         {errors.selfie.message}
//                       </FieldDescription>
//                     )}
//                   </Field>
//                 </div>

//                 <Field>
//                   <label
//                     htmlFor="kyc-consent"
//                     className="flex gap-3 rounded-md border border-border bg-input/20 p-4 text-sm"
//                   >
//                     <input
//                       id="kyc-consent"
//                       type="checkbox"
//                       className="mt-1 size-4 shrink-0 accent-foreground"
//                       aria-invalid={Boolean(errors.kycConsent)}
//                       {...register("kycConsent", {
//                         required:
//                           "Consent is required to complete identity verification",
//                       })}
//                     />
//                     <span>
//                       I confirm the information provided is accurate and I
//                       authorize Funza CRM to verify my identity and business
//                       documents.
//                     </span>
//                   </label>
//                   {errors.kycConsent && (
//                     <FieldDescription className="text-destructive">
//                       {errors.kycConsent.message}
//                     </FieldDescription>
//                   )}
//                 </Field>
//               </section>
//             )}

//             {step === 3 && (
//               <ReviewStep
//                 accountType={accountType}
//                 businessDocumentLabel={businessDocumentLabel}
//                 values={getValues()}
//               />
//             )}

//             <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
//               {step > 0 ? (
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={goBack}
//                   className="h-11 gap-2 text-sm font-semibold sm:w-auto"
//                 >
//                   <ChevronLeft className="size-4" />
//                   Back
//                 </Button>
//               ) : null}

//               {step < steps.length - 1 ? (
//                 <Button
//                   type="button"
//                   onClick={goNext}
//                   className="h-11 gap-2 text-sm font-semibold sm:ml-auto sm:w-auto"
//                 >
//                   Continue
//                   <ChevronRight className="size-4" />
//                 </Button>
//               ) : (
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="h-11 gap-2 text-sm font-semibold sm:ml-auto sm:w-auto"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="size-4 animate-spin" />
//                       Creating...
//                     </>
//                   ) : (
//                     <>
//                       <CheckCircle className="size-4" />
//                       Create account
//                     </>
//                   )}
//                 </Button>
//               )}
//             </div>

//             <div className="space-y-2 text-center">
//               <Button
//                 onClick={() => signInWithGoogle()}
//                 variant="outline"
//                 type="button"
//                 className="h-11 w-full text-sm font-semibold"
//               >
//                 Sign up with Google
//               </Button>
//               <FieldDescription className="text-center text-sm">
//                 Already have an account?{" "}
//                 <Link href="/login" className="font-semibold">
//                   Sign in
//                 </Link>
//               </FieldDescription>
//               <FieldDescription className="text-center text-sm">
//                 <Link href="/forgot-password" className="font-medium">
//                   Forgot your password?
//                 </Link>
//               </FieldDescription>
//             </div>
//           </FieldGroup>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

// function ReviewStep({
//   accountType,
//   businessDocumentLabel,
//   values,
// }: {
//   accountType: AccountType;
//   businessDocumentLabel: string;
//   values: SignupFormValues;
// }) {
//   const items = [
//     ["Category", getAccountTypeLabel(accountType)],
//     ["Name", values.name],
//     ["Email", values.email],
//     ["Phone", values.phone],
//     ["Country", values.country],
//     ["Workspace", values.businessName],
//     ["ID type", values.idType?.replace(/_/g, " ")],
//     ["ID number", values.idNumber],
//     ["Address", `${values.residentialAddress}, ${values.city}`],
//   ];

//   const documents = [
//     ["Government ID", values.idDocument?.[0]?.name],
//     ["Proof of address", values.proofOfAddress?.[0]?.name],
//     [businessDocumentLabel, values.businessDocument?.[0]?.name],
//     ["Selfie check", values.selfie?.[0]?.name],
//   ];

//   return (
//     <section className="space-y-5">
//       <div>
//         <h2 className="text-base font-semibold">Review registration</h2>
//         <p className="mt-1 text-sm text-muted-foreground">
//           Your identity verification must be complete before submission.
//         </p>
//       </div>

//       <div className="grid gap-3 sm:grid-cols-2">
//         {items.map(([label, value]) => (
//           <div
//             key={label}
//             className="min-h-16 rounded-md border border-border bg-input/20 p-3"
//           >
//             <p className="text-xs font-semibold uppercase text-muted-foreground">
//               {label}
//             </p>
//             <p className="mt-1 truncate text-sm font-semibold capitalize">
//               {value || "Not provided"}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="rounded-md border border-[#16a34a]/30 bg-[#e8f6ef] p-4 text-[#047857]">
//         <div className="flex items-center gap-2 text-sm font-semibold">
//           <CheckCircle className="size-4" />
//           KYC ready for submission
//         </div>
//         <div className="mt-3 grid gap-2 sm:grid-cols-2">
//           {documents.map(([label, value]) => (
//             <p key={label} className="truncate text-xs">
//               <span className="font-semibold">{label}:</span>{" "}
//               {value || "Missing"}
//             </p>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
