import { getNotifications } from "@/lib/db";
import { cookies } from "next/headers";

//stores active connections - userId -> response stream
const connections = new Map();

export async function GET(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return new Response("Unauthorized", { status: 401 });

  const userId = session.userId;

  //crreating a readable stream

  const stream = new ReadableStream({
    start(controller) {
      //store this connection
      connections.set(userId, controller);

      //send initial notifications
      const notifications = getNotifications(userId);
      const data = `data: ${JSON.stringify(notifications)}\n\n`;
      controller.enqueue(new TextEncoder().encode(data));

      //cleanup when client disconnects

      request.signal.addEventListener("abort", () => {
        connections.delete(userId);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export function pushNotification(userId, notification) {
  const controller = connections.get(userId);
  if (controller) {
    const data = `data: ${JSON.stringify({ type: "notification", notification })}\n\n`;
    controller.enqueue(new TextEncoder().encode(data));
  }
}
