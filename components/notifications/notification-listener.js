"use client";

import { useNotifications } from "@/lib/context/notification-context";
import { useEffect } from "react";

export default function NotificationListener() {
  const { dispatch } = useNotifications();

  useEffect(() => {
    //open SSE connection
    const eventSource = new EventSource("/api/notifications/stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (Array.isArray(data)) {
        //initial notifications load
        dispatch({ type: "SET_NOTIFICATIONS", payload: data });
      } else if (data.type === "notification") {
        //new notification pushed from server
        dispatch({ type: "ADD_NOTIFICATION", payload: data.notification });
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    //cleaneup on mount
    return () => eventSource.close();
  }, []);

  //renders nothing - just listens
  return null;
}
