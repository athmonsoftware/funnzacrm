import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json()

    if (!priceId) {
      return NextResponse.json({ error: "priceId is required" }, { status: 400 })
    }

    if (priceId.startsWith("price_individual") || priceId.startsWith("price_sme") || priceId.startsWith("price_business")) {
      return NextResponse.json(
        { error: "Stripe price IDs are not configured. Add STRIPE_PRICE_INDIVIDUAL, STRIPE_PRICE_SME, and STRIPE_PRICE_BUSINESS to your .env file." },
        { status: 500 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? req.nextUrl.origin

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/pricing?success=true`,
      cancel_url: `${baseUrl}/pricing?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
