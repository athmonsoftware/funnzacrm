"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Feature = {
  text: string
  included: boolean
}

export type PricingTier = {
  name: string
  description: string
  price: number
  billingPeriod: string
  priceId: string
  features: Feature[]
  highlighted?: boolean
  badge?: string
}

function CheckIcon({ included }: { included: boolean }) {
  if (included) {
    return (
      <svg
        className="size-4 shrink-0 text-primary"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="8" className="fill-primary/10" />
        <path
          d="M5 8l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <svg
      className="size-4 shrink-0 text-muted-foreground/40"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="8" className="fill-muted/50" />
      <path
        d="M5.5 10.5l5-5M10.5 10.5l-5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PricingCard({ tier }: { tier: PricingTier }) {
  const [loading, setLoading] = useState(false)

  async function handleSubscribe() {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: tier.priceId }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong. Please try again.")
        return
      }
      if (data.url) {
        toast.success("Redirecting to checkout...")
        window.location.href = data.url
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      className={cn(
        "relative flex flex-col gap-0 overflow-hidden transition-shadow hover:shadow-md",
        tier.highlighted &&
          "border-primary shadow-md ring-1 ring-primary/20"
      )}
    >
      {tier.badge && (
        <div className="absolute top-4 right-4">
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-primary-foreground">
            {tier.badge}
          </span>
        </div>
      )}
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">{tier.name}</CardTitle>
        <CardDescription className="text-xs">{tier.description}</CardDescription>
        <div className="mt-3 flex items-end gap-1">
          <span className="text-3xl font-bold tracking-tight">
            ${tier.price}
          </span>
          <span className="mb-0.5 text-xs text-muted-foreground">
            /{tier.billingPeriod}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6">
        <ul className="flex flex-1 flex-col gap-2.5">
          {tier.features.map((feature) => (
            <li key={feature.text} className="flex items-center gap-2.5">
              <CheckIcon included={feature.included} />
              <span
                className={cn(
                  "text-xs",
                  !feature.included && "text-muted-foreground/60 line-through"
                )}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        <Button
          size="lg"
          variant={tier.highlighted ? "default" : "outline"}
          className="w-full"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? "Redirecting..." : `Get ${tier.name}`}
        </Button>
      </CardContent>
    </Card>
  )
}
