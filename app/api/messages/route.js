import { verifySession } from "@/lib/auth";
import { getMessages } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return NextResponse.json({ messages: [] });

  const session = await verifySession(token);
  if (!session) return NextResponse.json({ message: [] });

  const { searchParams } = new URL(request.url);
  const otherUserId = searchParams.get("userId");

  const messages = getMessages(session.userId, Number(otherUserId));

  return NextResponse.json({ messages });
}
