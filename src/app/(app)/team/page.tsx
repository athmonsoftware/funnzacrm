import { Mail, UserRoundPlus, Users } from "lucide-react"
import { teamMembers } from "@/lib/mock-data"
import { Badge, Button, Card, SectionHeader } from "@/components/ui"

const statusTone = {
  Online: "green",
  Away: "amber",
  Offline: "gray",
} as const

export default function TeamMembersPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-funza-primary">Team management</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Members</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Manage workspace seats, roles, online presence, and operational ownership.
            </p>
          </div>
          <Button className="gap-2">
            <UserRoundPlus size={16} />
            Invite member
          </Button>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <Users className="text-funza-primary" size={18} />
            <p className="mt-3 text-sm text-muted-foreground">Total seats</p>
            <p className="mt-1 text-2xl font-semibold">{teamMembers.length}</p>
          </Card>
          <Card className="p-4">
            <Users className="text-funza-accent" size={18} />
            <p className="mt-3 text-sm text-muted-foreground">Online now</p>
            <p className="mt-1 text-2xl font-semibold">{teamMembers.filter((member) => member.status === "Online").length}</p>
          </Card>
          <Card className="p-4">
            <Mail className="text-funza-warning" size={18} />
            <p className="mt-3 text-sm text-muted-foreground">Agents</p>
            <p className="mt-1 text-2xl font-semibold">{teamMembers.filter((member) => member.role === "Agent").length}</p>
          </Card>
        </section>

        <Card>
          <SectionHeader title="Workspace members" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-muted text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Member</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Last active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="bg-card">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-funza-primary-light text-xs font-bold text-funza-primary">
                          {member.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                        </span>
                        <span className="font-semibold">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{member.email}</td>
                    <td className="px-5 py-4"><Badge tone="blue">{member.role}</Badge></td>
                    <td className="px-5 py-4"><Badge tone={statusTone[member.status]}>{member.status}</Badge></td>
                    <td className="px-5 py-4 text-muted-foreground">{member.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  )
}
