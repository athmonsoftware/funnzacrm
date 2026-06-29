"use client";

import {
  Bot,
  MessageCircle,
  TrendingDown,
  TrendingUp,
  UsersRound,
  Wallet,
  AlertCircle,
} from "lucide-react";
import type { ElementType } from "react";
import { useEffect, useState } from "react";
import {
  analyticsAI as mockAnalyticsAI,
  analyticsConversation as mockAnalyticsConversation,
  analyticsCustomer as mockAnalyticsCustomer,
  analyticsRevenue as mockAnalyticsRevenue,
  customerGrowthData as mockCustomerGrowthData,
  messageVolumeData as mockMessageVolumeData,
  revenueData as mockRevenueData,
} from "@/lib/mock-data";
import { Badge, Card, ProgressBar, SectionHeader } from "@/components/ui";

type AnalyticsData = {
  analyticsAI?: typeof mockAnalyticsAI;
  analyticsConversation?: typeof mockAnalyticsConversation;
  analyticsCustomer?: typeof mockAnalyticsCustomer;
  analyticsRevenue?: typeof mockAnalyticsRevenue;
  customerGrowthData?: typeof mockCustomerGrowthData;
  messageVolumeData?: typeof mockMessageVolumeData;
  revenueData?: typeof mockRevenueData;
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/analytics`,
          { cache: "no-store" },
        );

        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Analytics API failed", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  const analyticsAI = data?.analyticsAI;
  const analyticsConversation = data?.analyticsConversation;
  const analyticsCustomer = data?.analyticsCustomer;
  const analyticsRevenue = data?.analyticsRevenue;
  const customerGrowthData = data?.customerGrowthData;
  const messageVolumeData = data?.messageVolumeData;
  const revenueData = data?.revenueData;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading analytics...
      </div>
    );
  }

  if (
    error ||
    !data ||
    !analyticsAI ||
    !analyticsConversation ||
    !analyticsCustomer ||
    !analyticsRevenue ||
    !customerGrowthData ||
    !messageVolumeData ||
    !revenueData
  ) {
    return (
      <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5">
          <section>
            <p className="text-sm font-semibold text-funza-primary">
              Analytics center
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
              Business intelligence
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Track customer growth, conversation performance, AI automation,
              and revenue signals from one workspace.
            </p>
          </section>
          <Card>
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <AlertCircle className="text-muted-foreground" size={48} />
              <h2 className="mt-4 text-lg font-semibold">
                No analytics data found
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Analytics data does not exist in the database yet.
              </p>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section>
          <p className="text-sm font-semibold text-funza-primary">
            Analytics center
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
            Business intelligence
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Track customer growth, conversation performance, AI automation, and
            revenue signals from one workspace.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric
            icon={UsersRound}
            label="Retention"
            value={`${analyticsCustomer.retention}%`}
            change={analyticsCustomer.retentionChange}
          />
          <Metric
            icon={MessageCircle}
            label="Messages"
            value={analyticsConversation.totalMessages.toLocaleString()}
            change={analyticsConversation.avgResponseTime}
          />
          <Metric
            icon={Bot}
            label="Automation"
            value={`${analyticsAI.automationRate}%`}
            change={`${analyticsAI.escalationRate}% escalated`}
          />
          <Metric
            icon={Wallet}
            label="Monthly revenue"
            value={analyticsRevenue.monthlyRevenue}
            change={analyticsRevenue.subscriptionGrowth}
          />
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <SectionHeader title="Growth and revenue trends" />
            <div className="grid gap-5 p-5 lg:grid-cols-2">
              <MiniBarChart
                title="Customer growth"
                data={customerGrowthData.map((item) => ({
                  label: item.month,
                  value: item.customers,
                }))}
                color="bg-funza-primary"
              />
              <MiniBarChart
                title="Revenue"
                data={revenueData.map((item) => ({
                  label: item.month,
                  value: item.revenue,
                }))}
                color="bg-funza-accent"
              />
            </div>
          </Card>

          <Card>
            <SectionHeader title="Customer health" />
            <div className="space-y-5 p-5">
              <HealthRow
                icon={TrendingUp}
                label="Returning customers"
                value={analyticsCustomer.newVsReturning.returning}
                total={
                  analyticsCustomer.newVsReturning.new +
                  analyticsCustomer.newVsReturning.returning
                }
              />
              <HealthRow
                icon={TrendingDown}
                label="New customers"
                value={analyticsCustomer.newVsReturning.new}
                total={
                  analyticsCustomer.newVsReturning.new +
                  analyticsCustomer.newVsReturning.returning
                }
              />
              <div className="rounded-md border border-border p-4">
                <p className="text-sm text-muted-foreground">Churn</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <p className="text-2xl font-semibold">
                    {analyticsCustomer.churn}%
                  </p>
                  <Badge tone="green">{analyticsCustomer.churnChange}</Badge>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          <Card>
            <SectionHeader title="Conversation analytics" />
            <div className="space-y-4 p-5">
              <Info
                label="Avg response time"
                value={analyticsConversation.avgResponseTime}
              />
              <Info
                label="Avg resolution time"
                value={analyticsConversation.avgResolutionTime}
              />
              <Info
                label="Satisfaction"
                value={`${analyticsConversation.satisfactionScore}/5`}
              />
              {Object.entries(analyticsConversation.channelBreakdown).map(
                ([channel, value]) => (
                  <div key={channel}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="capitalize text-muted-foreground">
                        {channel}
                      </span>
                      <span className="font-semibold">{value}%</span>
                    </div>
                    <ProgressBar value={value} />
                  </div>
                ),
              )}
            </div>
          </Card>

          <Card>
            <SectionHeader title="AI analytics" />
            <div className="space-y-4 p-5">
              <Info
                label="AI satisfaction"
                value={`${analyticsAI.aiSatisfaction}/5`}
              />
              <Info label="Cost savings" value={analyticsAI.costSavings} />
              {analyticsAI.topIntents.slice(0, 4).map((intent) => (
                <div key={intent.intent}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {intent.intent}
                    </span>
                    <span className="font-semibold">{intent.pct}%</span>
                  </div>
                  <ProgressBar value={intent.pct} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader
              title="Revenue analytics"
              action={
                <Badge tone="blue">{analyticsRevenue.totalRevenue}</Badge>
              }
            />
            <div className="divide-y divide-border">
              {analyticsRevenue.revenueByPlan.map((plan) => (
                <div key={plan.plan} className="px-5 py-4">
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold">{plan.plan}</span>
                    <span className="text-muted-foreground">
                      {plan.customers} customers
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-semibold">
                      GHS {plan.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <Card>
          <SectionHeader title="Message volume" />
          <div className="flex h-64 items-end gap-3 p-5">
            {messageVolumeData.map((item) => {
              const total = item.sms + item.whatsapp + item.ai;
              const max = Math.max(
                ...messageVolumeData.map(
                  (volume) => volume.sms + volume.whatsapp + volume.ai,
                ),
              );

              return (
                <div
                  key={item.month}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div className="flex h-52 w-full flex-col justify-end overflow-hidden rounded-md bg-muted">
                    <div
                      className="bg-funza-accent"
                      style={{ height: `${(item.ai / max) * 100}%` }}
                    />
                    <div
                      className="bg-funza-primary"
                      style={{ height: `${(item.whatsapp / max) * 100}%` }}
                    />
                    <div
                      className="bg-teal-600 dark:bg-teal-500"
                      style={{ height: `${(item.sms / max) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.month}
                  </span>
                  <span className="sr-only">{total} total messages</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </main>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  change,
}: {
  icon: ElementType;
  label: string;
  value: string;
  change: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-funza-primary-light text-funza-primary">
          <Icon size={18} />
        </span>
        <Badge tone="green">{change}</Badge>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-normal">{value}</p>
    </Card>
  );
}

function MiniBarChart({
  title,
  data,
  color,
}: {
  title: string;
  data: { label: string; value: number }[];
  color: string;
}) {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <div className="rounded-md border border-border p-4">
      <h2 className="font-semibold">{title}</h2>
      <div className="mt-5 flex h-48 items-end gap-2">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div className="flex h-40 w-full items-end rounded-md bg-muted">
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

function HealthRow({
  icon: Icon,
  label,
  value,
  total,
}: {
  icon: ElementType;
  label: string;
  value: number;
  total: number;
}) {
  const percent = Math.round((value / total) * 100);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-muted-foreground">
          <Icon size={15} />
          {label}
        </span>
        <span className="font-semibold">{value.toLocaleString()}</span>
      </div>
      <ProgressBar value={percent} />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border p-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
