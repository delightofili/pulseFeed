import { getCurrentUser } from "@/lib/auth";

import { getNotifications, markNotificationsRead } from "@/lib/db";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const notifications = getNotifications(user.id);

  return (
    <div className="w-full min-h-screen border-r border-neutral-800">
      {/* HEADER SECTION HEADER FILTER CONTROLS */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-[#071029]/80 border-b border-neutral-800 p-4">
        <h1 className="font-bold text-xl text-neutral-100 tracking-tight">
          Notifications
        </h1>

        {/* SUB NAVIGATION TAB CHOICES */}
        <div className="flex mt-4 text-sm font-semibold text-neutral-400 border-t border-neutral-800/40 pt-2">
          <div className="flex-1 text-center text-emerald-400 border-b-2 border-emerald-400 pb-2 cursor-pointer">
            All Activities
          </div>
          <div className="flex-1 text-center hover:text-neutral-200 pb-2 cursor-pointer transition">
            Mentions
          </div>
        </div>
      </header>

      {/* NOTIFICATION FEED BODY CONTENT CARDS */}
      <div className="divide-y divide-neutral-800/60">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-4 flex gap-x-4 hover:bg-neutral-900/20 transition cursor-pointer ${item.read ? "bg-neutral-900/50" : ""}`}
          >
            <p className="text-white text-sm">
              <span className="font-bold">{item.name}</span>
              {item.type === "like" && " liked your post"}
              {item.type === "comment" && " commented on your post"}
              {item.type === "follow" && " followed you"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
