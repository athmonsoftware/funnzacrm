import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { emailOTP } from "better-auth/plugins"
import { sendOtpEmail } from "@/lib/email"

export const auth = betterAuth({
  database: new Database("./sqlite.db"),
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
        })
    ]
});