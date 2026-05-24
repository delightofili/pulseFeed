"use server";

import { addFeed, likeFeed } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createFeed(prevState, formData) {
  const content = formData.get("content");
  const author = formData.get("author");

  if (!content || !author) return;

  addFeed({ content, author });

  console.log("Umm...FEED CREATED");
  revalidatePath("/");

  return { success: true };
}

export async function likePost(formData) {
  const slug = formData.get("slug");
  likeFeed(slug);
  console.log("post liked! ❤️❤️❤️❤️");
  revalidatePath("/");
}
