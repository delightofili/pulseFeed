import { addFeed, getFeeds } from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  /* const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return NextResponse.json({ error: "Not Logged In" }, { status: 401 });
  } */

  const posts = getFeeds();

  return NextResponse.json(posts);
}

export async function POST(req) {
  const body = await req.json();
  const { content, author } = body;
  const feed = addFeed({ content, author });

  return NextResponse.json(feed);
}
