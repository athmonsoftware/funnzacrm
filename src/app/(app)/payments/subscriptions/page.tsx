"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Layers } from "lucide-react";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";

type Plan = {
  id: string;
  name: string;
  price: number;
  price_suffix: string;
  features: string[] | string;
};

type Billing = {
  id: string;
  created_at: string;
  plan: string;
  amount: number;
  status: string;
};

type WorkspaceSubscription = {
  plan_id: string;
};

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [billing, setBilling] = useState<Billing[]>([]);
  const [currentPlan, setCurrentPlan] = useState<WorkspaceSubscription | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function load() {
      try {
        const [p, b, c] = await Promise.all([
          fetch(`${API}/api/subscriptions/plans`, {
            credentials: "include",
          }),
          fetch(`${API}/api/subscriptions/billing`, {
            credentials: "include",
          }),
          fetch(`${API}/api/subscriptions/current`, {
            credentials: "include",
          }),
        ]);

        if (!p.ok || !b.ok || !c.ok) throw new Error();

        const plansData = await p.json();
        const billingData = await b.json();
        const currentData = await c.json();

        setPlans(plansData.plans || []);
        setBilling(billingData.billing || []);
        setCurrentPlan(currentData.subscription || null);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function switchPlan(planId: string) {
    try {
      const res = await fetch(`${API}/api/subscriptions/switch`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setCurrentPlan(data.subscription);
    } catch (err) {
      alert("Failed to switch plan");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading subscriptions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Failed to load subscriptions
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        {/* HEADER */}
        <section>
          <p className="text-sm font-semibold text-funza-primary">
            Payment center
          </p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Subscriptions
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Compare plans, manage subscription, and review billing history.
          </p>
        </section>

        {/* PLANS */}
        <section className="grid gap-4 lg:grid-cols-4">
          {plans.map((plan) => {
            const isActive = plan.id === currentPlan?.plan_id;

            const features =
              typeof plan.features === "string"
                ? JSON.parse(plan.features)
                : plan.features;

            return (
              <Card key={plan.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <Layers className="text-funza-primary" size={18} />
                  {isActive && <Badge>Current</Badge>}
                </div>

                <h2 className="mt-4 text-lg font-semibold">{plan.name}</h2>

                <p className="mt-2 text-2xl font-semibold">
                  GHS {Number(plan.price).toFixed(2)}
                  <span className="text-sm font-medium text-muted-foreground">
                    {plan.price_suffix}
                  </span>
                </p>

                <div className="mt-4 space-y-2">
                  {features?.map((feature: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-funza-primary"
                        size={15}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  tone={isActive ? "secondary" : "primary"}
                  className="mt-5 w-full"
                  onClick={() => switchPlan(plan.id)}
                  disabled={isActive}
                >
                  {isActive ? "Active plan" : "Switch plan"}
                </Button>
              </Card>
            );
          })}
        </section>

        {/* BILLING HISTORY */}
        <Card>
          <SectionHeader title="Billing history" />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-muted text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Invoice</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Plan</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {billing.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-muted-foreground"
                    >
                      No billing history yet
                    </td>
                  </tr>
                ) : (
                  billing.map((item) => (
                    <tr key={item.id} className="bg-card">
                      <td className="px-5 py-4 font-mono text-xs">{item.id}</td>
                      <td className="px-5 py-4">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4">{item.plan}</td>
                      <td className="px-5 py-4 font-semibold">
                        GHS {Number(item.amount).toFixed(2)}
                      </td>
                      <td className="px-5 py-4">
                        <Badge>{item.status}</Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  );
}
