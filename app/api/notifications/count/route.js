import { verifySession } from "@/lib/auth";
import { getUnreadCount } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) {
      return NextResponse.json({ count: 0 });
    }

    const session = await verifySession(token);
    if (!session) {
      return NextResponse.json({ count: 0 });
    }

    const count = getUnreadCount(session.userId);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
