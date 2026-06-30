"use client";

import { useEffect, useState } from "react";
import { FileText, MessageSquareText, ShieldCheck, X } from "lucide-react";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";

type Prompt = {
  id: string;
  name: string;
  description: string | null;
  content: string;
  active: boolean;
};

export default function PromptSettingsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [editContent, setEditContent] = useState("");

  // ---------------- FETCH ----------------
  const fetchPrompts = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prompts`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setPrompts(data.prompts || []);
    } catch (err: any) {
      console.error("Failed to load prompts:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  // ---------------- TOGGLE ACTIVE ----------------
  const handleToggleActive = async (promptId: string, current: boolean) => {
    try {
      setSaving(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prompts/${promptId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active: !current,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      await fetchPrompts();
    } catch (err: any) {
      console.error("Failed to update prompt:", err.message);
    } finally {
      setSaving(false);
    }
  };

  // ---------------- EDIT ----------------
  const openEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setEditContent(prompt.content);
  };

  const saveEdit = async () => {
    if (!editingPrompt) return;

    try {
      setSaving(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prompts/${editingPrompt.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: editContent,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setEditingPrompt(null);
      setEditContent("");

      await fetchPrompts();
    } catch (err: any) {
      console.error("Failed to update prompt:", err.message);
    } finally {
      setSaving(false);
    }
  };

  // ---------------- SEED DEFAULTS ----------------
  const createDefaults = async () => {
    try {
      setSaving(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prompts/seed`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      await fetchPrompts();
    } catch (err: any) {
      console.error("Failed to create defaults:", err.message);
    } finally {
      setSaving(false);
    }
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Loading prompts...
      </div>
    );
  }

  // ---------------- EMPTY STATE ----------------
  if (!loading && prompts.length === 0) {
    return (
      <main className="p-6">
        <p className="text-muted-foreground mb-4">
          No prompts found for this account.
        </p>

        <Button onClick={createDefaults} disabled={saving}>
          Create default prompts
        </Button>
      </main>
    );
  }

  // ---------------- UI ----------------
  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        {/* HEADER */}
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-funza-primary">
              AI Center
            </p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Prompt settings
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Manage AI behavior rules, escalation logic, payment handling, and
              support instructions.
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={fetchPrompts} disabled={loading}>
              Refresh
            </Button>

            <Button onClick={createDefaults} disabled={saving}>
              Reset defaults
            </Button>
          </div>
        </section>

        {/* CARDS */}
        <section className="grid gap-5 lg:grid-cols-2">
          {prompts.map((prompt) => (
            <Card key={prompt.id}>
              <SectionHeader
                title={prompt.name}
                action={
                  <div className="flex items-center gap-2">
                    <Badge tone={prompt.active ? "blue" : "gray"}>
                      {prompt.active ? "Active" : "Inactive"}
                    </Badge>

                    <Button
                      disabled={saving}
                      onClick={() =>
                        handleToggleActive(prompt.id, prompt.active)
                      }
                    >
                      Toggle
                    </Button>

                    <Button onClick={() => openEdit(prompt)}>Edit</Button>
                  </div>
                }
              />

              <div className="p-5">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    {prompt.name.includes("Payment") ? (
                      <ShieldCheck size={18} />
                    ) : prompt.name.includes("Support") ? (
                      <MessageSquareText size={18} />
                    ) : (
                      <FileText size={18} />
                    )}
                  </span>

                  <div className="w-full">
                    <p className="text-sm text-muted-foreground">
                      {prompt.description}
                    </p>

                    <pre className="mt-4 max-h-52 overflow-auto whitespace-pre-wrap rounded-md border border-border bg-muted/50 p-4 text-sm">
                      {prompt.content}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </section>
      </div>

      {/* ---------------- EDIT MODAL ---------------- */}
      {editingPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-lg bg-background p-5 border border-border">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">{editingPrompt.name}</h2>
              <button onClick={() => setEditingPrompt(null)}>
                <X size={18} />
              </button>
            </div>

            <textarea
              className="w-full min-h-[300px] rounded-md border border-border bg-muted/30 p-3 text-sm"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setEditingPrompt(null)}>Cancel</Button>

              <Button onClick={saveEdit} disabled={saving}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
