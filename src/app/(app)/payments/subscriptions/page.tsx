import { CheckCircle2, Layers } from "lucide-react"
import { billingHistory, subscriptionPlans } from "@/lib/mock-data"
import { Badge, Button, Card, SectionHeader } from "@/components/ui"

export default function SubscriptionsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section>
          <p className="text-sm font-semibold text-funza-primary">Payment center</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Subscriptions</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Compare plans, manage the active workspace subscription, and review billing history.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.name} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <Layers className="text-funza-primary" size={18} />
                {plan.current ? <Badge>Current</Badge> : null}
              </div>
              <h2 className="mt-4 text-lg font-semibold">{plan.name}</h2>
              <p className="mt-2 text-2xl font-semibold">{plan.price}<span className="text-sm font-medium text-muted-foreground">{plan.priceSuffix}</span></p>
              <div className="mt-4 space-y-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-funza-primary" size={15} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button tone={plan.current ? "secondary" : "primary"} className="mt-5 w-full">
                {plan.current ? "Active plan" : "Switch plan"}
              </Button>
            </Card>
          ))}
        </section>

        <Card>
          <SectionHeader title="Billing history" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-muted text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Invoice</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Plan</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {billingHistory.map((invoice) => (
                  <tr key={invoice.id} className="bg-card">
                    <td className="px-5 py-4 font-mono text-xs">{invoice.id}</td>
                    <td className="px-5 py-4">{invoice.date}</td>
                    <td className="px-5 py-4">{invoice.plan}</td>
                    <td className="px-5 py-4 font-semibold">{invoice.amount}</td>
                    <td className="px-5 py-4">
                      <Badge>{invoice.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  )
}
