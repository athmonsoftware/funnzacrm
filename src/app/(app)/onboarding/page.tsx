"use client";

import { ChevronRight, AlertCircle } from "lucide-react";
import { onboardingSteps as mockOnboardingSteps } from "@/lib/mock-data";
import { Card, SectionHeader } from "@/components/ui";
import { useEffect, useState } from "react";

type OnboardingStep = {
  label: string;
  detail: string;
  done: boolean;
};

export default function OnboardingPage() {
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadOnboarding() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/onboarding`,
          { cache: "no-store" },
        );

        if (res.ok) {
          const json = await res.json();
          setOnboardingSteps(json.onboardingSteps || json.data || []);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Onboarding API failed", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadOnboarding();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading onboarding...
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <SectionHeader title="Business onboarding" />
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <AlertCircle className="text-muted-foreground" size={48} />
          <h2 className="mt-4 text-lg font-semibold">Data cannot be found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Unable to load onboarding data. Please try again later.
          </p>
        </div>
      </Card>
    );
  }

  const displaySteps =
    onboardingSteps.length > 0 ? onboardingSteps : mockOnboardingSteps;

  return (
    <Card>
      <SectionHeader title="Business onboarding" />
      <div className="divide-y divide-border">
        {displaySteps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-4 px-5 py-4">
            <div
              className={`grid size-9 shrink-0 place-items-center rounded-md text-sm font-semibold ${
                step.done
                  ? "bg-funza-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{step.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {step.detail}
              </p>
            </div>
            <ChevronRight className="text-muted-foreground" size={18} />
          </div>
        ))}
      </div>
    </Card>
  );
}
