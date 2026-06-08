import { Bot, MessageCircle, TrendingDown, TrendingUp, UsersRound, Wallet } from "lucide-react"
import type { ElementType } from "react"
import {
  analyticsAI,
  analyticsConversation,
  analyticsCustomer,
  analyticsRevenue,
  customerGrowthData,
  messageVolumeData,
  revenueData,
} from "@/lib/mock-data"
import { Badge, Card, ProgressBar, SectionHeader } from "@/components/ui"

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section>
          <p className="text-sm font-semibold text-[#16a34a]">Analytics center</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Business intelligence</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
            Track customer growth, conversation performance, AI automation, and revenue signals from one workspace.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric icon={UsersRound} label="Retention" value={`${analyticsCustomer.retention}%`} change={analyticsCustomer.retentionChange} />
          <Metric icon={MessageCircle} label="Messages" value={analyticsConversation.totalMessages.toLocaleString()} change={analyticsConversation.avgResponseTime} />
          <Metric icon={Bot} label="Automation" value={`${analyticsAI.automationRate}%`} change={`${analyticsAI.escalationRate}% escalated`} />
          <Metric icon={Wallet} label="Monthly revenue" value={analyticsRevenue.monthlyRevenue} change={analyticsRevenue.subscriptionGrowth} />
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <SectionHeader title="Growth and revenue trends" />
            <div className="grid gap-5 p-5 lg:grid-cols-2">
              <MiniBarChart title="Customer growth" data={customerGrowthData.map((item) => ({ label: item.month, value: item.customers }))} color="bg-[#16a34a]" />
              <MiniBarChart title="Revenue" data={revenueData.map((item) => ({ label: item.month, value: item.revenue }))} color="bg-[#4f46e5]" />
            </div>
          </Card>

          <Card>
            <SectionHeader title="Customer health" />
            <div className="space-y-5 p-5">
              <HealthRow icon={TrendingUp} label="Returning customers" value={analyticsCustomer.newVsReturning.returning} total={analyticsCustomer.newVsReturning.new + analyticsCustomer.newVsReturning.returning} />
              <HealthRow icon={TrendingDown} label="New customers" value={analyticsCustomer.newVsReturning.new} total={analyticsCustomer.newVsReturning.new + analyticsCustomer.newVsReturning.returning} />
              <div className="rounded-md border border-[#edf1f5] p-4">
                <p className="text-sm text-[#64748b]">Churn</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <p className="text-2xl font-semibold">{analyticsCustomer.churn}%</p>
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
              <Info label="Avg response time" value={analyticsConversation.avgResponseTime} />
              <Info label="Avg resolution time" value={analyticsConversation.avgResolutionTime} />
              <Info label="Satisfaction" value={`${analyticsConversation.satisfactionScore}/5`} />
              {Object.entries(analyticsConversation.channelBreakdown).map(([channel, value]) => (
                <div key={channel}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="capitalize text-[#64748b]">{channel}</span>
                    <span className="font-semibold">{value}%</span>
                  </div>
                  <ProgressBar value={value} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader title="AI analytics" />
            <div className="space-y-4 p-5">
              <Info label="AI satisfaction" value={`${analyticsAI.aiSatisfaction}/5`} />
              <Info label="Cost savings" value={analyticsAI.costSavings} />
              {analyticsAI.topIntents.slice(0, 4).map((intent) => (
                <div key={intent.intent}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-[#64748b]">{intent.intent}</span>
                    <span className="font-semibold">{intent.pct}%</span>
                  </div>
                  <ProgressBar value={intent.pct} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader title="Revenue analytics" action={<Badge tone="blue">{analyticsRevenue.totalRevenue}</Badge>} />
            <div className="divide-y divide-[#edf1f5]">
              {analyticsRevenue.revenueByPlan.map((plan) => (
                <div key={plan.plan} className="px-5 py-4">
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold">{plan.plan}</span>
                    <span className="text-[#64748b]">{plan.customers} customers</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748b]">Revenue</span>
                    <span className="font-semibold">GHS {plan.revenue.toLocaleString()}</span>
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
              const total = item.sms + item.whatsapp + item.ai
              const max = Math.max(...messageVolumeData.map((volume) => volume.sms + volume.whatsapp + volume.ai))

              return (
                <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-52 w-full flex-col justify-end overflow-hidden rounded-md bg-[#f1f5f9]">
                    <div className="bg-[#4f46e5]" style={{ height: `${(item.ai / max) * 100}%` }} />
                    <div className="bg-[#16a34a]" style={{ height: `${(item.whatsapp / max) * 100}%` }} />
                    <div className="bg-[#0f766e]" style={{ height: `${(item.sms / max) * 100}%` }} />
                  </div>
                  <span className="text-xs text-[#64748b]">{item.month}</span>
                  <span className="sr-only">{total} total messages</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </main>
  )
}

function Metric({ icon: Icon, label, value, change }: { icon: ElementType; label: string; value: string; change: string }) {
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

function MiniBarChart({ title, data, color }: { title: string; data: { label: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map((item) => item.value))

  return (
    <div className="rounded-md border border-[#edf1f5] p-4">
      <h2 className="font-semibold">{title}</h2>
      <div className="mt-5 flex h-48 items-end gap-2">
        {data.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-40 w-full items-end rounded-md bg-[#f1f5f9]">
              <div className={`w-full rounded-md ${color}`} style={{ height: `${(item.value / max) * 100}%` }} />
            </div>
            <span className="text-xs text-[#64748b]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HealthRow({ icon: Icon, label, value, total }: { icon: ElementType; label: string; value: number; total: number }) {
  const percent = Math.round((value / total) * 100)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-[#64748b]">
          <Icon size={15} />
          {label}
        </span>
        <span className="font-semibold">{value.toLocaleString()}</span>
      </div>
      <ProgressBar value={percent} />
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-[#edf1f5] p-3 text-sm">
      <span className="text-[#64748b]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
