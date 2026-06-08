"use client";

import { useMemo, useState } from "react";
import { Download, Filter, Search, Tags, Upload, UserPlus } from "lucide-react";
import { customers, customerSegments, customerTags } from "@/lib/mock-data";
import { Badge, Button, Card } from "@/components/ui";

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
          customer.assignedAgent ?? "Unassigned",
          customer.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(value);
      const matchesStatus = status === "All" || customer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [query, status]);

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

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#16a34a]">
              Customer management
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
              Customer directory
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
              Search, segment, assign, import, and export customer records
              across SMS, WhatsApp, and AI-assisted support.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button tone="secondary" className="gap-2">
              <Upload size={16} />
              Import CSV
            </Button>
            <Button tone="secondary" className="gap-2">
              <Download size={16} />
              Export CSV
            </Button>
            <Button className="gap-2">
              <UserPlus size={16} />
              Add customer
            </Button>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="p-4">
            <p className="text-sm text-[#64748b]">Total customers</p>
            <p className="mt-2 text-2xl font-semibold">
              {customers.length.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-[#64748b]">
              12 demo records ready for workflows
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-[#64748b]">Active customers</p>
            <p className="mt-2 text-2xl font-semibold">
              {
                customers.filter((customer) => customer.status === "Active")
                  .length
              }
            </p>
            <p className="mt-1 text-xs text-[#64748b]">
              Available for campaigns and assignment
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-[#64748b]">Top segment</p>
            <p className="mt-2 text-2xl font-semibold">
              {customerSegments[0].name}
            </p>
            <p className="mt-1 text-xs text-[#64748b]">
              {customerSegments[0].count} customers in segment
            </p>
          </Card>
        </section>

        <Card>
          <div className="flex flex-col gap-3 border-b border-[#edf1f5] p-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] xl:min-w-[620px]">
              <label className="flex h-11 min-w-0 items-center gap-2 rounded-md border border-[#d8e0e8] bg-white px-3">
                <Search size={17} className="text-[#64748b]" />
                <input
                  className="min-w-0 flex-1 text-sm outline-none"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search name, phone, email, tag, or agent"
                />
              </label>
              <label className="flex h-11 items-center gap-2 rounded-md border border-[#d8e0e8] bg-white px-3 text-sm">
                <Filter size={16} className="text-[#64748b]" />
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
              <span className="text-sm text-[#64748b]">
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
              <thead className="bg-[#f8fafc] text-xs uppercase tracking-[0.12em] text-[#64748b]">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf1f5]">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="bg-white hover:bg-[#fbfdff]">
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
                        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#eef7f1] text-xs font-bold text-[#047857]">
                          {customer.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <div>
                          <p className="font-semibold">{customer.name}</p>
                          <p className="mt-0.5 text-xs text-[#64748b]">
                            {customer.source}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs">
                      {customer.phone}
                    </td>
                    <td className="px-5 py-4 text-[#475569]">
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
                    <td className="px-5 py-4 text-[#64748b]">
                      {customer.lastActive}
                    </td>
                    <td className="px-5 py-4">
                      {customer.assignedAgent ? (
                        <span className="font-medium">
                          {customer.assignedAgent}
                        </span>
                      ) : (
                        <Badge tone="gray">Unassigned</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#edf1f5] px-5 py-4 text-sm text-[#64748b] sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing{" "}
              <span className="font-semibold text-[#14213d]">
                {filteredCustomers.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#14213d]">
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
    </main>
  );
}
