"use client";

import {
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import {
  conversations,
  crmMetrics,
  onboardingSteps,

} from "@/lib/mock-data";
import { Badge, Button, Card, ProgressBar, SectionHeader } from "@/components/ui";


export default function Home() {
  return (
    <main className="min-h-screen  text-[#14213d]">
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
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {crmMetrics.map((metric) => (
          <Card key={metric.label} className="p-5">
            <p className="text-sm text-[#64748b]">{metric.label}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="text-3xl font-semibold tracking-normal">{metric.value}</p>
              <Badge>{metric.change}</Badge>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <SectionHeader
            title="Recent conversations"
            action={<Button tone="secondary">Open inbox</Button>}
          />
          <div className="divide-y divide-[#edf1f5]">
            {conversations.slice(0, 4).map((conversation) => (
              <div
                key={conversation.id}
                className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <p className="font-semibold">{conversation.customer}</p>
                  <p className="mt-1 line-clamp-1 text-sm text-[#64748b]">
                    {conversation.preview}
                  </p>
                </div>
                <Badge tone="gray">{conversation.channel}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader
            title="Onboarding progress"
            action={<Button tone="secondary">Review</Button>}
          />
          <div className="space-y-3 p-5">
            <ProgressBar value={17} />
            {onboardingSteps.slice(0, 5).map((step) => (
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
