import { Receipt } from "lucide-react"
import { receipts } from "@/lib/mock-data"
import { Badge, Button, Card, SectionHeader } from "@/components/ui"

export default function ReceiptsPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#16a34a]">Payment center</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Receipts</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
              Review automatically generated receipts and resend proof of payment to customers.
            </p>
          </div>
          <Button className="gap-2">
            <Receipt size={16} />
            Create receipt
          </Button>
        </section>

        <Card>
          <SectionHeader title="Receipt management" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-[#f8fafc] text-xs uppercase tracking-[0.12em] text-[#64748b]">
                <tr>
                  <th className="px-5 py-3">Receipt</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Payment method</th>
                  <th className="px-5 py-3">Invoice</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf1f5]">
                {receipts.map((receipt) => (
                  <tr key={receipt.id} className="bg-white">
                    <td className="px-5 py-4 font-mono text-xs">{receipt.id}</td>
                    <td className="px-5 py-4 font-semibold">{receipt.customer}</td>
                    <td className="px-5 py-4">{receipt.paymentMethod}</td>
                    <td className="px-5 py-4">
                      {receipt.invoiceId ? <span className="font-mono text-xs">{receipt.invoiceId}</span> : <Badge tone="gray">Direct</Badge>}
                    </td>
                    <td className="px-5 py-4 text-[#64748b]">{receipt.date}</td>
                    <td className="px-5 py-4 font-semibold">{receipt.amount}</td>
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
