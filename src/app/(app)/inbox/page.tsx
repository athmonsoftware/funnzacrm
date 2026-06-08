"use client"

import { useMemo, useState } from "react"
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
} from "lucide-react"
import { conversations, customers } from "@/lib/mock-data"
import { Badge, Button, Card } from "@/components/ui"

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [channel, setChannel] = useState("All")
  const customer = customers.find((item) => item.id === selectedConversation.customerId)

  const filteredConversations = useMemo(() => {
    if (channel === "All") return conversations
    return conversations.filter((conversation) => conversation.channel === channel)
  }, [channel])

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 text-[#14213d] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#16a34a]">Conversation center</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Unified inbox</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
              Manage SMS, WhatsApp, and AI conversations with suggested replies and customer context in one view.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "SMS", "WhatsApp"].map((item) => (
              <button
                key={item}
                className={`h-10 rounded-md border px-4 text-sm font-semibold transition ${
                  channel === item
                    ? "border-[#16a34a] bg-[#16a34a] text-white"
                    : "border-[#d8e0e8] bg-white text-[#14213d] hover:bg-[#f8fafc]"
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
            <div className="border-b border-[#edf1f5] px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold">Open conversations</h2>
                <Badge tone="blue">{filteredConversations.length}</Badge>
              </div>
              <p className="mt-1 text-sm text-[#64748b]">Prioritized by unread and escalation risk.</p>
            </div>
            <div className="max-h-[720px] overflow-y-auto">
              {filteredConversations.map((conversation) => {
                const selected = selectedConversation.id === conversation.id

                return (
                  <button
                    key={conversation.id}
                    className={`block w-full border-b border-[#edf1f5] px-4 py-4 text-left transition ${
                      selected ? "bg-[#eef7f1]" : "bg-white hover:bg-[#f8fafc]"
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-semibold">{conversation.customer}</p>
                          {conversation.unread ? <span className="h-2 w-2 shrink-0 rounded-full bg-[#16a34a]" /> : null}
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#64748b]">{conversation.preview}</p>
                      </div>
                      <span className="shrink-0 text-xs text-[#64748b]">{conversation.time}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge tone={conversation.channel === "WhatsApp" ? "green" : "blue"}>{conversation.channel}</Badge>
                      <Badge tone={conversation.priority === "high" ? "amber" : "gray"}>{conversation.aiClassification}</Badge>
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>

          <Card className="flex min-h-[620px] flex-col overflow-hidden">
            <div className="border-b border-[#edf1f5] px-5 py-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold">{selectedConversation.customer}</h2>
                    <Badge tone={selectedConversation.status === "open" ? "green" : "gray"}>
                      {selectedConversation.status}
                    </Badge>
                    <Badge tone="blue">{selectedConversation.channel}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-[#64748b]">
                    Assigned to {selectedConversation.assignedAgent} · {selectedConversation.aiClassification}
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
              <div className="rounded-md border border-[#dbeafe] bg-[#eff6ff] p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 text-[#4f46e5]" size={18} />
                  <div>
                    <p className="text-sm font-semibold">AI summary</p>
                    <p className="mt-1 text-sm leading-6 text-[#475569]">{selectedConversation.summary}</p>
                  </div>
                </div>
              </div>

              {selectedConversation.messages.map((message) => {
                const isAgent = message.role === "agent"
                const isAi = message.role === "ai"

                return (
                  <div
                    key={message.id}
                    className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[86%] rounded-md px-4 py-3 text-sm leading-6 shadow-sm ${
                        isAgent
                          ? "bg-[#101828] text-white"
                          : isAi
                            ? "border border-[#dbeafe] bg-[#eff6ff] text-[#1e3a8a]"
                            : "border border-[#edf1f5] bg-white text-[#14213d]"
                      }`}
                    >
                      <div className="mb-1 flex items-center gap-2 text-xs opacity-75">
                        {isAi ? <Bot size={13} /> : isAgent ? <UserRound size={13} /> : <MessageCircle size={13} />}
                        <span>{message.role}</span>
                        <span>{message.time}</span>
                      </div>
                      {message.text}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-[#edf1f5] bg-white p-4">
              {selectedConversation.aiSuggestions.length > 0 ? (
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Bot size={16} className="text-[#4f46e5]" />
                    AI suggested replies
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selectedConversation.aiSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        className="min-w-[260px] rounded-md border border-[#dbeafe] bg-[#eff6ff] px-3 py-2 text-left text-xs leading-5 text-[#1e3a8a] transition hover:border-[#4f46e5]/40"
                        type="button"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="flex gap-3">
                <input
                  className="h-11 min-w-0 flex-1 rounded-md border border-[#d8e0e8] px-3 text-sm outline-none focus:border-[#16a34a]"
                  placeholder="Type a reply..."
                />
                <Button className="gap-2">
                  <Send size={16} />
                  Send
                </Button>
              </div>
            </div>
          </Card>

          <aside className="grid gap-5">
            <Card>
              <div className="border-b border-[#edf1f5] px-5 py-4">
                <h2 className="font-semibold">Customer information</h2>
                <p className="mt-1 text-sm text-[#64748b]">Profile, tags, payment signals, and AI insight.</p>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#eef7f1] text-sm font-bold text-[#047857]">
                    {selectedConversation.customer
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold">{selectedConversation.customer}</p>
                    <p className="truncate text-sm text-[#64748b]">{customer?.email ?? "No email on file"}</p>
                  </div>
                </div>
                <InfoRow label="Phone" value={customer?.phone ?? "Unknown"} />
                <InfoRow label="Status" value={customer?.status ?? "Unknown"} />
                <InfoRow label="Last activity" value={customer?.lastActive ?? selectedConversation.time} />
                <InfoRow label="Assigned agent" value={selectedConversation.assignedAgent} />
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748b]">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {(customer?.tags ?? ["Conversation"]).map((tag) => (
                      <Badge key={tag} tone={tag === "VIP" ? "amber" : "gray"}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="border-b border-[#edf1f5] px-5 py-4">
                <h2 className="font-semibold">Agent tools</h2>
              </div>
              <div className="space-y-3 p-5">
                <ToolRow icon={StickyNote} label="Internal note" value="Add context for teammates" />
                <ToolRow icon={CheckCircle2} label="Escalation" value="Ready for human follow-up" />
                <ToolRow icon={Clock} label="SLA timer" value="18 min remaining" />
                <ToolRow icon={MessageSquareText} label="Conversation type" value={selectedConversation.aiClassification} />
              </div>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-[#edf1f5] pt-3 text-sm">
      <span className="text-[#64748b]">{label}</span>
      <span className="min-w-0 truncate text-right font-medium">{value}</span>
    </div>
  )
}

function ToolRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <button
      className="flex w-full items-center gap-3 rounded-md border border-[#edf1f5] p-3 text-left transition hover:bg-[#f8fafc]"
      type="button"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#f1f5f9] text-[#14213d]">
        <Icon size={16} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block truncate text-xs text-[#64748b]">{value}</span>
      </span>
    </button>
  )
}
