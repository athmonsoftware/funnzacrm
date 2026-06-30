"use client";

import {
  Bot,
  CheckCircle2,
  Globe2,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import type { ElementType } from "react";
import { useEffect, useState } from "react";
import {
  aiAssistantConfig as mockAiAssistantConfig,
  aiUsageMetrics as mockAiUsageMetrics,
} from "@/lib/mock-data";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";

type AIConfig = typeof mockAiAssistantConfig;
type AIMetrics = typeof mockAiUsageMetrics;

type AIData = {
  aiAssistantConfig?: AIConfig;
  aiUsageMetrics?: AIMetrics;
};

export default function AIAssistantPage() {
  const [data, setData] = useState<AIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadAI() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai`, {
          cache: "no-store",
        });

        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("AI API failed", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadAI();
  }, []);

  const aiAssistantConfig = data?.aiAssistantConfig ?? mockAiAssistantConfig;
  const aiUsageMetrics = data?.aiUsageMetrics ?? mockAiUsageMetrics;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading AI assistant...
      </div>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5">
          <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-funza-primary">
                AI Center
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
                AI Assistant
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Configure the assistant personality, language, tone, and
                business rules that guide automated conversations.
              </p>
            </div>
            <Button className="gap-2">
              <Sparkles size={16} />
              Train assistant
            </Button>
          </section>
          <Card>
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <AlertCircle className="text-muted-foreground" size={48} />
              <h2 className="mt-4 text-lg font-semibold">
                Data cannot be found
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Unable to load AI assistant data. Please try again later.
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
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-funza-primary">
              AI Center
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
              AI Assistant
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Configure the assistant personality, language, tone, and business
              rules that guide automated conversations.
            </p>
          </div>
          <Button className="gap-2">
            <Sparkles size={16} />
            Train assistant
          </Button>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <SectionHeader
              title="Assistant profile"
              action={<Badge>{aiAssistantConfig.status}</Badge>}
            />
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <ProfileTile
                icon={Bot}
                label="Name"
                value={aiAssistantConfig.name}
              />
              <ProfileTile
                icon={Sparkles}
                label="Personality"
                value={aiAssistantConfig.personality}
              />
              <ProfileTile
                icon={MessageSquareText}
                label="Tone"
                value={aiAssistantConfig.tone}
              />
              <ProfileTile
                icon={Globe2}
                label="Language"
                value={aiAssistantConfig.language}
              />
            </div>
          </Card>

          <Card>
            <SectionHeader
              title="Automation health"
              description="Current quality and efficiency signals from active conversations."
            />
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <Metric
                label="Messages processed"
                value={aiUsageMetrics.messagesProcessed.toLocaleString()}
                change={aiUsageMetrics.messagesProcessedChange}
              />
              <Metric
                label="AI accuracy"
                value={`${aiUsageMetrics.accuracy}%`}
                change={aiUsageMetrics.accuracyChange}
              />
              <Metric
                label="Resolution rate"
                value={`${aiUsageMetrics.resolutionRate}%`}
                change={aiUsageMetrics.resolutionRateChange}
              />
              <Metric
                label="Avg response"
                value={aiUsageMetrics.avgResponseTime}
                change="Live"
              />
            </div>
          </Card>
        </section>

        <Card>
          <SectionHeader
            title="Business rules"
            description="Rules used to decide answers, escalations, payments, and support behavior."
          />
          <div className="grid gap-3 p-5 lg:grid-cols-2">
            {aiAssistantConfig.businessRules.map((rule) => (
              <div
                key={rule}
                className="flex gap-3 rounded-md border border-border bg-card p-4"
              >
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-funza-primary"
                  size={18}
                />
                <p className="text-sm leading-6">{rule}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Escalation guardrails" />
          <div className="grid gap-4 p-5 md:grid-cols-3">
            {[
              [
                "Negative sentiment",
                "Transfer after two low-confidence replies",
              ],
              ["Payment dispute", "Route to billing owner immediately"],
              ["Private data", "Block cross-customer disclosure"],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-md border border-border p-4">
                <ShieldCheck className="text-funza-accent" size={18} />
                <h2 className="mt-3 font-semibold">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}

function ProfileTile({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-border p-4">
      <Icon className="text-funza-primary" size={18} />
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function Metric({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-md border border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Badge tone="green">{change}</Badge>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-normal">{value}</p>
    </div>
  );
}
