import { FileText, Send } from "lucide-react"
import { invoices } from "@/lib/mock-data"
import { Badge, Button, Card, SectionHeader } from "@/components/ui"

const statusTone = {
  Paid: "green",
  Sent: "blue",
  Overdue: "red",
} as const

function getStatusTone(status: string) {
  return status in statusTone ? statusTone[status as keyof typeof statusTone] : "gray"
}

export default function InvoicesPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#16a34a]">Payment center</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Invoices</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
              Issue, track, and reconcile invoices for customer orders and enterprise contracts.
            </p>
          </div>
          <Button className="gap-2">
            <FileText size={16} />
            Create invoice
          </Button>
        </section>

        <Card>
          <SectionHeader title="Invoice management" action={<Button tone="secondary" className="gap-2"><Send size={16} />Send reminders</Button>} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-[#f8fafc] text-xs uppercase tracking-[0.12em] text-[#64748b]">
                <tr>
                  <th className="px-5 py-3">Invoice</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Issued</th>
                  <th className="px-5 py-3">Due</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf1f5]">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="bg-white">
                    <td className="px-5 py-4 font-mono text-xs">{invoice.id}</td>
                    <td className="px-5 py-4 font-semibold">{invoice.customer}</td>
                    <td className="px-5 py-4 text-[#64748b]">{invoice.issuedDate}</td>
                    <td className="px-5 py-4">{invoice.dueDate}</td>
                    <td className="px-5 py-4 font-semibold">{invoice.amount}</td>
                    <td className="px-5 py-4">
                      <Badge tone={getStatusTone(invoice.status)}>{invoice.status}</Badge>
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
