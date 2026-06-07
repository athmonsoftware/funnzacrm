"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  ProgressBar,
  SectionHeader,
} from "@/components/ui";
import {
  conversations as mockConversations,
  crmMetrics as mockMetrics,
  onboardingSteps as mockSteps,
} from "@/lib/mock-data";
import { useRouter } from "next/navigation";

type Metric = {
  label: string;
  value: string;
  change: string;
};

type Conversation = {
  id: string;
  title: string | null;
  customer_number: string;
  company_number: string;
  source: string | null;
  lastMessage: string | null;
  messageCount: number;
  messages: {
    role: "user" | "assistant" | "system";
    content: string;
  }[];
};

type Step = {
  label: string;
  done: boolean;
};

type DashboardData = {
  crmMetrics?: Metric[];
  conversations?: Conversation[];
  onboardingSteps?: Step[];
};

export default function Home() {
  return (
    <main className="min-h-screen text-[#14213d]">
      <div className="flex min-h-screen">
        <section className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
            <Dashboard />
          </div>
        </section>
      </div>
    </main>
  );
}

function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/conversations`,
          {
            cache: "no-store",
            credentials: "include", // 🔥 REQUIRED
          },
        );
        if (!res.ok) throw new Error("Failed to fetch conversations");

        const json = await res.json();

        setData({
          conversations: json.conversations || json.data || json,
        });
      } catch (err) {
        console.error("Conversations API failed, using mock", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // 🔥 HYBRID MERGE (backend wins, mock fallback)
  const metrics = data?.crmMetrics ?? mockMetrics;
  const conversations = data?.conversations ?? [];
  const onboardingSteps = data?.onboardingSteps ?? mockSteps;

  const progress =
    (onboardingSteps.filter((s) => s.done).length / onboardingSteps.length) *
    100;

  return (
    <div className="space-y-6">
      {/* METRICS */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-5">
            <p className="text-sm text-[#64748b]">{metric.label}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="text-3xl font-semibold">{metric.value}</p>
              <Badge>{metric.change}</Badge>
            </div>
          </Card>
        ))}
      </section>

      {/* CONTENT */}
      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <SectionHeader
            title="Recent conversations"
            action={
              <Button tone="secondary" onClick={() => router.push("/inbox")}>
                Open inbox
              </Button>
            }
          />

          <div className="divide-y divide-[#edf1f5]">
            {conversations.slice(0, 4).map((c) => (
              <div key={c.id} className="px-5 py-4 space-y-3">
                {/* HEADER (like WhatsApp/SMS thread) */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{c.customer_number}</p>
                  </div>

                  <Badge tone="gray">{c.source || "unknown"}</Badge>
                </div>

                {/* CHAT PREVIEW */}
                <div className="space-y-2 bg-[#f8fafc] rounded-lg p-3">
                  {(c.messages || []).slice(-3).map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        m.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                          m.role === "user"
                            ? "bg-[#14213d] text-white"
                            : "bg-white border border-[#e5e7eb]"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between text-xs text-[#64748b]">
                  <span>{c.messageCount} messages</span>
                  <span className="truncate max-w-[200px]">
                    {c.lastMessage || "No messages yet"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ONBOARDING (unchanged) */}
        <Card>
          <SectionHeader
            title="Onboarding progress"
            action={<Button tone="secondary">Review</Button>}
          />

          <div className="space-y-3 p-5">
            <ProgressBar value={progress} />

            {onboardingSteps.map((step) => (
              <div key={step.label} className="flex items-center gap-3">
                <CheckCircle2
                  className={step.done ? "text-[#16a34a]" : "text-[#cbd5e1]"}
                  size={18}
                />
                <span className="text-sm font-medium">{step.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
