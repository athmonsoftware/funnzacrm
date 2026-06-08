import { ShieldCheck } from "lucide-react"
import { teamRoles } from "@/lib/mock-data"
import { Badge, Card, SectionHeader } from "@/components/ui"

export default function RolesPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section>
          <p className="text-sm font-semibold text-[#16a34a]">Team management</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Roles and permissions</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
            Review access for owners, admins, managers, agents, and viewers.
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          {teamRoles.map((role) => (
            <Card key={role.name}>
              <SectionHeader title={role.name} description={role.description} action={<ShieldCheck size={18} className="text-[#16a34a]" />} />
              <div className="grid gap-2 p-5 sm:grid-cols-2">
                {Object.entries(role.permissions).map(([key, enabled]) => (
                  <div key={key} className="flex items-center justify-between gap-3 rounded-md border border-[#edf1f5] p-3">
                    <span className="text-sm capitalize text-[#475569]">{key.replace(/([A-Z])/g, " $1")}</span>
                    <Badge tone={enabled ? "green" : "gray"}>{enabled ? "Allowed" : "No access"}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </section>
      </div>
    </main>
  )
}
