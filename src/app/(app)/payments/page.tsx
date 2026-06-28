import { CreditCard, Receipt, Smartphone, Wallet } from "lucide-react"
import type { ElementType } from "react"
import { transactions } from "@/lib/mock-data"
import { Badge, Button, Card, SectionHeader } from "@/components/ui"

const statusTone = {
  successful: "green",
  pending: "amber",
  failed: "red",
} as const

export default function PaymentsPage() {
  const successful = transactions.filter((transaction) => transaction.status === "successful")
  const pending = transactions.filter((transaction) => transaction.status === "pending")
  const failed = transactions.filter((transaction) => transaction.status === "failed")

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-funza-primary">Payment center</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Transactions</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Monitor successful, pending, and failed payments across mobile money, bank transfer, and subscriptions.
            </p>
          </div>
          <Button>Generate payment link</Button>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <Summary icon={Wallet} label="Total transactions" value={transactions.length.toString()} />
          <Summary icon={CreditCard} label="Successful" value={successful.length.toString()} />
          <Summary icon={Smartphone} label="Pending" value={pending.length.toString()} tone="amber" />
          <Summary icon={Receipt} label="Failed" value={failed.length.toString()} tone="red" />
        </section>

        <Card>
          <SectionHeader title="Transaction management" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="bg-muted text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Reference</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3">Channel</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="bg-card">
                    <td className="px-5 py-4 font-mono text-xs">{transaction.id}</td>
                    <td className="px-5 py-4 font-semibold">{transaction.customer}</td>
                    <td className="px-5 py-4 text-muted-foreground">{transaction.description}</td>
                    <td className="px-5 py-4">{transaction.channel}</td>
                    <td className="px-5 py-4 text-muted-foreground">{transaction.date}</td>
                    <td className="px-5 py-4 font-semibold">{transaction.amount}</td>
                    <td className="px-5 py-4">
                      <Badge tone={statusTone[transaction.status]}>{transaction.status}</Badge>
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

function Summary({
  icon: Icon,
  label,
  value,
  tone = "green",
}: {
  icon: ElementType
  label: string
  value: string
  tone?: "green" | "amber" | "red"
}) {
  const color = tone === "green" ? "text-funza-primary bg-funza-primary-light" : tone === "amber" ? "text-orange-700 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/30" : "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950/30"

  return (
    <Card className="p-4">
      <span className={`flex h-10 w-10 items-center justify-center rounded-md ${color}`}>
        <Icon size={18} />
      </span>
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </Card>
  )
}
