import { billingHistory } from "@/lib/mock-data"
import { Card, Badge, SectionHeader } from "@/components/ui"

export default function BillingPage() {
  return (
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
              <tr key={invoice.id}>
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
  )
}
