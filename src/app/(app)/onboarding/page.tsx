import { ChevronRight } from "lucide-react"
import { onboardingSteps } from "@/lib/mock-data"
import { Card, SectionHeader } from "@/components/ui"

export default function OnboardingPage() {
  return (
    <Card>
      <SectionHeader title="Business onboarding" />
      <div className="divide-y divide-border">
        {onboardingSteps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-4 px-5 py-4">
            <div
              className={`grid size-9 shrink-0 place-items-center rounded-md text-sm font-semibold ${
                step.done ? "bg-funza-primary text-white" : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{step.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
            </div>
            <ChevronRight className="text-muted-foreground" size={18} />
          </div>
        ))}
      </div>
    </Card>
  )
}
