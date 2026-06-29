"use client";

import { billingHistory as mockBillingHistory } from "@/lib/mock-data";
import { Card, Badge, SectionHeader } from "@/components/ui";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

type Invoice = {
  id: string;
  date: string;
  plan: string;
  amount: string;
  status: string;
};

export default function BillingPage() {
  const [billingHistory, setBillingHistory] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadBilling() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/billing`,
          { cache: "no-store" },
        );

        if (res.ok) {
          const json = await res.json();
          setBillingHistory(json.billingHistory || json.data || []);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Billing API failed", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadBilling();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading billing history...
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <SectionHeader title="Billing history" />
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <AlertCircle className="text-muted-foreground" size={48} />
          <h2 className="mt-4 text-lg font-semibold">Data cannot be found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Unable to load billing data. Please try again later.
          </p>
        </div>
      </Card>
    );
  }

  const displayData =
    billingHistory.length > 0 ? billingHistory : mockBillingHistory;

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
            {displayData.map((invoice) => (
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
  );
}
