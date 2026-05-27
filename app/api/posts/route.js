import { getPosts } from "@/lib/db";
import { NextResponse } from "next/server";

import AddPost from "@/components/feeds/add-post";

export async function GET() {
  const posts = getPosts();

  return NextResponse.json(posts);
}

export async function POST(req) {
  const origin = req.headers.get("origin");
  const allowedOrigins = [
    "http://localhost:3000",
    "https://pulsefeed.vercel.app",
  ];
  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await req.json();
  const { content, user } = body;
  const feed = AddPost({ content, user });

  return NextResponse.json(feed);
}
