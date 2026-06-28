import { Bot, CheckCircle2, Globe2, MessageSquareText, ShieldCheck, Sparkles } from "lucide-react"
import type { ElementType } from "react"
import { aiAssistantConfig, aiUsageMetrics } from "@/lib/mock-data"
import { Badge, Button, Card, SectionHeader } from "@/components/ui"

export default function AIAssistantPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-funza-primary">AI Center</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">AI Assistant</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Configure the assistant personality, language, tone, and business rules that guide automated conversations.
            </p>
          </div>
          <Button className="gap-2">
            <Sparkles size={16} />
            Train assistant
          </Button>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <SectionHeader title="Assistant profile" action={<Badge>{aiAssistantConfig.status}</Badge>} />
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <ProfileTile icon={Bot} label="Name" value={aiAssistantConfig.name} />
              <ProfileTile icon={Sparkles} label="Personality" value={aiAssistantConfig.personality} />
              <ProfileTile icon={MessageSquareText} label="Tone" value={aiAssistantConfig.tone} />
              <ProfileTile icon={Globe2} label="Language" value={aiAssistantConfig.language} />
            </div>
          </Card>

          <Card>
            <SectionHeader
              title="Automation health"
              description="Current quality and efficiency signals from active conversations."
            />
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <Metric label="Messages processed" value={aiUsageMetrics.messagesProcessed.toLocaleString()} change={aiUsageMetrics.messagesProcessedChange} />
              <Metric label="AI accuracy" value={`${aiUsageMetrics.accuracy}%`} change={aiUsageMetrics.accuracyChange} />
              <Metric label="Resolution rate" value={`${aiUsageMetrics.resolutionRate}%`} change={aiUsageMetrics.resolutionRateChange} />
              <Metric label="Avg response" value={aiUsageMetrics.avgResponseTime} change="Live" />
            </div>
          </Card>
        </section>

        <Card>
          <SectionHeader title="Business rules" description="Rules used to decide answers, escalations, payments, and support behavior." />
          <div className="grid gap-3 p-5 lg:grid-cols-2">
            {aiAssistantConfig.businessRules.map((rule) => (
              <div key={rule} className="flex gap-3 rounded-md border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-funza-primary" size={18} />
                <p className="text-sm leading-6">{rule}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Escalation guardrails" />
          <div className="grid gap-4 p-5 md:grid-cols-3">
            {[
              ["Negative sentiment", "Transfer after two low-confidence replies"],
              ["Payment dispute", "Route to billing owner immediately"],
              ["Private data", "Block cross-customer disclosure"],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-md border border-border p-4">
                <ShieldCheck className="text-funza-accent" size={18} />
                <h2 className="mt-3 font-semibold">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}

function ProfileTile({ icon: Icon, label, value }: { icon: ElementType; label: string; value: string }) {
  return (
    <div className="rounded-md border border-border p-4">
      <Icon className="text-funza-primary" size={18} />
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  )
}

function Metric({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="rounded-md border border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Badge tone="green">{change}</Badge>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-normal">{value}</p>
    </div>
  )
}
