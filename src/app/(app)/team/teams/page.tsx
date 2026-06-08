import { Building2, Users } from "lucide-react"
import { teamMembers, teams } from "@/lib/mock-data"
import { Badge, Button, Card, SectionHeader } from "@/components/ui"

export default function TeamsPage() {
  const memberById = new Map(teamMembers.map((member) => [member.id, member]))

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#16a34a]">Team management</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Teams</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
              Organize agents into sales, support, and operations teams for assignment workflows.
            </p>
          </div>
          <Button>Create team</Button>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {teams.map((team) => {
            const lead = memberById.get(team.lead)

            return (
              <Card key={team.id}>
                <SectionHeader title={team.name} action={<Building2 size={18} className="text-[#16a34a]" />} />
                <div className="space-y-4 p-5">
                  <p className="text-sm leading-6 text-[#64748b]">{team.description}</p>
                  <div className="rounded-md border border-[#edf1f5] p-3">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#64748b]">Team lead</p>
                    <p className="mt-1 font-semibold">{lead?.name ?? "Unassigned"}</p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Users size={16} />
                      Members
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {team.members.map((memberId) => (
                        <Badge key={memberId} tone="gray">{memberById.get(memberId)?.name ?? memberId}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </section>
      </div>
    </main>
  )
}
