"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Filter, Search, Tags, Upload, UserPlus } from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";
import Papa from "papaparse";

export type Customer = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  source: string | null;
  status: string;
  stage: string;
  assigned_agent: string | null;
  tags: string[];
  avatar: string | null;
  last_active: string | null;
};

const statusTone = {
  Active: "green",
  Inactive: "gray",
  Churned: "red",
} as const;

function getStatusTone(status: string) {
  return status in statusTone
    ? statusTone[status as keyof typeof statusTone]
    : "gray";
}

export default function CustomersPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
    status: "",
    stage: "",
    assignedAgent: "",
    tags: "",
    avatar: "",
  });
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [customerTags, setCustomerTags] = useState<
    { id: string; name: string; count: number }[]
  >([]);

  const filteredCustomers = useMemo(() => {
    const value = query.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !value ||
        [
          customer.name,
          customer.phone,
          customer.email,
          customer.status,
          customer.assigned_agent ?? "Unassigned",
          customer.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(value);

      const matchesStatus = status === "All" || customer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [customers, query, status]);
  const visibleIds = filteredCustomers.map((customer) => customer.id);
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  function toggleCustomer(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id]
    );
  }

  function toggleVisible() {
    setSelectedIds((current) => {
      if (allVisibleSelected)
        return current.filter((id) => !visibleIds.includes(id));
      return Array.from(new Set([...current, ...visibleIds]));
    });
  }

  async function createCustomer() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customers`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            tags: form.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      await fetchCustomers();

      setShowCreateModal(false);

      setForm({
        name: "",
        phone: "",
        email: "",
        source: "WhatsApp",
        status: "Active",
        stage: "New",
        assignedAgent: "",
        tags: "",
        avatar: "",
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchCustomers() {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customers`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setCustomers(data.customers || []);
      setCustomerTags(data.customerTags || []);
    } catch (err) {
      console.error("Failed to load customers:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateCustomer() {
    if (!editingCustomer) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customers/${editingCustomer.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            email: form.email,

            status: form.status,
            stage: form.stage,

            source: form.source,

            assignedAgent: form.assignedAgent,

            tags: form.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),

            avatar: form.avatar,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      await fetchCustomers();

      resetForm();
    } catch (err) {
      console.error(err);
    }
  }

  function resetForm() {
    setEditingCustomer(null);
    setShowCreateModal(false);

    setForm({
      name: "",
      phone: "",
      email: "",
      source: "WhatsApp",
      status: "Active",
      stage: "New",
      assignedAgent: "",
      tags: "",
      avatar: "",
    });
  }

  async function deleteCustomer(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customers/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      await fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCSVUpload(file: File) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const rows = results.data;

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/customers/bulk`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ rows }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error);
          }

          await fetchCustomers();
          console.log("Bulk import success:", data);
        } catch (err) {
          console.error("Bulk import failed:", err);
        }
      },
    });
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    console.log("Customers:", customers);
  }, [customers]);

  const topSegment = useMemo(() => {
    const map = new Map<string, number>();

    for (const c of customers) {
      const key = c.stage || "Unknown";
      map.set(key, (map.get(key) || 0) + 1);
    }

    let best = { name: "N/A", count: 0 };

    for (const [name, count] of map.entries()) {
      if (count > best.count) {
        best = { name, count };
      }
    }

    return best;
  }, [customers]);

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-funza-primary">
              Customer management
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
              Customer directory
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Search, segment, assign, import, and export customer records
              across SMS, WhatsApp, and AI-assisted support.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              tone="secondary"
              className="gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={16} />
              Import CSV
            </Button>
            <Button tone="secondary" className="gap-2">
              <Download size={16} />
              Export CSV
            </Button>
            <Button className="gap-2" onClick={() => setShowCreateModal(true)}>
              <UserPlus size={16} />
              Add customer
            </Button>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total customers</p>
            <p className="mt-2 text-2xl font-semibold">
              {customers.length.toLocaleString()}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Active customers</p>
            <p className="mt-2 text-2xl font-semibold">
              {
                customers.filter((customer) => customer.status === "Active")
                  .length
              }
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Available for campaigns and assignment
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Top segment</p>
            <p className="mt-2 text-2xl font-semibold">{topSegment.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {topSegment.count} customers in segment
            </p>
          </Card>
        </section>

        <Card>
          <div className="flex flex-col gap-3 border-b border-border p-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] xl:min-w-[620px]">
              <label className="flex h-11 min-w-0 items-center gap-2 rounded-md border border-border bg-card px-3">
                <Search size={17} className="text-muted-foreground" />
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search name, phone, email, tag, or agent"
                />
              </label>
              <label className="flex h-11 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm">
                <Filter size={16} className="text-muted-foreground" />
                <select
                  className="bg-transparent text-sm outline-none"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  {["All", "Active", "Inactive", "Churned"].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedIds.length} selected
              </span>
              <Button
                tone="secondary"
                className="gap-2"
                disabled={selectedIds.length === 0}
              >
                <Tags size={16} />
                Apply tag
              </Button>
              <Button tone="secondary" disabled={selectedIds.length === 0}>
                Assign agent
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] text-left text-sm">
              <thead className="bg-muted text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="w-12 px-5 py-3">
                    <input
                      aria-label="Select all visible customers"
                      checked={allVisibleSelected}
                      onChange={toggleVisible}
                      type="checkbox"
                    />
                  </th>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Phone number</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Tags</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Last activity</th>
                  <th className="px-5 py-3 font-semibold">Assigned agent</th>
                  <th className="px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="bg-card hover:bg-muted/50">
                    <td className="px-5 py-4">
                      <input
                        aria-label={`Select ${customer.name}`}
                        checked={selectedIds.includes(customer.id)}
                        onChange={() => toggleCustomer(customer.id)}
                        type="checkbox"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-funza-primary-light text-xs font-bold text-funza-primary">
                          {customer.name
                            ?.split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <div>
                          <p className="font-semibold">{customer.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {customer.source}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs">
                      {customer.phone}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {customer.email}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex max-w-56 flex-wrap gap-1.5">
                        {customer.tags.map((tag) => (
                          <Badge
                            key={tag}
                            tone={tag === "VIP" ? "amber" : "gray"}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge tone={getStatusTone(customer.status)}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {customer.last_active
                        ? new Date(customer.last_active).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-5 py-4">
                      {customer.assigned_agent ? (
                        <span className="font-medium">
                          {customer.assigned_agent}
                        </span>
                      ) : (
                        <Badge tone="gray">Unassigned</Badge>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <Button
                          tone="secondary"
                          onClick={() => {
                            setEditingCustomer(customer);

                            setForm({
                              name: customer.name || "",
                              phone: customer.phone || "",
                              email: customer.email || "",

                              source: customer.source || "",

                              status: customer.status || "Active",

                              stage: customer.stage || "New",

                              assignedAgent: customer.assigned_agent || "",

                              tags: customer.tags?.join(", ") || "",

                              avatar: customer.avatar || "",
                            });

                            setShowCreateModal(true);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          className="bg-destructive text-white hover:bg-destructive/90"
                          onClick={() => deleteCustomer(customer.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-border px-5 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredCustomers.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {customers.length}
              </span>{" "}
              customers
            </p>
            <div className="flex flex-wrap gap-2">
              {customerTags.slice(0, 5).map((tag) => (
                <Badge key={tag.id} tone="gray">
                  {tag.name} {tag.count}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Card className="w-full max-w-md p-6">
            <h2 className="mb-4 text-lg font-semibold">
              {editingCustomer ? "Edit Customer" : "Add Customer"}
            </h2>

            <div className="space-y-3">
              <input
                className="w-full rounded border bg-background p-2 text-foreground"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="w-full rounded border bg-background p-2 text-foreground"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                className="w-full rounded border bg-background p-2 text-foreground"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                className="w-full rounded border bg-background p-2 text-foreground"
                placeholder="Assigned Agent"
                value={form.assignedAgent}
                onChange={(e) =>
                  setForm({ ...form, assignedAgent: e.target.value })
                }
              />

              <input
                className="w-full rounded border bg-background p-2 text-foreground"
                placeholder="Tags (VIP, Retail, Enterprise)"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />

              <input
                className="w-full rounded border bg-background p-2 text-foreground"
                placeholder="Avatar URL (optional)"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              />

              <select
                className="w-full rounded border bg-background p-2 text-foreground"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="SMS">SMS</option>
                <option value="Web chat">Web chat</option>
                <option value="Email">Email</option>
                <option value="Manual">Manual</option>
              </select>

              <select
                className="w-full rounded border bg-background p-2 text-foreground"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Churned">Churned</option>
              </select>

              <select
                className="w-full rounded border bg-background p-2 text-foreground"
                value={form.stage}
                onChange={(e) => setForm({ ...form, stage: e.target.value })}
              >
                <option value="New">New</option>
                <option value="Qualified">Qualified</option>
                <option value="Support">Support</option>
                <option value="Customer">Customer</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Enterprise lead">Enterprise lead</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                tone="secondary"
                onClick={() => {
                  setEditingCustomer(null);
                  setShowCreateModal(false);
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={() =>
                  editingCustomer ? updateCustomer() : createCustomer()
                }
              >
                {editingCustomer ? "Update" : "Create"}
              </Button>
            </div>
          </Card>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleCSVUpload(file);
        }}
      />
    </main>
  );
}
