import { getCurrentUser } from "@/lib/auth";
import { getConversations } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MessagesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const conversations = getConversations(user.id);

  return (
    <div>
      <div className="px-4 py-3 border-b border-neutral-800">
        <h1 className="text-white text-xl font-bold">Messages</h1>
      </div>

      {conversations.length === 0 && (
        <p className="text-neutral-500 p-4 text-sm">
          No messages yet. Start a conversation from someone&rsquo;s profile.
        </p>
      )}

      {conversations.map((conv, index) => (
        <Link
          key={`${conv.other_user_id}-${index}`}
          href={`/messages/${conv.other_user_id}`}
          className="flex items-center gap-3 p-4 border-b border-neutral-800 hover:bg-neutral-900 transition"
        >
          <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold shrink-0">
            {conv.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm">{conv.name}</p>
            <p className="text-neutral-500 text-xs truncate">
              {conv.last_message}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
