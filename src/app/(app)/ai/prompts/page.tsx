import { FileText, MessageSquareText, ShieldCheck } from "lucide-react"
import { aiPrompts } from "@/lib/mock-data"
import { Badge, Button, Card, SectionHeader } from "@/components/ui"

export default function PromptSettingsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-funza-primary">AI Center</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Prompt settings</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Manage welcome messages, escalation rules, payment rules, and customer support instructions.
            </p>
          </div>
          <Button>Edit prompts</Button>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          {aiPrompts.map((prompt) => (
            <Card key={prompt.id}>
              <SectionHeader title={prompt.name} action={<Badge tone="blue">Active</Badge>} />
              <div className="p-5">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
                    {prompt.name.includes("Payment") ? <ShieldCheck size={18} /> : prompt.name.includes("Support") ? <MessageSquareText size={18} /> : <FileText size={18} />}
                  </span>
                  <div>
                    <p className="text-sm leading-6 text-muted-foreground">{prompt.description}</p>
                    <pre className="mt-4 max-h-52 overflow-auto whitespace-pre-wrap rounded-md border border-border bg-muted/50 p-4 font-sans text-sm leading-6 text-foreground">
                      {prompt.content}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </section>
      </div>
    </main>
  )
}
