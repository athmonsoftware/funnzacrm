"use client";

import { useEffect, useState } from "react";
import { Receipt } from "lucide-react";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";

type Receipt = {
  id: string;
  receipt_number: string;
  customer: string;
  payment_method: string;
  invoice_id: string | null;
  payment_date: string;
  currency: string;
  amount: number;
};

type Invoice = {
  id: string;
  invoice_number: string;
  customer: string;
  balance_due: number;
  currency: string;
};

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    invoice_id: "",
    customer: "",
    payment_method: "Cash",
    amount: 0,
    payment_date: "",
    payment_reference: "",
  });

  // ---------------- LOAD RECEIPTS ----------------
  useEffect(() => {
    async function loadData() {
      try {
        const [rRes, iRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/receipts`, {
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invoices`, {
            credentials: "include",
          }),
        ]);

        if (!rRes.ok || !iRes.ok) throw new Error();

        const rData = await rRes.json();
        const iData = await iRes.json();

        setReceipts(rData.receipts || []);
        setInvoices(iData.invoices || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ---------------- CREATE RECEIPT ----------------
  async function createReceipt() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/receipts`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();

      setReceipts((prev) => [data.receipt, ...prev]);
      setOpen(false);

      setForm({
        invoice_id: "",
        customer: "",
        payment_method: "Cash",
        amount: 0,
        payment_date: "",
        payment_reference: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create receipt");
    }
  }

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading receipts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Failed to load receipts
      </div>
    );
  }

  const isEmpty = receipts.length === 0;

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        {/* HEADER */}
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-funza-primary">
              Payment center
            </p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Receipts
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Track payments and generate proof of payment for customers.
            </p>
          </div>

          <Button className="gap-2" onClick={() => setOpen(true)}>
            <Receipt size={16} />
            Create receipt
          </Button>
        </section>

        {/* EMPTY STATE */}
        {isEmpty ? (
          <Card>
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Receipt size={48} className="text-muted-foreground" />

              <h2 className="mt-4 text-lg font-semibold">No receipts yet</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Create your first payment receipt for an invoice or direct
                payment.
              </p>

              <Button className="mt-4" onClick={() => setOpen(true)}>
                Create receipt
              </Button>
            </div>
          </Card>
        ) : (
          <Card>
            <SectionHeader title="Receipt management" />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-muted text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3">Receipt</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Method</th>
                    <th className="px-5 py-3">Invoice</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Amount</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {receipts.map((r) => (
                    <tr key={r.id} className="bg-card">
                      <td className="px-5 py-4 font-mono text-xs">
                        {r.receipt_number}
                      </td>

                      <td className="px-5 py-4 font-semibold">{r.customer}</td>

                      <td className="px-5 py-4">{r.payment_method}</td>

                      <td className="px-5 py-4">
                        {r.invoice_id ? (
                          <span className="font-mono text-xs">
                            {r.invoice_id}
                          </span>
                        ) : (
                          <Badge tone="gray">Direct</Badge>
                        )}
                      </td>

                      <td className="px-5 py-4 text-muted-foreground">
                        {r.payment_date}
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        GHS {Number(r.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ================= MODAL ================= */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg rounded-lg bg-background p-6">
              <h2 className="text-lg font-semibold">Create Receipt</h2>

              {/* INVOICE */}
              <div className="mt-4">
                <label className="text-xs text-muted-foreground">
                  Select Invoice (optional)
                </label>

                <select
                  className="w-full border rounded p-2"
                  value={form.invoice_id}
                  onChange={(e) => {
                    const invoice = invoices.find(
                      (i) => i.id === e.target.value
                    );

                    setForm({
                      ...form,
                      invoice_id: e.target.value,
                      customer: invoice?.customer || "",
                      amount: invoice?.balance_due || 0,
                    });
                  }}
                >
                  <option value="">Direct Payment</option>

                  {invoices.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.invoice_number} - {i.customer}
                    </option>
                  ))}
                </select>
              </div>

              {/* CUSTOMER */}
              <input
                className="w-full mt-3 border rounded p-2"
                placeholder="Customer"
                value={form.customer}
                onChange={(e) => setForm({ ...form, customer: e.target.value })}
              />

              {/* METHOD */}
              <select
                className="w-full mt-3 border rounded p-2"
                value={form.payment_method}
                onChange={(e) =>
                  setForm({ ...form, payment_method: e.target.value })
                }
              >
                <option>Cash</option>
                <option>MoMo</option>
                <option>Bank Transfer</option>
                <option>Card</option>
              </select>

              {/* AMOUNT */}
              <input
                type="number"
                className="w-full mt-3 border rounded p-2"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: Number(e.target.value) })
                }
              />

              {/* DATE */}
              <input
                type="date"
                className="w-full mt-3 border rounded p-2"
                value={form.payment_date}
                onChange={(e) =>
                  setForm({ ...form, payment_date: e.target.value })
                }
              />

              {/* ACTIONS */}
              <div className="mt-5 flex justify-end gap-2">
                <Button onClick={() => setOpen(false)}>Cancel</Button>

                <Button onClick={createReceipt}>Save Receipt</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
