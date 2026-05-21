"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { customers } from "@/lib/mock-data"
import { Card, Badge, TextInput } from "@/components/ui"

export default function CustomersPage() {
  const [query, setQuery] = useState("")

  const filteredCustomers = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return customers
    return customers.filter((customer) =>
      [customer.name, customer.phone, customer.stage, customer.source]
        .join(" ")
        .toLowerCase()
        .includes(value),
    )
  }, [query])

  return (
    <Card>
      <div className="flex flex-col gap-3 border-b border-[#edf1f5] p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Customers and leads</h2>
          <p className="mt-1 text-sm text-[#64748b]">Track stages, source channels, and last activity.</p>
        </div>
        <label className="flex h-11 w-full items-center gap-2 rounded-md border border-[#d8e0e8] px-3 lg:w-80">
          <Search size={17} className="text-[#64748b]" />
          <input
            className="min-w-0 flex-1 text-sm outline-none"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search customers"
          />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-[#f8fafc] text-xs uppercase tracking-[0.12em] text-[#64748b]">
            <tr>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Phone</th>
              <th className="px-5 py-3 font-semibold">Stage</th>
              <th className="px-5 py-3 font-semibold">Source</th>
              <th className="px-5 py-3 font-semibold">Last active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf1f5]">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-5 py-4 font-semibold">{customer.name}</td>
                <td className="px-5 py-4 font-mono text-xs">{customer.phone}</td>
                <td className="px-5 py-4">
                  <Badge>{customer.stage}</Badge>
                </td>
                <td className="px-5 py-4">{customer.source}</td>
                <td className="px-5 py-4 text-[#64748b]">{customer.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
