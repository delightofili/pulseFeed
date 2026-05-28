"use client";

import { useNotifications } from "@/lib/context/notification-context";
import { IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";

export default function NotificationIcon() {
  const { state } = useNotifications();
  return (
    <Link
      href="/notifications"
      className="relative flex items-center gap-x-4 p-3 hover:bg-[#212f5b75] rounded-full w-fit xl:w-full transition"
    >
      <div className="relative">
        <IoNotificationsOutline className="text-xl" />
        {state.unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#4F7CFF] rounded-full text-xs flex items-center justify-center text-white">
            {state.unreadCount}
          </span>
        )}
      </div>
      <span className="hidden xl:inline font-medium">Notifications</span>
    </Link>
  );
}
