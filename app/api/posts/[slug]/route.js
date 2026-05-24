import { deleteFeed, getFeed } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { slug } = await params;
  const post = getFeed(slug);

  if (!post) {
    return NextResponse.json(
      {
        error: "No Post Found",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(post);
}

export async function DELETE(req, { params }) {
  const { slug } = await params;
  const post = getFeed(slug);

  if (!post) {
    return NextResponse.json(
      {
        error: "No Post to delete",
      },
      { status: 404 },
    );
  }

  deleteFeed(slug);

  return NextResponse.json(post);
}
