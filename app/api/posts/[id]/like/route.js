import { getFeed, likeFeed } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const { slug } = await params;
  const post = getFeed(slug);

  likeFeed(slug);

  return NextResponse.json(post);
}
