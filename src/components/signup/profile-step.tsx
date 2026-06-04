import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getBusinessDocumentLabel, getAccountTypeLabel } from "./constants";
import { type AccountType, type SignupFormValues } from "./types";

export function ProfileStep({
  accountType,
  selectedAccountType,
  register,
  errors,
  password,
}: {
  accountType: AccountType;
  selectedAccountType: any;
  register: any;
  errors: any;
  password: string;
}) {
  const businessDocumentLabel = getBusinessDocumentLabel(accountType);

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3 rounded-md border border-border bg-muted/30 p-3">
        {selectedAccountType ? (
          <selectedAccountType.icon className="size-5 shrink-0" />
        ) : null}
        <div className="min-w-0">
          <p className="text-sm font-semibold">
            {getAccountTypeLabel(accountType)} registration
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {selectedAccountType?.detail}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="name" className="text-sm font-semibold">
            Legal full name
          </FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("name", {
              required: "Legal full name is required",
            })}
          />
          {errors.name && (
            <FieldDescription className="text-destructive">
              {errors.name.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email" className="text-sm font-semibold">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <FieldDescription className="text-destructive">
              {errors.email.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="phone" className="text-sm font-semibold">
            Phone number
          </FieldLabel>
          <Input
            id="phone"
            type="tel"
            placeholder="+233 20 000 0000"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("phone", {
              required: "Phone number is required",
            })}
          />
          {errors.phone && (
            <FieldDescription className="text-destructive">
              {errors.phone.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="country" className="text-sm font-semibold">
            Country
          </FieldLabel>
          <Input
            id="country"
            type="text"
            placeholder="Ghana"
            autoComplete="country-name"
            aria-invalid={Boolean(errors.country)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("country", {
              required: "Country is required",
            })}
          />
          {errors.country && (
            <FieldDescription className="text-destructive">
              {errors.country.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="password" className="text-sm font-semibold">
            Password
          </FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Must be at least 8 characters long",
              },
            })}
          />
          {errors.password ? (
            <FieldDescription className="text-destructive">
              {errors.password.message}
            </FieldDescription>
          ) : (
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel
            htmlFor="confirm-password"
            className="text-sm font-semibold"
          >
            Confirm password
          </FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.confirmPassword)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value: string) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <FieldDescription className="text-destructive">
              {errors.confirmPassword.message}
            </FieldDescription>
          )}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="business-name" className="text-sm font-semibold">
            {accountType === "personal"
              ? "Business or trade name"
              : "Registered name"}
          </FieldLabel>
          <Input
            id="business-name"
            type="text"
            placeholder="Funza Retail"
            aria-invalid={Boolean(errors.businessName)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("businessName", {
              required: "Business name is required",
            })}
          />
          {errors.businessName && (
            <FieldDescription className="text-destructive">
              {errors.businessName.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="industry" className="text-sm font-semibold">
            Industry
          </FieldLabel>
          <Input
            id="industry"
            type="text"
            placeholder="Retail"
            aria-invalid={Boolean(errors.industry)}
            className="h-11 px-3 text-sm md:text-sm"
            {...register("industry", {
              required: "Industry is required",
            })}
          />
          {errors.industry && (
            <FieldDescription className="text-destructive">
              {errors.industry.message}
            </FieldDescription>
          )}
        </Field>

        {accountType !== "personal" && (
          <>
            <Field>
              <FieldLabel
                htmlFor="registration-number"
                className="text-sm font-semibold"
              >
                Registration number
              </FieldLabel>
              <Input
                id="registration-number"
                type="text"
                placeholder="CS000000000"
                aria-invalid={Boolean(errors.registrationNumber)}
                className="h-11 px-3 text-sm md:text-sm"
                {...register("registrationNumber", {
                  required: "Registration number is required",
                })}
              />
              {errors.registrationNumber && (
                <FieldDescription className="text-destructive">
                  {errors.registrationNumber.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="tax-id" className="text-sm font-semibold">
                Tax ID
              </FieldLabel>
              <Input
                id="tax-id"
                type="text"
                placeholder="TIN"
                aria-invalid={Boolean(errors.taxId)}
                className="h-11 px-3 text-sm md:text-sm"
                {...register("taxId", {
                  required: "Tax ID is required",
                })}
              />
              {errors.taxId && (
                <FieldDescription className="text-destructive">
                  {errors.taxId.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="team-size" className="text-sm font-semibold">
                Team size
              </FieldLabel>
              <select
                id="team-size"
                aria-invalid={Boolean(errors.teamSize)}
                className="h-11 w-full rounded-md border border-input bg-input/20 px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20"
                {...register("teamSize", {
                  required: "Team size is required",
                })}
              >
                <option value="">Select team size</option>
                <option value="2-10">2-10</option>
                <option value="11-50">11-50</option>
                <option value="51-250">51-250</option>
                <option value="251+">251+</option>
              </select>
              {errors.teamSize && (
                <FieldDescription className="text-destructive">
                  {errors.teamSize.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="website" className="text-sm font-semibold">
                Website
              </FieldLabel>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                className="h-11 px-3 text-sm md:text-sm"
                {...register("website")}
              />
            </Field>
          </>
        )}
      </div>
    </section>
  );
}
