import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  fetchOptions: {
      credentials: "include",
			onSuccess: (ctx) => {
				const authToken = ctx.response.headers.get("set-auth-token");
				if (authToken) {
					localStorage.setItem("bearer_token", authToken);
				}
			},
      onError: (ctx) => {
        if (ctx.response.status === 401) {
          localStorage.removeItem("bearer_token");
          window.location.href = "/login";
        }
      }
		},
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    emailOTPClient()
  ]
})
const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

export const { signIn, signUp, signOut, useSession, emailOtp } = authClient
export { signInWithGoogle }