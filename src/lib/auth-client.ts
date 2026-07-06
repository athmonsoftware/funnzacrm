import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    emailOTPClient(),
  ]
})
const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

export const { signIn, signUp, signOut, useSession, emailOtp } = authClient
export { signInWithGoogle }