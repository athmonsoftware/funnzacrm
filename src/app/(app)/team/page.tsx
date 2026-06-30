"use client";

import { useEffect, useState, useMemo } from "react";
import { Mail, UserRoundPlus, Users } from "lucide-react";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";

const statusTone = {
  Online: "green",
  Away: "amber",
  Offline: "gray",
} as const;

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Online" | "Away" | "Offline";
  lastActive: string;
};

type Team = {
  id: string;
  name: string;
};

export default function TeamMembersPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTeamId, setActiveTeamId] = useState<string>("");

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // still called "invite" (as requested)
  const [isInviting, setIsInviting] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "Agent",
  });

  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teams`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const json = await res.json();

        setTeams(json.teams || []);
        setMembers(json.teamMembers || []);

        if (json.teams?.length) {
          setActiveTeamId(json.teams[0].id);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const filteredMembers = useMemo(() => {
    return members;
  }, [members, activeTeamId]);

  const onlineCount = filteredMembers.filter(
    (m) => m.status === "Online"
  ).length;

  const agentCount = filteredMembers.filter((m) => m.role === "Agent").length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading members...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-red-500">
        Failed to load team members
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        {/* HEADER */}
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-funza-primary">
              Team management
            </p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Members</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage workspace seats, roles, and presence.
            </p>

            {teams.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Active team:
                </span>

                <select
                  className="border rounded px-3 py-1 text-sm bg-background"
                  value={activeTeamId}
                  onChange={(e) => setActiveTeamId(e.target.value)}
                >
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <Button className="gap-2" onClick={() => setIsInviting(true)}>
            <UserRoundPlus size={16} />
            Invite member
          </Button>
        </section>

        {filteredMembers.length === 0 ? (
          <Card>
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Users className="text-muted-foreground" size={42} />
              <h2 className="mt-4 text-lg font-semibold">No members found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Invite your first team member.
              </p>

              <Button className="mt-4" onClick={() => setIsInviting(true)}>
                Invite member
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <section className="grid gap-4 md:grid-cols-3">
              <Card className="p-4">
                <Users className="text-funza-primary" size={18} />
                <p className="mt-3 text-sm text-muted-foreground">
                  Total seats
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {filteredMembers.length}
                </p>
              </Card>

              <Card className="p-4">
                <Users className="text-funza-accent" size={18} />
                <p className="mt-3 text-sm text-muted-foreground">Online now</p>
                <p className="mt-1 text-2xl font-semibold">{onlineCount}</p>
              </Card>

              <Card className="p-4">
                <Mail className="text-funza-warning" size={18} />
                <p className="mt-3 text-sm text-muted-foreground">Agents</p>
                <p className="mt-1 text-2xl font-semibold">{agentCount}</p>
              </Card>
            </section>

            <Card>
              <SectionHeader title="Workspace members" />

              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left text-sm">
                  <thead className="bg-muted text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Member</th>
                      <th className="px-5 py-3">Email</th>
                      <th className="px-5 py-3">Role</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Last active</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="bg-card">
                        <td className="px-5 py-4 flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-funza-primary-light text-xs font-bold text-funza-primary">
                            {getInitials(member.name)}
                          </span>
                          <span className="font-semibold">{member.name}</span>
                        </td>

                        <td className="px-5 py-4 text-muted-foreground">
                          {member.email}
                        </td>

                        <td className="px-5 py-4">
                          <Badge tone="blue">{member.role}</Badge>
                        </td>

                        <td className="px-5 py-4">
                          <Badge tone={statusTone[member.status] || "gray"}>
                            {member.status}
                          </Badge>
                        </td>

                        <td className="px-5 py-4 text-muted-foreground">
                          {member.lastActive}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>

      {isInviting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 space-y-4 text-black">
            <h2 className="text-lg font-semibold">Add Team Member</h2>

            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Full name"
              value={inviteForm.name}
              onChange={(e) =>
                setInviteForm((p) => ({
                  ...p,
                  name: e.target.value,
                }))
              }
            />

            <input
              type="email"
              className="w-full border p-2 rounded"
              placeholder="Email address"
              value={inviteForm.email}
              onChange={(e) =>
                setInviteForm((p) => ({
                  ...p,
                  email: e.target.value,
                }))
              }
            />

            <select
              className="w-full border p-2 rounded"
              value={inviteForm.role}
              onChange={(e) =>
                setInviteForm((p) => ({
                  ...p,
                  role: e.target.value,
                }))
              }
            >
              <option value="Agent">Agent</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>

            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsInviting(false)}>Cancel</Button>

              <Button
                disabled={
                  adding ||
                  !inviteForm.email ||
                  !inviteForm.name ||
                  !activeTeamId
                }
                onClick={async () => {
                  try {
                    setAdding(true);

                    const res = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}/api/teams/${activeTeamId}/members`,
                      {
                        method: "POST",
                        credentials: "include",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          name: inviteForm.name,
                          email: inviteForm.email,
                          role: inviteForm.role,
                        }),
                      }
                    );

                    const data = await res.json();

                    if (!res.ok) {
                      throw new Error(data.error || "Failed to add member");
                    }

                    // 2. safe UI merge
                    setMembers((prev) => {
                      const exists = prev.some((m) => m.id === data.member.id);
                      if (exists) return prev;

                      return [...prev, data.member];
                    });

                    // 3. reset
                    setIsInviting(false);
                    setInviteForm({
                      name: "",
                      email: "",
                      role: "Agent",
                    });
                  } catch (err) {
                    console.error("Add member error:", err);
                  } finally {
                    setAdding(false);
                  }
                }}
              >
                {adding ? "Adding..." : "Add Member"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
