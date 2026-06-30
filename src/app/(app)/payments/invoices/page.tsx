"use client";

import { FileText, Send } from "lucide-react";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";
import { useEffect, useState } from "react";

type Invoice = {
  id: string;
  invoice_number: string;
  customer: string;
  issued_date: string;
  due_date: string;
  total: number;
  status: "Draft" | "Sent" | "Viewed" | "Paid" | "Overdue";
};

type InvoiceItem = {
  name: string;
  description: string;
  quantity: number;
  unit_price: number;
  discount: number;
  tax: number;
};

const statusTone = {
  Draft: "gray",
  Sent: "blue",
  Viewed: "blue",
  Paid: "green",
  Overdue: "red",
} as const;

function getStatusTone(status: string) {
  return status in statusTone
    ? statusTone[status as keyof typeof statusTone]
    : "gray";
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    customer: "",
    customer_email: "",
    dueDate: "",
    title: "",
    status: "",
    issueDate: "",
    description: "",
    items: [
      {
        name: "",
        description: "",
        quantity: 1,
        unit_price: 0,
        discount: 0,
        tax: 0,
      },
    ],
  });
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const subtotal = form.items.reduce((sum, item) => {
    return sum + item.quantity * item.unit_price - item.discount + item.tax;
  }, 0);

  function addItem() {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          name: "",
          description: "",
          quantity: 1,
          unit_price: 0,
          discount: 0,
          tax: 0,
        },
      ],
    }));
  }

  function updateItem(index: number, field: string, value: any) {
    const updated = [...form.items];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, items: updated });
  }

  function removeItem(index: number) {
    setForm({
      ...form,
      items: form.items.filter((_, i) => i !== index),
    });
  }

  useEffect(() => {
    async function loadInvoices() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/invoices`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setInvoices(data.invoices || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadInvoices();
  }, []);

  async function createInvoice() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/invoices`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: form.customer,
            customer_email: form.customer_email,
            title: form.title,
            description: form.description,
            issueDate: form.issueDate,
            dueDate: form.dueDate,
            items: form.items,
            subtotal,
            total: subtotal,
            status: form.status,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      setInvoices((prev) => [data.invoice, ...prev]);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create invoice");
    }
  }

  useEffect(() => {
    async function loadCustomers() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customers`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      setCustomers(data.customers || []);
    }

    loadCustomers();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading invoices...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Failed to load invoices
      </div>
    );
  }

  const isEmpty = invoices.length === 0;

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
              Invoices
            </h1>
          </div>

          <Button className="gap-2" onClick={() => setOpen(true)}>
            <FileText size={16} />
            Create invoice
          </Button>
        </section>

        {/* EMPTY STATE */}
        {isEmpty ? (
          <Card>
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <FileText size={48} className="text-muted-foreground" />
              <h2 className="mt-4 text-lg font-semibold">No invoices yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Create your first invoice.
              </p>

              <Button className="mt-4" onClick={() => setOpen(true)}>
                Create invoice
              </Button>
            </div>
          </Card>
        ) : (
          <Card>
            <SectionHeader
              title="Invoice management"
              action={
                <Button tone="secondary" className="gap-2">
                  <Send size={16} />
                  Send reminders
                </Button>
              }
            />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-muted text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3">Invoice #</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Issued</th>
                    <th className="px-5 py-3">Due</th>
                    <th className="px-5 py-3">Total</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="bg-card">
                      <td className="px-5 py-4 font-mono text-xs">
                        {invoice.invoice_number}
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        {invoice.customer}
                      </td>

                      <td className="px-5 py-4 text-muted-foreground">
                        {invoice.issued_date}
                      </td>

                      <td className="px-5 py-4">{invoice.due_date}</td>

                      <td className="px-5 py-4 font-semibold">
                        GHS {invoice.total?.toFixed(2)}
                      </td>

                      <td className="px-5 py-4">
                        <Badge tone={getStatusTone(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </td>

                      <td className="px-5 py-4">
                        <Button
                          onClick={() =>
                            window.open(
                              `${process.env.NEXT_PUBLIC_API_URL}/api/invoices/${invoice.id}/pdf`,
                              "_blank"
                            )
                          }
                        >
                          PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-4xl rounded-lg bg-background p-6 max-h-[90vh] overflow-y-auto">
              {/* HEADER */}
              <h2 className="text-lg font-semibold">Create Invoice</h2>
              <p className="text-sm text-muted-foreground">
                Fill in all invoice details clearly before saving
              </p>

              {/* ================= CUSTOMER ================= */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2">Customer</h3>

                {/* SEARCH */}
                <input
                  className="w-full rounded border p-2 mb-2"
                  placeholder="Search customer by name or email..."
                  onChange={(e) => {
                    const value = e.target.value.toLowerCase();

                    const match = customers.find(
                      (c) =>
                        c.name.toLowerCase().includes(value) ||
                        (c.email || "").toLowerCase().includes(value)
                    );

                    if (match) {
                      setSelectedCustomer(match);

                      setForm((prev) => ({
                        ...prev,
                        customer: match.name,
                        customer_email:
                          match.email || prev.customer_email || "",
                      }));
                    }
                  }}
                />

                {/* CUSTOMER SELECT */}
                <select
                  className="rounded border p-2 w-full"
                  value={selectedCustomer?.id || ""}
                  onChange={(e) => {
                    const customer = customers.find(
                      (c) => c.id === e.target.value
                    );

                    setSelectedCustomer(customer);

                    setForm((prev) => ({
                      ...prev,
                      customer: customer?.name || "",
                      customer_email:
                        customer?.email || prev.customer_email || "",
                    }));
                  }}
                >
                  <option value="">Select customer</option>

                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.email ? `(${c.email})` : "(no email)"}
                    </option>
                  ))}
                </select>

                {/* EMAIL (ALWAYS EDITABLE) */}
                <div className="mt-2">
                  <label className="text-xs text-muted-foreground">
                    Customer Email (required for sending invoice)
                  </label>

                  <input
                    className="w-full rounded border p-2"
                    placeholder="Enter or edit customer email"
                    value={form.customer_email}
                    onChange={(e) =>
                      setForm({ ...form, customer_email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* ================= INVOICE DETAILS ================= */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2">Invoice Details</h3>

                <div className="grid grid-cols-2 gap-3">
                  {/* TITLE */}
                  <div className="col-span-2">
                    <label className="text-xs text-muted-foreground">
                      Invoice Title
                    </label>
                    <input
                      className="w-full rounded border p-2"
                      placeholder="e.g Website Development Invoice"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="col-span-2">
                    <label className="text-xs text-muted-foreground">
                      Description
                    </label>
                    <textarea
                      className="w-full rounded border p-2"
                      placeholder="Optional notes about this invoice"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </div>

                  {/* ISSUE DATE */}
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Issue Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded border p-2"
                      value={form.issueDate || ""}
                      onChange={(e) =>
                        setForm({ ...form, issueDate: e.target.value })
                      }
                    />
                  </div>

                  {/* DUE DATE */}
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded border p-2"
                      value={form.dueDate}
                      onChange={(e) =>
                        setForm({ ...form, dueDate: e.target.value })
                      }
                    />
                  </div>

                  {/* STATUS */}
                  <div className="col-span-2">
                    <label className="text-xs text-muted-foreground">
                      Status
                    </label>
                    <select
                      className="w-full rounded border p-2"
                      value={form.status || "Draft"}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                    >
                      <option value="Draft">Draft</option>
                      <option value="Sent">Sent</option>
                      <option value="Viewed">Viewed</option>
                      <option value="Paid">Paid</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ================= ITEMS ================= */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Items</h3>
                  <Button onClick={addItem}>+ Add Item</Button>
                </div>

                {/* HEADER */}
                <div className="grid grid-cols-12 text-xs text-muted-foreground mt-2 mb-1">
                  <div className="col-span-5">Item</div>
                  <div className="col-span-2">Qty</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Amount</div>
                </div>

                {/* ITEMS */}
                <div className="flex flex-col gap-2">
                  {form.items.map((item, i) => {
                    const lineTotal =
                      item.quantity * item.unit_price -
                      item.discount +
                      item.tax;

                    return (
                      <div
                        key={i}
                        className="grid grid-cols-12 gap-2 items-center"
                      >
                        <input
                          className="col-span-5 rounded border p-2"
                          placeholder="Item name"
                          value={item.name}
                          onChange={(e) =>
                            updateItem(i, "name", e.target.value)
                          }
                        />

                        <input
                          className="col-span-2 rounded border p-2"
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(i, "quantity", Number(e.target.value))
                          }
                        />

                        <input
                          className="col-span-2 rounded border p-2"
                          type="number"
                          placeholder="Price"
                          value={item.unit_price}
                          onChange={(e) =>
                            updateItem(i, "unit_price", Number(e.target.value))
                          }
                        />

                        {/* LINE TOTAL */}
                        <div className="col-span-2 text-sm font-medium">
                          GHS {lineTotal.toFixed(2)}
                        </div>

                        <Button
                          className="col-span-1"
                          onClick={() => removeItem(i)}
                        >
                          X
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ================= TOTAL ================= */}
              <div className="mt-6 border-t pt-3 flex justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-semibold">GHS {subtotal.toFixed(2)}</span>
              </div>

              {/* ================= ACTIONS ================= */}
              <div className="mt-6 flex justify-end gap-2">
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={createInvoice}>Create Invoice</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
