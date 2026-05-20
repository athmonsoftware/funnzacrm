import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.EMAIL_FROM ?? "Funza AI <onboarding@resend.dev>"

type OtpType = "sign-in" | "email-verification" | "forget-password" | "change-email"

const subjects: Record<OtpType, string> = {
  "sign-in": "Your Funza AI sign-in code",
  "email-verification": "Verify your Funza AI email",
  "forget-password": "Reset your Funza AI password",
  "change-email": "Confirm your new Funza AI email",
}

const intros: Record<OtpType, string> = {
  "sign-in": "Use the code below to sign in to your account.",
  "email-verification": "Use the code below to verify your email address.",
  "forget-password": "Use the code below to reset your password.",
  "change-email": "Use the code below to confirm your new email address.",
}

function renderHtml(intro: string, otp: string) {
  return `
<!doctype html>
<html>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background:#f6f6f8; padding:32px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:480px; margin:0 auto; background:#ffffff; border-radius:12px; padding:32px;">
      <tr>
        <td>
          <h1 style="margin:0 0 8px; font-size:20px; color:#0f172a;">Funza AI</h1>
          <p style="margin:0 0 24px; color:#475569; font-size:14px; line-height:1.5;">${intro}</p>
          <div style="background:#0f172a; color:#ffffff; font-size:32px; font-weight:700; letter-spacing:8px; text-align:center; padding:20px; border-radius:8px;">
            ${otp}
          </div>
          <p style="margin:24px 0 0; color:#94a3b8; font-size:12px; line-height:1.5;">
            This code expires in 10 minutes. If you didn't request it, you can safely ignore this email.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export async function sendOtpEmail({
  email,
  otp,
  type,
}: {
  email: string
  otp: string
  type: OtpType
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn(
      `[email] RESEND_API_KEY not set. Falling back to console log. OTP for ${email} (${type}): ${otp}`
    )
    return
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: subjects[type],
    html: renderHtml(intros[type], otp),
    text: `${intros[type]}\n\nYour code: ${otp}\n\nThis code expires in 10 minutes.`,
  })

  if (error) {
    console.error("[email] Resend error:", error)
    throw new Error(error.message ?? "Failed to send email")
  }
}
