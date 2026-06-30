"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Archive,
  Bot,
  CheckCircle2,
  Clock,
  MessageCircle,
  MessageSquareText,
  Send,
  Sparkles,
  StickyNote,
  UserRound,
} from "lucide-react";
// import { conversations, customers } from "@/lib/mock-data";
import { Badge, Button, Card } from "@/components/ui";

type Message = {
  id: string;
  role: "agent" | "ai" | "customer";
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  customer: string;
  preview: string;
  time: string;
  status: string;
  channel: string;
  assignedAgent: string;
  aiClassification: string;
  summary: string;
  messages: Message[];
};

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [channel, setChannel] = useState("All");
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const filteredConversations = useMemo(() => {
    if (channel === "All") return conversations;

    return conversations.filter(
      (conversation) => conversation.channel === channel
    );
  }, [channel, conversations]);

  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function fetchConversations() {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/conversations`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        setConversations(data.conversations || []);
      } catch (err) {
        console.error("Failed to load conversations:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchConversations();
  }, []);
  useEffect(() => {
    if (conversations.length > 0) {
      setSelectedConversation((prev: any) => {
        if (prev) return prev;
        return conversations[0];
      });
    }
  }, [conversations]);

  const hasConversation = selectedConversation && selectedConversation.messages;

  const customer = {
    name: selectedConversation?.customer ?? "Unknown",
    phone: selectedConversation?.phone ?? "Unknown",
    email: selectedConversation?.email ?? "No email",
    status: selectedConversation?.status ?? "Unknown",
    last_active: selectedConversation?.last_active ?? "",
    tags: selectedConversation?.tags ?? [],
  };

  const handleSendSms = async () => {
    try {
      setSending(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/conversations/send`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: selectedConversation.phone,
            message: reply,
            companyId: selectedConversation.company_id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      console.log("SMS sent:", data);

      // clear input
      setReply("");

      // refresh conversations
      const refresh = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/conversations`,
        {
          credentials: "include",
        }
      );

      const refreshed = await refresh.json();
      setConversations(refreshed.conversations || []);
    } catch (err: any) {
      console.error("Failed to send SMS:", err.message);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading conversations...
      </div>
    );
  }

  if (!conversations.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
        <MessageCircle className="text-muted-foreground" size={32} />
        <h2 className="text-lg font-semibold">No conversations yet</h2>
        <p className="text-sm text-muted-foreground">
          When customers message you, they’ll show up here.
        </p>
      </div>
    );
  }

  if (!selectedConversation) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Select a conversation to begin
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-funza-primary">
              Conversation center
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
              Unified inbox
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Manage SMS, WhatsApp, and AI conversations with suggested replies
              and customer context in one view.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "SMS", "WhatsApp"].map((item) => (
              <button
                key={item}
                className={`h-10 rounded-md border px-4 text-sm font-semibold transition ${
                  channel === item
                    ? "border-funza-primary bg-funza-primary text-white"
                    : "border-border bg-card text-foreground hover:bg-muted"
                }`}
                onClick={() => setChannel(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="grid min-h-[calc(100vh-220px)] gap-5 xl:grid-cols-[340px_minmax(0,1fr)_320px]">
          <Card className="overflow-hidden">
            <div className="border-b border-border px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold">Open conversations</h2>
                <Badge tone="blue">{filteredConversations.length}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Prioritized by unread and escalation risk.
              </p>
            </div>
            <div className="max-h-[720px] overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center text-sm text-muted-foreground">
                  <MessageCircle className="mb-2" size={20} />
                  No conversations found
                </div>
              ) : (
                filteredConversations.map((conversation) => {
                  const selected = selectedConversation.id === conversation.id;

                  return (
                    <button
                      key={conversation.id}
                      className={`block w-full border-b border-border px-4 py-4 text-left transition ${
                        selected
                          ? "bg-funza-primary-light"
                          : "bg-card hover:bg-muted"
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                      type="button"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate font-semibold">
                              {conversation.customer}
                            </p>
                            {conversation.unread ? (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-funza-primary" />
                            ) : null}
                          </div>
                          <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                            {conversation.preview}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {conversation.time}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Badge
                          tone={
                            conversation.channel === "WhatsApp"
                              ? "green"
                              : "blue"
                          }
                        >
                          {conversation.channel}
                        </Badge>
                        <Badge
                          tone={
                            conversation.priority === "high" ? "amber" : "gray"
                          }
                        >
                          {conversation.aiClassification}
                        </Badge>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </Card>

          <Card className="flex min-h-[620px] flex-col overflow-hidden">
            <div className="border-b border-border px-5 py-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold">
                      {selectedConversation.customer}
                    </h2>
                    <Badge
                      tone={
                        selectedConversation.status === "open"
                          ? "green"
                          : "gray"
                      }
                    >
                      {selectedConversation.status}
                    </Badge>
                    <Badge tone="blue">{selectedConversation.channel}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Assigned to {selectedConversation.assignedAgent} ·{" "}
                    {selectedConversation.aiClassification}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button tone="secondary" className="gap-2">
                    <UserRound size={16} />
                    Assign
                  </Button>
                  <Button tone="secondary" className="gap-2">
                    <Archive size={16} />
                    Close
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <div className="rounded-md border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 text-funza-accent" size={18} />
                  <div>
                    <p className="text-sm font-semibold">AI summary</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {selectedConversation.summary}
                    </p>
                  </div>
                </div>
              </div>

              {selectedConversation?.messages?.map((message: any) => {
                const isAgent = message.role === "agent";
                const isAi = message.role === "ai";

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isAgent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[86%] rounded-md px-4 py-3 text-sm leading-6 shadow-sm ${
                        isAgent
                          ? "bg-foreground text-background"
                          : isAi
                          ? "border border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200"
                          : "border border-border bg-card text-foreground"
                      }`}
                    >
                      <div className="mb-1 flex items-center gap-2 text-xs opacity-75">
                        {isAi ? (
                          <Bot size={13} />
                        ) : isAgent ? (
                          <UserRound size={13} />
                        ) : (
                          <MessageCircle size={13} />
                        )}
                        <span>{message.role}</span>
                        <span>{message.time}</span>
                      </div>
                      {message.text}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border bg-card p-4">
              {(selectedConversation.aiSuggestions ?? []).length > 0 ? (
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Bot size={16} className="text-funza-accent" />
                    AI suggested replies
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selectedConversation.aiSuggestions.map(
                      (suggestion: any) => (
                        <button
                          key={suggestion}
                          className="min-w-[260px] rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-left text-xs leading-5 text-blue-900 transition hover:border-funza-accent/40 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200"
                          type="button"
                        >
                          {suggestion}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : null}
              <div className="flex gap-3">
                <input
                  className="h-11 min-w-0 flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-funza-primary"
                  placeholder="Type a reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <Button
                  className="gap-2"
                  disabled={sending || !reply.trim()}
                  onClick={handleSendSms}
                >
                  <Send size={16} />
                  {sending ? "Sending..." : "Send"}
                </Button>
              </div>
            </div>
          </Card>

          <aside className="grid gap-5">
            <Card>
              <div className="border-b border-border px-5 py-4">
                <h2 className="font-semibold">Customer information</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Profile, tags, payment signals, and AI insight.
                </p>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-funza-primary-light text-sm font-bold text-funza-primary">
                    {(selectedConversation?.customer ?? "U")
                      .split(" ")
                      .map((part: any) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold">
                      {selectedConversation.customer}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {customer?.email ?? "No email on file"}
                    </p>
                  </div>
                </div>
                <InfoRow label="Phone" value={customer?.phone ?? "Unknown"} />
                <InfoRow label="Status" value={customer?.status ?? "Unknown"} />
                <InfoRow
                  label="Last activity"
                  value={customer?.last_active ?? selectedConversation.time}
                />
                <InfoRow
                  label="Assigned agent"
                  value={selectedConversation.assignedAgent}
                />
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(customer?.tags ?? ["Conversation"]).map((tag: any) => (
                      <Badge key={tag} tone={tag === "VIP" ? "amber" : "gray"}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="border-b border-border px-5 py-4">
                <h2 className="font-semibold">Agent tools</h2>
              </div>
              <div className="space-y-3 p-5">
                <ToolRow
                  icon={StickyNote}
                  label="Internal note"
                  value="Add context for teammates"
                />
                <ToolRow
                  icon={CheckCircle2}
                  label="Escalation"
                  value="Ready for human follow-up"
                />
                <ToolRow
                  icon={Clock}
                  label="SLA timer"
                  value="18 min remaining"
                />
                <ToolRow
                  icon={MessageSquareText}
                  label="Conversation type"
                  value={selectedConversation.aiClassification}
                />
              </div>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="min-w-0 truncate text-right font-medium">{value}</span>
    </div>
  );
}

function ToolRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <button
      className="flex w-full items-center gap-3 rounded-md border border-border p-3 text-left transition hover:bg-muted"
      type="button"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
        <Icon size={16} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {value}
        </span>
      </span>
    </button>
  );
}
