"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { emailOtp } from "@/lib/auth-client"

type Step = "request" | "reset"

type RequestValues = { email: string }
type ResetValues = { otp: string; password: string; confirmPassword: string }

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [step, setStep] = useState<Step>("request")
  const [email, setEmail] = useState("")

  const requestForm = useForm<RequestValues>()
  const resetForm = useForm<ResetValues>()

  async function onRequest(data: RequestValues) {
    const { error } = await emailOtp.requestPasswordReset({ email: data.email })
    if (error) {
      toast.error(error.message ?? "Could not send reset code.")
      return
    }
    toast.success(`Reset code sent to ${data.email}`)
    setEmail(data.email)
    setStep("reset")
  }

  async function onReset(data: ResetValues) {
    const { error } = await emailOtp.resetPassword({
      email,
      otp: data.otp,
      password: data.password,
    })
    if (error) {
      toast.error(error.message ?? "Could not reset password.")
      return
    }
    toast.success("Password reset successfully. Please log in.")
    router.push("/login")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="gap-6 py-8">
        <CardHeader className="space-y-2 px-8 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {step === "request"
              ? "Forgot your password?"
              : "Enter your verification code"}
          </CardTitle>
          <CardDescription className="text-sm">
            {step === "request"
              ? "Enter your email and we'll send you a 6-digit code to reset your password."
              : `We sent a code to ${email}. Enter it below along with your new password.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          {step === "request" ? (
            <form onSubmit={requestForm.handleSubmit(onRequest)}>
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel htmlFor="fp-email" className="text-sm font-semibold">
                    Email
                  </FieldLabel>
                  <Input
                    id="fp-email"
                    type="email"
                    placeholder="m@example.com"
                    className="h-11 px-3 text-sm md:text-sm"
                    {...requestForm.register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {requestForm.formState.errors.email && (
                    <FieldDescription className="text-destructive">
                      {requestForm.formState.errors.email.message}
                    </FieldDescription>
                  )}
                </Field>
                <Field className="gap-3">
                  <Button
                    type="submit"
                    disabled={requestForm.formState.isSubmitting}
                    className="h-11 text-sm font-semibold"
                  >
                    {requestForm.formState.isSubmitting
                      ? "Sending..."
                      : "Send reset code"}
                  </Button>
                  <FieldDescription className="text-center text-sm">
                    Remembered your password?{" "}
                    <Link href="/login" className="font-semibold">
                      Back to login
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          ) : (
            <form onSubmit={resetForm.handleSubmit(onReset)}>
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel htmlFor="fp-otp" className="text-sm font-semibold">
                    Verification code
                  </FieldLabel>
                  <Input
                    id="fp-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="123456"
                    maxLength={6}
                    className="h-11 px-3 text-center font-mono text-lg tracking-[0.5em] md:text-lg"
                    {...resetForm.register("otp", {
                      required: "Verification code is required",
                      minLength: { value: 6, message: "Code must be 6 digits" },
                    })}
                  />
                  {resetForm.formState.errors.otp && (
                    <FieldDescription className="text-destructive">
                      {resetForm.formState.errors.otp.message}
                    </FieldDescription>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="fp-password" className="text-sm font-semibold">
                    New password
                  </FieldLabel>
                  <Input
                    id="fp-password"
                    type="password"
                    className="h-11 px-3 text-sm md:text-sm"
                    {...resetForm.register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Must be at least 8 characters long",
                      },
                    })}
                  />
                  {resetForm.formState.errors.password && (
                    <FieldDescription className="text-destructive">
                      {resetForm.formState.errors.password.message}
                    </FieldDescription>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="fp-confirm" className="text-sm font-semibold">
                    Confirm new password
                  </FieldLabel>
                  <Input
                    id="fp-confirm"
                    type="password"
                    className="h-11 px-3 text-sm md:text-sm"
                    {...resetForm.register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === resetForm.watch("password") ||
                        "Passwords do not match",
                    })}
                  />
                  {resetForm.formState.errors.confirmPassword && (
                    <FieldDescription className="text-destructive">
                      {resetForm.formState.errors.confirmPassword.message}
                    </FieldDescription>
                  )}
                </Field>
                <Field className="gap-3">
                  <Button
                    type="submit"
                    disabled={resetForm.formState.isSubmitting}
                    className="h-11 text-sm font-semibold"
                  >
                    {resetForm.formState.isSubmitting
                      ? "Resetting..."
                      : "Reset password"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("request")}
                    className="h-11 text-sm font-semibold"
                  >
                    Use a different email
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
