import { ChevronRight } from "lucide-react"
import { onboardingSteps } from "@/lib/mock-data"
import { Card, SectionHeader } from "@/components/ui"

export default function OnboardingPage() {
  return (
    <Card>
      <SectionHeader title="Business onboarding" />
      <div className="divide-y divide-[#edf1f5]">
        {onboardingSteps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-4 px-5 py-4">
            <div
              className={`grid size-9 shrink-0 place-items-center rounded-md text-sm font-semibold ${
                step.done ? "bg-[#16a34a] text-white" : "bg-[#f1f5f9] text-[#64748b]"
              }`}
            >
              {index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{step.label}</p>
              <p className="mt-1 text-sm text-[#64748b]">{step.detail}</p>
            </div>
            <ChevronRight className="text-[#94a3b8]" size={18} />
          </div>
        ))}
      </div>
    </Card>
  )
}
