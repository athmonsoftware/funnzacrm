"use client";

import { useEffect, useState } from "react";
import { Card, Button, SectionHeader } from "@/components/ui";

type Message = {
  id?: string;
  role: "user" | "assistant" | "agent";
  content?: string;
  text?: string;
};

type Conversation = {
  id: string;
  customer_number: string;
  company_number?: string;
  source?: string;
  lastMessage?: string;
  messageCount?: number;
  messages: Message[];
  updated_at?: string;
};

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/conversations`,
          {
            credentials: "include",
          },
        );

        if (!res.ok) throw new Error("Failed to fetch conversations");

        const json = await res.json();

        const data = json.conversations || [];

        setConversations(data);
        setSelectedConversation(data[0] || null);
      } catch (err) {
        console.error("Failed to load inbox:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <p className="p-6 text-sm text-gray-500">Loading inbox...</p>;
  }

  if (!selectedConversation) {
    return <p className="p-6 text-sm text-gray-500">No conversations found.</p>;
  }

  return (
    <section className="grid min-h-[calc(100vh-132px)] gap-5 xl:grid-cols-[380px_1fr]">
      {/* LEFT SIDEBAR */}
      <Card>
        <SectionHeader title="Conversation inbox" />

        <div className="divide-y divide-[#edf1f5]">
          {conversations.map((conversation) => {
            const selected = selectedConversation.id === conversation.id;

            return (
              <button
                key={conversation.id}
                className={`block w-full px-5 py-4 text-left transition ${
                  selected ? "bg-[#eef7f1]" : "hover:bg-[#f8fafc]"
                }`}
                onClick={() => setSelectedConversation(conversation)}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">
                    {conversation.customer_number}
                  </p>

                  <span className="text-xs text-[#64748b]">
                    {conversation.messageCount ?? 0} msgs
                  </span>
                </div>

                <p className="mt-1 line-clamp-2 text-sm text-[#64748b]">
                  {conversation.lastMessage || "No messages yet"}
                </p>
              </button>
            );
          })}
        </div>
      </Card>

      {/* RIGHT CHAT PANEL */}
      <Card className="flex min-h-[560px] flex-col">
        <div className="border-b border-[#edf1f5] px-5 py-4">
          <p className="font-semibold">
            {selectedConversation.customer_number}
          </p>
          <p className="mt-1 text-sm text-[#64748b]">
            {selectedConversation.source || "unknown"} conversation
          </p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {(selectedConversation.messages || []).map((message, idx) => {
            const isAgent =
              message.role === "assistant" || message.role === "agent";

            return (
              <div
                key={message.id || idx}
                className={`max-w-[82%] rounded-md px-4 py-3 text-sm leading-6 ${
                  isAgent
                    ? "ml-auto bg-[#101828] text-white"
                    : "bg-[#f1f5f9] text-[#14213d]"
                }`}
              >
                {message.content || message.text}
              </div>
            );
          })}
        </div>

        {/* <div className="border-t border-[#edf1f5] p-4">
          <div className="flex gap-3">
            <input
              className="h-11 min-w-0 flex-1 rounded-md border border-[#d8e0e8] px-3 text-sm outline-none focus:border-[#16a34a]"
              placeholder="Type a reply..."
            />
            <Button>Send</Button>
          </div>
        </div> */}
      </Card>
    </section>
  );
}
