"use client"

import { useState } from "react"
import { conversations } from "@/lib/mock-data"
import { Card, Button, SectionHeader } from "@/components/ui"

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])

  return (
    <section className="grid min-h-[calc(100vh-132px)] gap-5 xl:grid-cols-[380px_1fr]">
      <Card>
        <SectionHeader title="Conversation inbox" />
        <div className="divide-y divide-[#edf1f5]">
          {conversations.map((conversation) => {
            const selected = selectedConversation.id === conversation.id
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
                  <p className="font-semibold">{conversation.customer}</p>
                  <span className="text-xs text-[#64748b]">{conversation.time}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-[#64748b]">
                  {conversation.preview}
                </p>
              </button>
            )
          })}
        </div>
      </Card>

      <Card className="flex min-h-[560px] flex-col">
        <div className="border-b border-[#edf1f5] px-5 py-4">
          <p className="font-semibold">{selectedConversation.customer}</p>
          <p className="mt-1 text-sm text-[#64748b]">
            {selectedConversation.channel} conversation
          </p>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {selectedConversation.messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[82%] rounded-md px-4 py-3 text-sm leading-6 ${
                message.role === "agent"
                  ? "ml-auto bg-[#101828] text-white"
                  : "bg-[#f1f5f9] text-[#14213d]"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="border-t border-[#edf1f5] p-4">
          <div className="flex gap-3">
            <input
              className="h-11 min-w-0 flex-1 rounded-md border border-[#d8e0e8] px-3 text-sm outline-none focus:border-[#16a34a]"
              placeholder="Type a reply..."
            />
            <Button>Send</Button>
          </div>
        </div>
      </Card>
    </section>
  )
}
