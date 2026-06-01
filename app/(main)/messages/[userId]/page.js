import { getCurrentUser } from "@/lib/auth";
import { getMessages, getUserById } from "@/lib/db";
import { redirect } from "next/navigation";
import MessageThread from "@/components/messages/message-thred";

export const dynamic = "force-dynamic";

export default async function ConversationPage({ params }) {
  const { userId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const otherUser = getUserById(userId);
  if (!otherUser) redirect("/messages");

  const messages = getMessages(user.id, Number(userId));

  return (
    <div className="flex flex-col h-screen">
      {/* header */}
      <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-3 sticky top-0 bg-[#071029]">
        <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold text-sm">
          {otherUser.name?.charAt(0).toUpperCase()}
        </div>
        <p className="text-white font-bold">{otherUser.name}</p>
      </div>

      {/* messages with polling */}
      <MessageThread
        initialMessages={messages}
        currentUserId={user.id}
        otherUserId={Number(userId)}
      />
    </div>
  );
}
