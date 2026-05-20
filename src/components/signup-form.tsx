"use client"

import { useForm } from "react-hook-form"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
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
import { signUp, signInWithGoogle } from "@/lib/auth-client"

type SignupFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>()

  async function onSubmit(data: SignupFormValues) {
    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    if (error) {
      toast.error(error.message ?? "Could not create account.")
      return
    }
    toast.success("Account created! Check your email for a verification code.")
    router.push(`/verify-email?email=${encodeURIComponent(data.email)}`)
  }

  return (
    <Card className="gap-6 py-8" {...props}>
      <CardHeader className="space-y-2 px-8">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create an account
        </CardTitle>
        <CardDescription className="text-sm">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel htmlFor="name" className="text-sm font-semibold">
                Full Name
              </FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="h-11 px-3 text-sm md:text-sm"
                {...register("name", { required: "Full name is required" })}
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
                className="h-11 px-3 text-sm md:text-sm"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email ? (
                <FieldDescription className="text-destructive">
                  {errors.email.message}
                </FieldDescription>
              ) : (
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
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
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                className="h-11 px-3 text-sm md:text-sm"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <FieldDescription className="text-destructive">
                  {errors.confirmPassword.message}
                </FieldDescription>
              )}
            </Field>
            <Field className="gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 text-sm font-semibold"
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </Button>
              <Button
                onClick={() => signInWithGoogle()}
                variant="outline"
                type="button"
                className="h-11 text-sm font-semibold"
              >
                Sign up with Google
              </Button>
              <FieldDescription className="px-6 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold">
                  Sign in
                </Link>
              </FieldDescription>
              <FieldDescription className="px-6 text-center text-sm">
                <Link href="/forgot-password" className="font-medium">
                  Forgot your password?
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
