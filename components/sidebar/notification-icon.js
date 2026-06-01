"use client";

import { useNotifications } from "@/lib/context/notification-context";
import { IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotificationIcon({ initialCount }) {
  const { state } = useNotifications();
  const [unreadCount, setUnreadCount] = useState(initialCount);

  useEffect(() => {
    //poll every 10 secs
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/notifications/count");
        const data = await res.json();
        setUnreadCount(data.count);
      } catch {}
    }, 10000);

    //cleanup - stop polling when component unmounts
    return () => clearInterval(interval);
  }, []);
  return (
    <Link
      href="/notifications"
      className="relative flex items-center gap-x-4 p-3 hover:bg-[#212f5b75] rounded-full w-fit xl:w-full transition"
    >
      <div className="relative">
        <IoNotificationsOutline className="text-xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#4F7CFF] rounded-full text-xs flex items-center justify-center text-white">
            {unreadCount}
          </span>
        )}
      </div>
      <span className="hidden xl:inline font-medium">Notifications</span>
    </Link>
  );
}
