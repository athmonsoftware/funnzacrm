import { PricingCard, type PricingTier } from "@/components/pricing-card"

const tiers: PricingTier[] = [
  {
    name: "Individual",
    description:
      "Perfect for freelancers and solo professionals managing their own clients.",
    price: 12,
    billingPeriod: "month",
    priceId: process.env.STRIPE_PRICE_INDIVIDUAL ?? "price_individual",
    features: [
      { text: "Up to 50 contacts", included: true },
      { text: "1 user seat", included: true },
      { text: "Basic pipeline management", included: true },
      { text: "Email reminders & follow-ups", included: true },
      { text: "CSV import / export", included: true },
      { text: "Mobile app access", included: true },
      { text: "Team collaboration tools", included: false },
      { text: "Advanced analytics & reports", included: false },
      { text: "API access", included: false },
      { text: "Custom integrations", included: false },
    ],
  },
  {
    name: "SME",
    description:
      "Built for growing small and medium businesses with shared pipelines.",
    price: 49,
    billingPeriod: "month",
    priceId: process.env.STRIPE_PRICE_SME ?? "price_sme",
    highlighted: true,
    badge: "Most Popular",
    features: [
      { text: "Up to 5 000 contacts", included: true },
      { text: "Up to 10 user seats", included: true },
      { text: "Advanced pipeline management", included: true },
      { text: "Email & SMS reminders", included: true },
      { text: "CSV import / export", included: true },
      { text: "Mobile app access", included: true },
      { text: "Team collaboration tools", included: true },
      { text: "Advanced analytics & reports", included: true },
      { text: "API access", included: false },
      { text: "Custom integrations", included: false },
    ],
  },
  {
    name: "Business",
    description:
      "Enterprise-grade CRM for large organisations with custom workflows.",
    price: 149,
    billingPeriod: "month",
    priceId: process.env.STRIPE_PRICE_BUSINESS ?? "price_business",
    features: [
      { text: "Unlimited contacts", included: true },
      { text: "Unlimited user seats", included: true },
      { text: "Advanced pipeline management", included: true },
      { text: "Email, SMS & WhatsApp reminders", included: true },
      { text: "CSV import / export", included: true },
      { text: "Mobile app access", included: true },
      { text: "Team collaboration tools", included: true },
      { text: "Advanced analytics & reports", included: true },
      { text: "API access", included: true },
      { text: "Custom integrations", included: true },
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Simple, transparent pricing
        </h1>
        <p className="mt-3 text-muted-foreground">
          Choose the plan that fits your business. Upgrade or downgrade at any
          time.
        </p>
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} />
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        All plans include a 14-day free trial. No credit card required.
        <br />
        Prices shown in USD. Billed monthly. Annual billing saves 20%.
      </p>
    </div>
  )
}
