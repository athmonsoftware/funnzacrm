"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Users } from "lucide-react";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
};

type Team = {
  id: string;
  name: string;
  description: string;
  lead: string;
  members: string[];
};

export default function TeamsPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [teams, setTeams] = useState<Team[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    lead_id: "",
  });

  // ---------------- FETCH ----------------
  useEffect(() => {
    if (!API_URL) {
      setError(true);
      setLoading(false);
      console.error("Missing NEXT_PUBLIC_API_URL");
      return;
    }

    async function loadTeams() {
      try {
        const res = await fetch(`${API_URL}/api/teams`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const text = await res.text();

        let json;
        try {
          json = JSON.parse(text);
        } catch {
          throw new Error("Server did not return valid JSON");
        }

        if (!res.ok) {
          throw new Error(json.error || "Failed to load teams");
        }

        setTeams(Array.isArray(json.teams) ? json.teams : []);
        setMembers(Array.isArray(json.teamMembers) ? json.teamMembers : []);
      } catch (err) {
        console.error("❌ Teams fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, [API_URL]);

  // ---------------- CREATE ----------------
  const handleCreateTeam = async () => {
    if (!API_URL) {
      setCreateError("Missing API URL");
      return;
    }

    try {
      setCreating(true);
      setCreateError(null);

      const res = await fetch(`${API_URL}/api/teams`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          lead_id: form.lead_id || null,
        }),
      });

      const text = await res.text();

      let json;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        setCreateError(json.error || "Failed to create team");
        return;
      }

      setTeams((prev) => [...prev, json.team]);

      setForm({ name: "", description: "", lead_id: "" });
      setIsCreating(false);
    } catch (err: any) {
      console.error(err);
      setCreateError(err.message || "Network error");
    } finally {
      setCreating(false);
    }
  };

  const memberById = useMemo(
    () => new Map(members.map((m) => [m.id, m])),
    [members]
  );

  // ---------------- LOADING & ERROR STATES ----------------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading teams...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-red-500">
        Failed to load teams
      </div>
    );
  }

  const safeTeams = Array.isArray(teams) ? teams : [];

  // ---------------- MAIN RENDER BODY ----------------
  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-funza-primary">
              Team management
            </p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Teams</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Organize agents into sales, support, and operations teams.
            </p>
          </div>

          <Button onClick={() => setIsCreating(true)}>Create team</Button>
        </section>

        {/* --- CONDITIONAL VIEWS (EMPTY VS LIST) --- */}
        {safeTeams.length === 0 ? (
          <Card>
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Building2 size={42} className="text-muted-foreground" />
              <h2 className="mt-4 text-lg font-semibold">No teams found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                You haven’t created any teams yet.
              </p>

              <Button className="mt-4" onClick={() => setIsCreating(true)}>
                Create your first team
              </Button>
            </div>
          </Card>
        ) : (
          <section className="grid gap-5 lg:grid-cols-3">
            {safeTeams.map((team) => {
              const lead = memberById.get(team.lead);

              return (
                <Card key={team.id}>
                  <SectionHeader
                    title={team.name}
                    action={
                      <Building2 size={18} className="text-funza-primary" />
                    }
                  />

                  <div className="space-y-4 p-5">
                    <p className="text-sm text-muted-foreground">
                      {team.description}
                    </p>

                    <div className="rounded-md border border-border p-3">
                      <p className="text-xs uppercase text-muted-foreground">
                        Team lead
                      </p>
                      <p className="mt-1 font-semibold">
                        {lead?.name ?? "Unassigned"}
                      </p>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <Users size={16} />
                        Members
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(team.members || []).map((memberId) => (
                          <Badge key={memberId} tone="gray">
                            {memberById.get(memberId)?.name ?? memberId}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </section>
        )}
      </div>

      {/* --- GLOBAL MODAL LAYER --- */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg space-y-3 text-foreground">
            <h2 className="text-lg font-semibold">Create Team</h2>

            <input
              className="w-full rounded border border-border bg-background p-2 text-foreground"
              placeholder="Team name"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
            />

            <input
              className="w-full rounded border border-border bg-background p-2 text-foreground"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
            />

            <div className="flex gap-2 justify-end">
              <Button onClick={() => setIsCreating(false)}>Cancel</Button>

              <Button onClick={handleCreateTeam} disabled={creating}>
                {creating ? "Creating..." : "Save team"}
              </Button>
            </div>

            {createError && (
              <p className="text-sm text-red-500">{createError}</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
