"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Bot,
  CheckCircle2,
  MessageCircle,
  MessageSquareText,
  Send,
  Sparkles,
  Upload,
  UserPlus,
  UsersRound,
  Wallet,
} from "lucide-react";
import {
  aiPerformanceData,
  conversations,
  customerGrowthData,
  dashboardMetrics,
  messageVolumeData,
  quickActions,
  recentActivity,
  revenueData,
  subscriptionStatus,
} from "@/lib/mock-data";
import {
  Badge,
  Button,
  Card,
  ProgressBar,
  SectionHeader,
} from "@/components/ui";

const metricIcons = {
  users: UsersRound,
  "user-plus": UserPlus,
  bot: Bot,
  "message-square": MessageSquareText,
  wallet: Wallet,
  smartphone: Send,
  "message-circle": MessageCircle,
  sparkles: Sparkles,
};

const actionIcons = {
  send: Send,
  megaphone: MessageSquareText,
  "user-plus": UserPlus,
  upload: Upload,
  "user-round-plus": UsersRound,
};

const activityIcons = {
  conversation: MessageCircle,
  payment: Wallet,
  customer: UserPlus,
  team: UsersRound,
  ai: Sparkles,
};

export default function DashboardPage() {
  const [loadingCampaign, setLoadingCampaign] = useState(false);
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState("sms");
  const [source, setSource] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createCampaign = async () => {
    try {
      setLoadingCampaign(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns/sms/bulk`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            channel,
            source: source || null,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      console.log("✅ Campaign created:", data);

      alert(`Campaign started!\nSent: ${data.sent}\nFailed: ${data.failed}`);
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
    } finally {
      setLoadingCampaign(false);
    }
  };
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#16a34a]">
              Workspace overview
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
              AI operating system for business communication
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
              Monitor customers, conversations, payments, and AI automation from
              one fast workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap gap-2">
              <Button tone="secondary" onClick={() => setIsModalOpen(true)}>
                Create campaign
              </Button>

              <Button onClick={() => setIsModalOpen(true)}>Send message</Button>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => {
            const Icon =
              metricIcons[metric.icon as keyof typeof metricIcons] ?? Activity;
            const isDown = metric.trend === "down";

            return (
              <Card key={metric.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#eef7f1] text-[#16a34a]">
                    <Icon size={18} />
                  </div>
                  <Badge tone={isDown ? "amber" : "green"}>
                    {metric.change}
                  </Badge>
                </div>
                <p className="mt-4 text-sm text-[#64748b]">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-normal">
                  {metric.value}
                </p>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <Card>
            <SectionHeader
              title="Performance pulse"
              description="Customer growth, message volume, AI performance, and revenue trends."
            />

            <div className="grid gap-5 p-5 lg:grid-cols-2">
              <MiniBarChart
                title="Customer growth"
                data={customerGrowthData.map((item) => ({
                  label: item.month,
                  value: item.customers,
                }))}
                tone="green"
              />
              <MiniBarChart
                title="Revenue trends"
                data={revenueData.map((item) => ({
                  label: item.month,
                  value: item.revenue,
                }))}
                tone="blue"
              />
              <StackedMessageChart />
              <div className="rounded-md border border-[#edf1f5] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">AI performance</h2>
                    <p className="mt-1 text-sm text-[#64748b]">
                      Resolution mix across live conversations.
                    </p>
                  </div>
                  <Badge tone="blue">78.5%</Badge>
                </div>
                <div className="mt-5 space-y-4">
                  <MetricProgress
                    label="Resolved"
                    value={aiPerformanceData.resolved}
                    tone="bg-[#16a34a]"
                  />
                  <MetricProgress
                    label="Escalated"
                    value={aiPerformanceData.escalated}
                    tone="bg-[#4f46e5]"
                  />
                  <MetricProgress
                    label="Pending"
                    value={aiPerformanceData.pending}
                    tone="bg-[#f59e0b]"
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-5">
            <Card>
              <SectionHeader title="Quick actions" />
              <div className="grid gap-2 p-4 sm:grid-cols-2 xl:grid-cols-1">
                {quickActions.map((action) => {
                  const Icon =
                    actionIcons[action.icon as keyof typeof actionIcons] ??
                    Sparkles;

                  return (
                    <button
                      key={action.id}
                      className="flex items-center gap-3 rounded-md border border-[#edf1f5] p-3 text-left transition hover:border-[#16a34a]/30 hover:bg-[#f8fafc]"
                      type="button"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#f1f5f9] text-[#14213d]">
                        <Icon size={17} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {action.label}
                        </span>
                        <span className="block truncate text-xs text-[#64748b]">
                          {action.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card>
              <SectionHeader
                title="Subscription status"
                action={<Badge>{subscriptionStatus.status}</Badge>}
              />
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#64748b]">Current plan</span>
                  <span className="font-semibold">
                    {subscriptionStatus.plan}
                  </span>
                </div>
                <UsageBar
                  label="SMS usage"
                  value={subscriptionStatus.smsUsed}
                  limit={subscriptionStatus.smsLimit}
                />
                <UsageBar
                  label="WhatsApp usage"
                  value={subscriptionStatus.whatsappUsed}
                  limit={subscriptionStatus.whatsappLimit}
                />
                <UsageBar
                  label="AI usage"
                  value={subscriptionStatus.aiTokensUsed}
                  limit={subscriptionStatus.aiTokensLimit}
                  compact
                />
                <p className="rounded-md bg-[#f8fafc] px-3 py-2 text-xs text-[#64748b]">
                  Next billing:{" "}
                  <span className="font-semibold text-[#14213d]">
                    {subscriptionStatus.nextBilling}
                  </span>
                </p>
              </div>
            </Card>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <SectionHeader
              title="Recent conversations"
              action={<Button tone="secondary">Open inbox</Button>}
            />
            <div className="divide-y divide-[#edf1f5]">
              {conversations.slice(0, 5).map((conversation) => (
                <div
                  key={conversation.id}
                  className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{conversation.customer}</p>
                      {conversation.unread ? (
                        <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                      ) : null}
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-[#64748b]">
                      {conversation.preview}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:justify-end">
                    <Badge
                      tone={conversation.priority === "high" ? "amber" : "gray"}
                    >
                      {conversation.aiClassification}
                    </Badge>
                    <Badge tone="blue">{conversation.channel}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader
              title="Live activity"
              description="Workspace events from customers, AI, payments, and teams."
            />
            <div className="divide-y divide-[#edf1f5]">
              {recentActivity.slice(0, 6).map((activity) => {
                const Icon = activityIcons[activity.type] ?? CheckCircle2;

                return (
                  <div key={activity.id} className="flex gap-3 px-5 py-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#f1f5f9] text-[#14213d]">
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="mt-1 text-xs text-[#64748b]">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
              {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="w-full max-w-lg rounded-md bg-white p-5 shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Create Campaign</h2>

                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-sm text-gray-500"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Message */}
                    <textarea
                      className="h-28 w-full rounded-md border p-3 text-sm"
                      placeholder="Write your campaign message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    {/* Channel */}
                    <select
                      className="mt-3 w-full rounded-md border p-2 text-sm"
                      value={channel}
                      onChange={(e) => setChannel(e.target.value)}
                    >
                      <option value="sms">SMS</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="ai">AI</option>
                    </select>

                    {/* Source */}
                    <input
                      className="mt-3 w-full rounded-md border p-2 text-sm"
                      placeholder="Audience source (VIP, Retail...)"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                    />

                    {/* Actions */}
                    <div className="mt-5 flex justify-end gap-2">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="rounded-md border px-4 py-2 text-sm"
                      >
                        Cancel
                      </button>

                      <button
                        disabled={loadingCampaign || !message}
                        onClick={async () => {
                          await createCampaign();
                          setIsModalOpen(false);
                        }}
                        className="rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
                      >
                        {loadingCampaign ? "Sending..." : "Send campaign"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}

function MiniBarChart({
  title,
  data,
  tone,
}: {
  title: string;
  data: { label: string; value: number }[];
  tone: "green" | "blue";
}) {
  const max = Math.max(...data.map((item) => item.value));
  const color = tone === "green" ? "bg-[#16a34a]" : "bg-[#4f46e5]";

  return (
    <div className="rounded-md border border-[#edf1f5] p-4">
      <h2 className="font-semibold">{title}</h2>
      <div className="mt-5 flex h-44 items-end gap-2">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div className="flex h-36 w-full items-end rounded-md bg-[#f1f5f9]">
              <div
                className={`w-full rounded-md ${color}`}
                style={{ height: `${(item.value / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-[#64748b]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackedMessageChart() {
  const max = Math.max(
    ...messageVolumeData.map((item) => item.sms + item.whatsapp + item.ai)
  );

  return (
    <div className="rounded-md border border-[#edf1f5] p-4">
      <h2 className="font-semibold">Message volume</h2>
      <div className="mt-5 flex h-44 items-end gap-2">
        {messageVolumeData.map((item) => {
          const total = item.sms + item.whatsapp + item.ai;

          return (
            <div
              key={item.month}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div className="flex h-36 w-full flex-col justify-end overflow-hidden rounded-md bg-[#f1f5f9]">
                <div
                  className="bg-[#4f46e5]"
                  style={{ height: `${(item.ai / max) * 100}%` }}
                />
                <div
                  className="bg-[#16a34a]"
                  style={{ height: `${(item.whatsapp / max) * 100}%` }}
                />
                <div
                  className="bg-[#0f766e]"
                  style={{ height: `${(item.sms / max) * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#64748b]">{item.month}</span>
              <span className="sr-only">{total} messages</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MetricProgress({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-[#64748b]">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-[#e2e8f0]">
        <div
          className={`h-2 rounded-full ${tone}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function UsageBar({
  label,
  value,
  limit,
  compact = false,
}: {
  label: string;
  value: number;
  limit: number;
  compact?: boolean;
}) {
  const percent = Math.round((value / limit) * 100);
  const formatter = new Intl.NumberFormat("en-US", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  });

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-[#64748b]">{label}</span>
        <span className="font-semibold">
          {formatter.format(value)} / {formatter.format(limit)}
        </span>
      </div>
      <ProgressBar value={percent} />
    </div>
  );
}
