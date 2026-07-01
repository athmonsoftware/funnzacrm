"use client"

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
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn, signInWithGoogle } from "@/lib/auth-client"

type LoginFormValues = {
  email: string
  password: string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>()

  async function onSubmit(data: LoginFormValues) {
    try{
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
      },{
        onSuccess: (ctx) => {
          const authToken = ctx.response.headers.get("set-auth-token")
          if (authToken) {
            localStorage.setItem("bearer_token", authToken);
          }
        },
        onError: (ctx) => {
          toast.error(ctx.error.message ?? "Invalid email or password.")
          if (ctx.response.status === 401) {
            localStorage.removeItem("bearer_token");
            window.location.href = "/login";
          }
        }
      })
      toast.success("Welcome back!")
      if (error) {
        toast.error(error.message ?? "Invalid email or password.")
        return
      }
      router.push("/")
    } catch (error) {
      toast.error("An error occurred while logging in.")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="gap-6 py-8">
        <CardHeader className="space-y-2 px-8 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-sm">
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-5">
              <Field>
                <Button variant="outline" type="button" className="h-11 text-sm font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>
                <Button 
                onClick={() => {
                  signInWithGoogle()
                }}
                variant="outline" type="button" className="h-11 text-sm font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
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
                {errors.email && (
                  <FieldDescription className="text-destructive">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-sm font-semibold">
                    Password
                  </FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm font-medium underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="h-11 px-3 text-sm md:text-sm"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && (
                  <FieldDescription className="text-destructive">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>
              <Field className="gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 text-sm font-semibold"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-center text-sm">
                  <Link href="/login-otp" className="font-medium">
                    Sign in with email code instead
                  </Link>
                </FieldDescription>
                <FieldDescription className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="font-semibold">
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-xs">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
