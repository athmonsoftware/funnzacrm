"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Upload } from "lucide-react";
import { Card, Badge } from "@/components/ui";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CustomersPage() {
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const [sourceFilter, setSourceFilter] = useState("");
  const [massSmsOpen, setMassSmsOpen] = useState(false);
  const [massWhatsappOpen, setMassWhatsappOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [targetChannel, setTargetChannel] = useState("sms");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    stage: "New",
    source: "",
    lastActive: "",
  });

  const handleMassSend = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/campaigns/sms/bulk`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: targetChannel,
          message,
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }

      const data = await res.json();

      alert(
        `Campaign sent.\nTotal: ${data.total}\nSent: ${data.sent}\nFailed: ${data.failed}`
      );

      setMassSmsOpen(false);
      setMassWhatsappOpen(false);
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to send campaign");
    }
  };
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          sortBy,
          order: sortOrder,
        });
        if (sourceFilter) {
          params.append("source", sourceFilter);
        }

        const res = await fetch(
          `${API_BASE_URL}/api/customers?${params.toString()}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch customers");

        const json = await res.json();

        setCustomers(json.customers || []);
      } catch (err) {
        console.error("Failed to load customers:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [sortBy, sortOrder, sourceFilter]);

  const handleCreateCustomer = async (data: typeof form) => {
    const res = await fetch(`${API_BASE_URL}/api/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create customer");

    const json = await res.json();

    const newCustomer = json.customer;

    setCustomers((prev) => [newCustomer, ...prev]);
  };

  const handleUpdateCustomer = async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/api/customers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update customer");

    const json = await res.json();

    setCustomers((prev) => prev.map((c) => (c.id === id ? json.customer : c)));
  };

  const handleDeleteCustomer = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/api/customers/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete customer");

    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };
  // -----------------------------
  // FILTER
  // -----------------------------
  const filteredCustomers = useMemo(() => {
    const value = query.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !value ||
        [customer.name, customer.phone, customer.stage, customer.source]
          .join(" ")
          .toLowerCase()
          .includes(value);

      const matchesSource =
        !sourceFilter ||
        customer.source?.toLowerCase() === sourceFilter.toLowerCase();

      return matchesSearch && matchesSource;
    });
  }, [query, customers, sourceFilter]);

  const handleCSVUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;

        const rows = text.split("\n").slice(1);

        const parsedRows = rows
          .filter(Boolean)
          .map((row) => {
            const [name, phone, stage, source, lastActive] = row.split(",");

            return {
              name: name?.trim(),
              phone: phone?.trim(),
              stage: stage?.trim() || "New",
              source: source?.trim() || "csv",
              lastActive: lastActive?.trim() || "",
            };
          })
          .filter((r) => r.name && r.phone);

        console.log("📤 Sending bulk rows:", parsedRows);

        const res = await fetch(`${API_BASE_URL}/api/customers/bulk`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ rows: parsedRows }),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("❌ Bulk upload failed:", errText);
          throw new Error("Bulk upload failed");
        }

        const json = await res.json();

        console.log("📦 Bulk upload response:", json);

        // append real DB customers
        setCustomers((prev) => [...json.inserted, ...prev]);
      } catch (err) {
        console.error("🔥 CSV upload error:", err);
      }
    };

    reader.readAsText(file);
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <Card>
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-[#edf1f5] p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Customers and leads</h2>
          <p className="mt-1 text-sm text-[#64748b]">
            Track stages, source channels, and last activity.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-row lg:items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-11 rounded-md border border-[#d8e0e8] px-3 text-sm"
          >
            <option value="created_at">Newest</option>
            <option value="name">Name</option>
            <option value="channel">Channel</option>
            <option value="phone">Phone</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="h-11 rounded-md border border-[#d8e0e8] px-3 text-sm"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="h-11 rounded-md border border-[#d8e0e8] px-3 text-sm"
          >
            <option value="">All Channels</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="sms">SMS</option>
          </select>
          {/* Search */}
          <label className="flex h-11 w-full items-center gap-2 rounded-md border border-[#d8e0e8] px-3 lg:w-80">
            <Search size={17} className="text-[#64748b]" />
            <input
              className="min-w-0 flex-1 text-sm outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search customers"
            />
          </label>

          <button
            onClick={() => setMassSmsOpen(true)}
            className="flex h-11 items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white"
          >
            Send SMS
          </button>

          {/* <button
            onClick={() => setMassWhatsappOpen(true)}
            className="flex h-11 items-center gap-2 rounded-md bg-green-600 px-4 text-sm font-medium text-white"
          >
            Send WhatsApp
          </button> */}

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex h-11 items-center gap-2 rounded-md bg-black px-4 text-sm font-medium text-white"
          >
            <Plus size={16} />
            Add Customer
          </button>

          {/* CSV */}
          <label className="flex h-11 cursor-pointer items-center gap-2 rounded-md border border-[#d8e0e8] px-4 text-sm">
            <Upload size={16} className="text-[#64748b]" />
            Upload CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-[#f8fafc] text-xs uppercase tracking-[0.12em] text-[#64748b]">
            <tr>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Phone</th>
              <th className="px-5 py-3 font-semibold">Stage</th>
              <th className="px-5 py-3 font-semibold">Source</th>
              <th className="px-5 py-3 font-semibold">Last active</th>
              <th className="px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#edf1f5]">
            {loading ? (
              <tr>
                <td className="p-5 text-sm text-gray-500" colSpan={5}>
                  Loading customers...
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-5 py-4 font-semibold">{customer.name}</td>
                  <td className="px-5 py-4 font-mono text-xs">
                    {customer.phone}
                  </td>
                  <td className="px-5 py-4">
                    <Badge>{customer.stage}</Badge>
                  </td>
                  <td className="px-5 py-4">{customer.source}</td>
                  <td className="px-5 py-4 text-[#64748b]">
                    {customer.lastActive || customer.last_active}
                  </td>
                  <td className="px-5 py-4 flex gap-2">
                    <button
                      className="text-blue-600 text-sm"
                      onClick={() => setEditingCustomer(customer)}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600 text-sm"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
            <h3 className="text-lg font-semibold">Add Customer</h3>

            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded border p-2 text-sm"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="w-full rounded border p-2 text-sm"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                className="w-full rounded border p-2 text-sm"
                placeholder="Source"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              />

              <input
                className="w-full rounded border p-2 text-sm"
                placeholder="Last Active"
                value={form.lastActive}
                onChange={(e) =>
                  setForm({ ...form, lastActive: e.target.value })
                }
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded border px-3 py-1 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleCreateCustomer(form);
                  setIsModalOpen(false);
                  setForm({
                    name: "",
                    phone: "",
                    stage: "New",
                    source: "",
                    lastActive: "",
                  });
                }}
                className="rounded bg-black px-3 py-1 text-sm text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
            <h3 className="text-lg font-semibold">Edit Customer</h3>

            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded border p-2 text-sm"
                value={editingCustomer.name || ""}
                onChange={(e) =>
                  setEditingCustomer({
                    ...editingCustomer,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="w-full rounded border p-2 text-sm"
                value={editingCustomer.phone || ""}
                onChange={(e) =>
                  setEditingCustomer({
                    ...editingCustomer,
                    phone: e.target.value,
                  })
                }
              />

              <input
                className="w-full rounded border p-2 text-sm"
                value={editingCustomer.stage || ""}
                onChange={(e) =>
                  setEditingCustomer({
                    ...editingCustomer,
                    stage: e.target.value,
                  })
                }
              />

              <input
                className="w-full rounded border p-2 text-sm"
                value={editingCustomer.source || ""}
                onChange={(e) =>
                  setEditingCustomer({
                    ...editingCustomer,
                    source: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setEditingCustomer(null)}
                className="rounded border px-3 py-1 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleUpdateCustomer(
                    editingCustomer.id,
                    editingCustomer
                  );
                  setEditingCustomer(null);
                }}
                className="rounded bg-black px-3 py-1 text-sm text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {massSmsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-lg bg-white p-5">
            <h3 className="text-lg font-semibold">Send Mass SMS</h3>

            <select
              value={targetChannel}
              onChange={(e) => setTargetChannel(e.target.value)}
              className="mt-4 w-full rounded border p-2"
            >
              <option value="sms">SMS Customers</option>
              <option value="whatsapp">WhatsApp Customers</option>
              <option value="facebook">Facebook Customers</option>
            </select>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-3 w-full rounded border p-3"
              rows={6}
              placeholder="Enter message..."
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setMassSmsOpen(false)}
                className="rounded border px-3 py-1"
              >
                Cancel
              </button>

              <button
                onClick={handleMassSend}
                className="rounded bg-blue-600 px-3 py-1 text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
