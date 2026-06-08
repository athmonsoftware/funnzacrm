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
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#16a34a]">Team management</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Members</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
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
            <Users className="text-[#16a34a]" size={18} />
            <p className="mt-3 text-sm text-[#64748b]">Total seats</p>
            <p className="mt-1 text-2xl font-semibold">{teamMembers.length}</p>
          </Card>
          <Card className="p-4">
            <Users className="text-[#4f46e5]" size={18} />
            <p className="mt-3 text-sm text-[#64748b]">Online now</p>
            <p className="mt-1 text-2xl font-semibold">{teamMembers.filter((member) => member.status === "Online").length}</p>
          </Card>
          <Card className="p-4">
            <Mail className="text-[#f59e0b]" size={18} />
            <p className="mt-3 text-sm text-[#64748b]">Agents</p>
            <p className="mt-1 text-2xl font-semibold">{teamMembers.filter((member) => member.role === "Agent").length}</p>
          </Card>
        </section>

        <Card>
          <SectionHeader title="Workspace members" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-[#f8fafc] text-xs uppercase tracking-[0.12em] text-[#64748b]">
                <tr>
                  <th className="px-5 py-3">Member</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Last active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf1f5]">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="bg-white">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#eef7f1] text-xs font-bold text-[#047857]">
                          {member.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                        </span>
                        <span className="font-semibold">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#64748b]">{member.email}</td>
                    <td className="px-5 py-4"><Badge tone="blue">{member.role}</Badge></td>
                    <td className="px-5 py-4"><Badge tone={statusTone[member.status]}>{member.status}</Badge></td>
                    <td className="px-5 py-4 text-[#64748b]">{member.lastActive}</td>
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
