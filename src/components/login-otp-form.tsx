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
import { emailOtp, signIn } from "@/lib/auth-client"

type Step = "request" | "verify"
type RequestValues = { email: string }
type VerifyValues = { otp: string }

export function LoginOtpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [step, setStep] = useState<Step>("request")
  const [email, setEmail] = useState("")

  const requestForm = useForm<RequestValues>()
  const verifyForm = useForm<VerifyValues>()

  async function onRequest(data: RequestValues) {
    const { error } = await emailOtp.sendVerificationOtp({
      email: data.email,
      type: "sign-in",
    })
    if (error) {
      toast.error(error.message ?? "Could not send sign-in code.")
      return
    }
    toast.success(`Sign-in code sent to ${data.email}`)
    setEmail(data.email)
    setStep("verify")
  }

  async function onVerify(data: VerifyValues) {
    const { error } = await signIn.emailOtp({ email, otp: data.otp })
    if (error) {
      toast.error(error.message ?? "Invalid code.")
      return
    }
    toast.success("Welcome back!")
    router.push("/")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="gap-6 py-8">
        <CardHeader className="space-y-2 px-8 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Sign in with email code
          </CardTitle>
          <CardDescription className="text-sm">
            {step === "request"
              ? "We'll email you a 6-digit code to sign in. No password required."
              : `Enter the code sent to ${email}.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          {step === "request" ? (
            <form onSubmit={requestForm.handleSubmit(onRequest)}>
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel htmlFor="lo-email" className="text-sm font-semibold">
                    Email
                  </FieldLabel>
                  <Input
                    id="lo-email"
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
                      : "Send sign-in code"}
                  </Button>
                  <FieldDescription className="text-center text-sm">
                    Prefer a password?{" "}
                    <Link href="/login" className="font-semibold">
                      Use password
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          ) : (
            <form onSubmit={verifyForm.handleSubmit(onVerify)}>
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel htmlFor="lo-otp" className="text-sm font-semibold">
                    Verification code
                  </FieldLabel>
                  <Input
                    id="lo-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="123456"
                    maxLength={6}
                    className="h-11 px-3 text-center font-mono text-lg tracking-[0.5em] md:text-lg"
                    {...verifyForm.register("otp", {
                      required: "Code is required",
                      minLength: { value: 6, message: "Code must be 6 digits" },
                    })}
                  />
                  {verifyForm.formState.errors.otp && (
                    <FieldDescription className="text-destructive">
                      {verifyForm.formState.errors.otp.message}
                    </FieldDescription>
                  )}
                </Field>
                <Field className="gap-3">
                  <Button
                    type="submit"
                    disabled={verifyForm.formState.isSubmitting}
                    className="h-11 text-sm font-semibold"
                  >
                    {verifyForm.formState.isSubmitting
                      ? "Verifying..."
                      : "Sign in"}
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
