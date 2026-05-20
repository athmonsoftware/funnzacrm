"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"
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

type Values = { otp: string }

export function VerifyEmailForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialEmail = searchParams.get("email") ?? ""
  const [email, setEmail] = useState(initialEmail)
  const autoSent = useRef(false)

  const { register, handleSubmit, formState } = useForm<Values>()

  useEffect(() => {
    if (initialEmail && !autoSent.current) {
      autoSent.current = true
      void emailOtp
        .sendVerificationOtp({ email: initialEmail, type: "email-verification" })
        .then(({ error }) => {
          if (error) toast.error(error.message ?? "Could not send code.")
          else toast.success(`Verification code sent to ${initialEmail}`)
        })
    }
  }, [initialEmail])

  async function onSubmit(data: Values) {
    const { error } = await emailOtp.verifyEmail({ email, otp: data.otp })
    if (error) {
      toast.error(error.message ?? "Could not verify email.")
      return
    }
    toast.success("Email verified successfully!")
    router.push("/login?verified=true")
  }

  async function resend() {
    const { error } = await emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    })
    if (error) toast.error(error.message ?? "Could not send code.")
    else toast.success(`A new code was sent to ${email}`)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="gap-6 py-8">
        <CardHeader className="space-y-2 px-8 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Verify your email
          </CardTitle>
          <CardDescription className="text-sm">
            Enter the 6-digit code we sent to your inbox to confirm your address.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="ve-email" className="text-sm font-semibold">
                  Email
                </FieldLabel>
                <Input
                  id="ve-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  className="h-11 px-3 text-sm md:text-sm"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="ve-otp" className="text-sm font-semibold">
                  Verification code
                </FieldLabel>
                <Input
                  id="ve-otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="123456"
                  maxLength={6}
                  className="h-11 px-3 text-center font-mono text-lg tracking-[0.5em] md:text-lg"
                  {...register("otp", {
                    required: "Code is required",
                    minLength: { value: 6, message: "Code must be 6 digits" },
                  })}
                />
                {formState.errors.otp && (
                  <FieldDescription className="text-destructive">
                    {formState.errors.otp.message}
                  </FieldDescription>
                )}
              </Field>
              <Field className="gap-3">
                <Button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="h-11 text-sm font-semibold"
                >
                  {formState.isSubmitting ? "Verifying..." : "Verify email"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resend}
                  className="h-11 text-sm font-semibold"
                >
                  Resend code
                </Button>
                <FieldDescription className="text-center text-sm">
                  <Link href="/login" className="font-semibold">
                    Back to login
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
