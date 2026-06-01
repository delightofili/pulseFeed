"use client";
import { useState, useEffect, useRef } from "react";
import { useActionState } from "react";
import { sendMessages } from "@/app/actions";

export default function MessageThread({
  initialMessages,
  currentUserId,
  otherUserId,
}) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef(null);
  const [state, formAction, isPending] = useActionState(sendMessages, null);

  // scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // poll for new messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/messages?userId=${otherUserId}`);
        const data = await res.json();
        setMessages(data.messages);
      } catch {
        // silently fail
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [otherUserId]);

  return (
    <div className="flex flex-col flex-1">
      {/* messages list */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender_id === currentUserId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                msg.sender_id === currentUserId
                  ? "bg-[#4F7CFF] text-white rounded-br-sm"
                  : "bg-neutral-800 text-white rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* message input */}
      <form
        action={formAction}
        className="p-4 border-t border-neutral-800 flex gap-2"
      >
        <input type="hidden" name="receiverId" defaultValue={otherUserId} />
        <input
          name="content"
          placeholder="Type a message..."
          className="flex-1 bg-neutral-800 text-white rounded-full px-4 py-2 text-sm outline-none"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#4F7CFF] text-white px-4 py-2 rounded-full text-sm font-bold disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
