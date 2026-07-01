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
import { quickActions } from "@/lib/mock-data";
import {
  Badge,
  Button,
  Card,
  ProgressBar,
  SectionHeader,
} from "@/components/ui";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const [dashboardMetrics, setDashboardMetrics] = useState<any[]>([]);
  const [pulseData, setPulseData] = useState<any>(null);
  const [loadingPulse, setLoadingPulse] = useState(true);
  const revenueData = pulseData?.revenue?.monthly ?? [];
  const hasRevenue = revenueData.some(
    (r: { revenue: number }) => r.revenue > 0
  );
  const ai = pulseData?.aiPerformance;
  const [subscription, setSubscription] = useState<any>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [conversations, setConversations] = useState<any[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  const router = useRouter();

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

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success(
        `Campaign started. Sent: ${data.sent}, Failed: ${data.failed}`
      );

      console.log("Campaign created:", data);
    } catch (err) {
      const error = err as Error;

      toast.error(`Campaign failed: ${error.message}`);

      console.error("Campaign error:", error.message);
    } finally {
      setLoadingCampaign(false);
    }
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/metrics`,
        { credentials: "include" }
      );

      const data = await res.json();

      setDashboardMetrics([
        {
          id: "total-customers",
          label: "Total Customers",
          value: (data.totalCustomers ?? 0).toLocaleString(),
          change: `${data.change > 0 ? "+" : ""}${data.change}%`,
          trend: data.change >= 0 ? "up" : "down",
          icon: "users",
        },
        {
          id: "new-customers",
          label: "New This Month",
          value: (data.newThisMonth ?? 0).toLocaleString(),
          trend: "up",
          icon: "user-plus",
        },
        {
          id: "sms",
          label: "SMS Customers",
          value: (data.smsCustomers ?? 0).toLocaleString(),
          change: `${data.smsChange > 0 ? "+" : ""}${data.smsChange}%`,
          trend: "up",
          icon: "smartphone",
        },
        {
          id: "whatsapp",
          label: "WhatsApp Customers",
          value: (data.whatsappCustomers ?? 0).toLocaleString(),
          change: `${data.whatsappChange > 0 ? "+" : ""}${
            data.whatsappChange
          }%`,
          trend: "up",
          icon: "message-circle",
        },
      ]);
    };

    fetchMetrics();
  }, []);

  useEffect(() => {
    const fetchPulse = async () => {
      try {
        setLoadingPulse(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/performance-pulse`,
          { credentials: "include" }
        );

        const data = await res.json();

        setPulseData(data);
      } catch (err) {
        console.error("Failed to load performance pulse", err);
      } finally {
        setLoadingPulse(false);
      }
    };

    fetchPulse();
  }, []);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        setLoadingSubscription(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/subscription`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch subscription");
        }

        const data = await res.json();

        console.log("Subscription:", data);

        setSubscription(data);
      } catch (err) {
        console.error("Failed to load subscription", err);
      } finally {
        setLoadingSubscription(false);
      }
    };

    fetchSubscription();
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoadingConversations(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/conversations`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to load conversations");
        }

        const data = await res.json();

        setConversations(data.conversations ?? []);
      } catch (err) {
        console.error(err);
        setConversations([]);
      } finally {
        setLoadingConversations(false);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoadingActivity(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/activity/recent?limit=10`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to load activity");
        }

        const data = await res.json();

        console.log("Recent activity:", data);

        setRecentActivity(data.activities ?? []);
      } catch (err) {
        console.error("Failed to load recent activity", err);
        setRecentActivity([]);
      } finally {
        setLoadingActivity(false);
      }
    };

    fetchActivity();
  }, []);

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case "qa-001":
        setIsModalOpen(true);
        break;

      case "qa-002":
        setIsModalOpen(true);
        break;

      case "qa-003":
        router.push("/customers");
        break;

      case "qa-004":
        router.push("/ai");
        break;

      case "qa-005":
        router.push("/team");
        break;

      default:
        toast.error("Unknown action");
    }
  };

  if (loadingPulse && !pulseData) {
    return (
      <div className="p-10 text-center text-sm text-muted-foreground">
        Loading performance data...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-funza-primary">
              Workspace overview
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
              AI operating system for business communication
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-funza-primary-light text-funza-primary">
                    <Icon size={18} />
                  </div>
                  <Badge tone={isDown ? "amber" : "green"}>
                    {metric.change}
                  </Badge>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {metric.label}
                </p>
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
                data={
                  pulseData?.customerGrowth?.map((item: any) => ({
                    label: item.month,
                    value: item.customers,
                  })) ?? []
                }
                tone="green"
              />
              <div className="rounded-md border border-border p-4">
                <h2 className="text-sm font-semibold mb-3">Revenue trends</h2>

                {loadingPulse ? (
                  <p className="text-sm text-muted-foreground">
                    Loading revenue...
                  </p>
                ) : !hasRevenue ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <p className="text-sm font-medium text-muted-foreground">
                      No revenue data yet
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Revenue will appear once subscriptions or payments are
                      recorded
                    </p>
                  </div>
                ) : (
                  <MiniBarChart
                    title=""
                    data={revenueData.map((item: any) => ({
                      label: item.month,
                      value: item.revenue,
                    }))}
                    tone="blue"
                  />
                )}
              </div>
              <StackedMessageChart
                data={
                  pulseData?.messageVolume?.monthly?.map((m: any) => ({
                    month: m.month,
                    sms: m.sms,
                    whatsapp: m.whatsapp,
                    ai: m.ai,
                  })) ?? []
                }
              />
              <div className="rounded-md border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">AI performance</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Real-time AI usage and automation quality.
                    </p>
                  </div>

                  <Badge tone="blue">
                    {ai?.score != null ? `${ai.score}%` : "0%"}
                  </Badge>
                </div>

                {!ai || ai.totalMessages === 0 ? (
                  <div className="mt-5 text-center py-8">
                    <p className="text-sm text-muted-foreground">
                      No AI activity yet
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      AI performance will appear once conversations start
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 space-y-4">
                    <MetricProgress
                      label="Automation Rate (%)"
                      value={ai.automationRate}
                      tone="bg-funza-primary"
                    />

                    <MetricProgress
                      label="Response Rate (%)"
                      value={ai.responseRate}
                      tone="bg-funza-accent"
                    />

                    <MetricProgress
                      label="Tool Usage (%)"
                      value={ai.automationRate}
                      tone="bg-funza-warning"
                    />

                    <div className="pt-2 text-xs text-muted-foreground">
                      <div>Messages: {ai.totalMessages}</div>
                      <div>Avg latency: {ai.avgLatency}ms</div>
                      <div>Tokens: {ai.totalTokens?.toLocaleString()}</div>
                    </div>
                  </div>
                )}
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
                      onClick={() => handleQuickAction(action.id)} // ✅ ADD THIS
                      className="flex items-center gap-3 rounded-md border border-border p-3 text-left transition hover:border-funza-primary/30 hover:bg-muted"
                      type="button"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-foreground">
                        <Icon size={17} />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {action.label}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
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
                action={
                  <Badge>
                    {loadingSubscription
                      ? "Loading..."
                      : subscription?.status ?? "Active"}
                  </Badge>
                }
              />

              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Current plan
                  </span>

                  <span className="font-semibold capitalize">
                    {subscription?.plan ?? "Free"}
                  </span>
                </div>

                <UsageBar
                  label="SMS usage"
                  value={subscription?.usage?.sms ?? 0}
                  limit={subscription?.limits?.sms ?? 0}
                />

                <UsageBar
                  label="WhatsApp usage"
                  value={subscription?.usage?.whatsapp ?? 0}
                  limit={subscription?.limits?.whatsapp ?? 0}
                />

                <UsageBar
                  label="AI usage"
                  value={subscription?.usage?.aiTokens ?? 0}
                  limit={subscription?.limits?.aiTokens ?? 0}
                  compact
                />

                <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                  Next billing:{" "}
                  <span className="font-semibold text-foreground">
                    {subscription?.nextBillingAt
                      ? new Date(subscription.nextBillingAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
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
              action={
                <Button tone="secondary" onClick={() => router.push("/inbox")}>
                  Open inbox
                </Button>
              }
            />

            {loadingConversations ? (
              <div className="p-6 text-sm text-muted-foreground">
                Loading conversations...
              </div>
            ) : conversations.length === 0 ? (
              <div className="flex h-52 items-center justify-center text-center">
                <div>
                  <p className="font-medium">No conversations yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Customer conversations will appear here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {conversations.slice(0, 5).map((conversation: any) => (
                  <div
                    key={conversation.id}
                    className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{conversation.customer}</p>
                      </div>

                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                        {conversation.preview}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {conversation.time}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <Badge
                        tone={
                          conversation.status === "open"
                            ? "green"
                            : conversation.status === "closed"
                            ? "gray"
                            : "amber"
                        }
                      >
                        {conversation.status}
                      </Badge>

                      <Badge tone="blue">{conversation.channel}</Badge>

                      <Badge tone="gray">{conversation.aiClassification}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <SectionHeader
              title="Live activity"
              description="Workspace events from customers, AI, payments, and teams."
            />

            {/* Activity List */}
            <div className="divide-y divide-border">
              {loadingActivity ? (
                <div className="p-5 text-sm text-muted-foreground">
                  Loading activity...
                </div>
              ) : recentActivity.length === 0 ? (
                <div className="p-5 text-sm text-muted-foreground">
                  No recent activity yet
                </div>
              ) : (
                recentActivity.slice(0, 6).map((activity) => {
                  const Icon =
                    activity.type in activityIcons
                      ? activityIcons[
                          activity.type as keyof typeof activityIcons
                        ]
                      : CheckCircle2;

                  return (
                    <div key={activity.id} className="flex gap-3 px-5 py-4">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
                        <Icon size={16} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                          {activity.message}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })
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
  const color = tone === "green" ? "bg-funza-primary" : "bg-funza-accent";

  return (
    <div className="rounded-md border border-border p-4">
      <h2 className="font-semibold">{title}</h2>
      <div className="mt-5 flex h-44 items-end gap-2">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div className="flex h-36 w-full items-end rounded-md bg-muted">
              <div
                className={`w-full rounded-md ${color}`}
                style={{ height: `${(item.value / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackedMessageChart({
  data,
}: {
  data: {
    month: string;
    sms: number;
    whatsapp: number;
    ai: number;
  }[];
}) {
  const safeData = data || [];

  const max = Math.max(
    ...safeData.map((item) => item.sms + item.whatsapp + item.ai),
    1 // prevent divide-by-zero
  );

  return (
    <div className="rounded-md border border-border p-4">
      <h2 className="font-semibold">Message volume</h2>

      {safeData.length === 0 ? (
        <div className="text-center py-10 text-sm text-muted-foreground">
          No message data yet
        </div>
      ) : (
        <div className="mt-5 flex h-44 items-end gap-2">
          {safeData.map((item) => {
            const total = item.sms + item.whatsapp + item.ai;

            return (
              <div
                key={item.month}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div className="flex h-36 w-full flex-col justify-end overflow-hidden rounded-md bg-muted">
                  {/* AI */}
                  <div
                    className="bg-funza-accent"
                    style={{
                      height: `${(item.ai / max) * 100}%`,
                    }}
                  />

                  {/* WhatsApp */}
                  <div
                    className="bg-funza-primary"
                    style={{
                      height: `${(item.whatsapp / max) * 100}%`,
                    }}
                  />

                  {/* SMS */}
                  <div
                    className="bg-teal-600 dark:bg-teal-500"
                    style={{
                      height: `${(item.sms / max) * 100}%`,
                    }}
                  />
                </div>

                <span className="text-xs text-muted-foreground">
                  {item.month}
                </span>

                <span className="sr-only">{total} messages</span>
              </div>
            );
          })}
        </div>
      )}
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
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-border">
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
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">
          {formatter.format(value)} / {formatter.format(limit)}
        </span>
      </div>
      <ProgressBar value={percent} />
    </div>
  );
}