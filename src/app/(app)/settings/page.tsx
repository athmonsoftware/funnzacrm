import { Building2, CreditCard, Key, Lock, Plug, Settings2 } from "lucide-react"
import type { ElementType } from "react"
import { apiKeys, integrations, organizationSettings } from "@/lib/mock-data"
import { Badge, Button, Card, SectionHeader } from "@/components/ui"

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section>
          <p className="text-sm font-semibold text-[#16a34a]">Settings</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Organization settings</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
            Manage workspace profile, integrations, security, billing, and API access.
          </p>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <SectionHeader title="Organization" action={<Settings2 size={18} className="text-[#16a34a]" />} />
            <div className="space-y-4 p-5">
              <SettingRow icon={Building2} label="Name" value={organizationSettings.name} />
              <SettingRow icon={Building2} label="Industry" value={organizationSettings.industry} />
              <SettingRow icon={Lock} label="Workspace type" value={organizationSettings.workspaceType} />
              <SettingRow icon={CreditCard} label="Timezone" value={organizationSettings.timezone} />
            </div>
          </Card>

          <Card>
            <SectionHeader title="Integrations" action={<Button tone="secondary">Add integration</Button>} />
            <div className="grid gap-3 p-5 md:grid-cols-2">
              {integrations.map((integration) => (
                <div key={integration.id} className="flex items-start gap-3 rounded-md border border-[#edf1f5] p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#f1f5f9] text-[#14213d]">
                    <Plug size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold">{integration.name}</p>
                      <Badge tone={integration.status === "Connected" ? "green" : integration.status === "Coming Soon" ? "amber" : "gray"}>
                        {integration.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[#64748b]">{integration.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          <Card>
            <SectionHeader title="Security" />
            <div className="grid gap-3 p-5">
              {["Two-factor authentication", "Role-based access control", "Session timeout", "Audit log retention"].map((item) => (
                <div key={item} className="flex items-center justify-between gap-3 rounded-md border border-[#edf1f5] p-3">
                  <div className="flex items-center gap-3">
                    <Lock size={16} className="text-[#16a34a]" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                  <Badge tone="green">Enabled</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader title="API keys" action={<Button tone="secondary">Create key</Button>} />
            <div className="divide-y divide-[#edf1f5]">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="flex gap-3 px-5 py-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#f1f5f9] text-[#14213d]">
                    <Key size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold">{apiKey.name}</p>
                      <Badge>{apiKey.status}</Badge>
                    </div>
                    <p className="mt-1 font-mono text-xs text-[#64748b]">{apiKey.key}</p>
                    <p className="mt-1 text-xs text-[#64748b]">Created {apiKey.created} · Last used {apiKey.lastUsed}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </main>
  )
}

function SettingRow({ icon: Icon, label, value }: { icon: ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-[#edf1f5] p-3">
      <Icon className="text-[#16a34a]" size={16} />
      <div>
        <p className="text-xs uppercase tracking-[0.12em] text-[#64748b]">{label}</p>
        <p className="mt-1 font-semibold">{value}</p>
      </div>
    </div>
  )
}
