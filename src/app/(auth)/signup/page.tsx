import { SignupForm } from "@/components/signup-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted/30 p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <SignupForm />
      </div>
    </div>
  )
}
