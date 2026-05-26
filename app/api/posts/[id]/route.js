import { deleteFeed, deletePostDb, getFeed, getPostById } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  const post = getPostById(id);

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
  try {
    const { id } = await params;
    const post = getPostById(id);

    if (!post) {
      return NextResponse.json(
        {
          error: "No Post to delete",
        },
        { status: 404 },
      );
    }

    deletePostDb(id);

    return NextResponse.json(post);
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
