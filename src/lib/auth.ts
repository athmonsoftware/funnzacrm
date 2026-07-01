import { betterAuth } from "better-auth";
import { Pool } from "pg"
import { emailOTP } from "better-auth/plugins"
import { sendOtpEmail } from "@/lib/email"
import { bearer } from "better-auth/plugins";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),

  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  }, 
  plugins: [
        emailOTP({
            overrideDefaultEmailVerification: true,
            async sendVerificationOTP({ email, otp, type }) {
                await sendOtpEmail({ email, otp, type })
            },
        }),
        bearer()
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 2, // 2 days
    updateAge: 60 * 60 * 6, // Refresh every 6 hours
  },
  trustedOrigins: [
		"http://localhost:3001", // development
		"https://funnzacrm.vercel.app", // production frontend
	]
});