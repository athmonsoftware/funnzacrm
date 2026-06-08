import { Bot, Coins, Gauge, MessageSquareText } from "lucide-react"
import type { ElementType } from "react"
import { aiUsageMetrics, analyticsAI } from "@/lib/mock-data"
import { Badge, Card, ProgressBar, SectionHeader } from "@/components/ui"

export default function AIUsagePage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section>
          <p className="text-sm font-semibold text-[#16a34a]">AI Center</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Usage metrics</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
            Track messages processed, tokens consumed, accuracy, resolution rate, and automation impact.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <UsageMetric icon={MessageSquareText} label="Messages processed" value={aiUsageMetrics.messagesProcessed.toLocaleString()} change={aiUsageMetrics.messagesProcessedChange} />
          <UsageMetric icon={Bot} label="Tokens consumed" value={Intl.NumberFormat("en-US", { notation: "compact" }).format(aiUsageMetrics.tokensConsumed)} change={aiUsageMetrics.tokensConsumedChange} />
          <UsageMetric icon={Gauge} label="AI accuracy" value={`${aiUsageMetrics.accuracy}%`} change={aiUsageMetrics.accuracyChange} />
          <UsageMetric icon={Coins} label="Cost per conversation" value={aiUsageMetrics.costPerConversation} change="Optimized" />
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <SectionHeader title="Automation mix" />
            <div className="space-y-5 p-5">
              <MetricProgress label="Automation rate" value={analyticsAI.automationRate} />
              <MetricProgress label="Escalation rate" value={analyticsAI.escalationRate} />
              <MetricProgress label="Resolution rate" value={aiUsageMetrics.resolutionRate} />
              <MetricProgress label="AI satisfaction" value={analyticsAI.aiSatisfaction * 20} display={`${analyticsAI.aiSatisfaction}/5`} />
            </div>
          </Card>

          <Card>
            <SectionHeader title="Top customer intents" action={<Badge tone="green">{analyticsAI.costSavings} saved</Badge>} />
            <div className="divide-y divide-[#edf1f5]">
              {analyticsAI.topIntents.map((intent) => (
                <div key={intent.intent} className="px-5 py-4">
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold">{intent.intent}</span>
                    <span className="text-[#64748b]">{intent.count} messages</span>
                  </div>
                  <ProgressBar value={intent.pct} />
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </main>
  )
}

function UsageMetric({ icon: Icon, label, value, change }: { icon: ElementType; label: string; value: string; change: string }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#eef7f1] text-[#16a34a]">
          <Icon size={18} />
        </span>
        <Badge tone="green">{change}</Badge>
      </div>
      <p className="mt-4 text-sm text-[#64748b]">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-normal">{value}</p>
    </Card>
  )
}

function MetricProgress({ label, value, display }: { label: string; value: number; display?: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-[#64748b]">{label}</span>
        <span className="font-semibold">{display ?? `${value}%`}</span>
      </div>
      <ProgressBar value={value} />
    </div>
  )
}
