"use server";

import {
  createSession,
  deleteSession,
  getCurrentUser,
  hashPassword,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";
import {
  createComment,
  createNotification,
  createPost,
  createUser,
  deletePostDb,
  getPostById,
  getUserByEmail,
  likePostDb,
  sendMessagesDb,
} from "@/lib/db";
import { postSchema, registerSchema } from "@/lib/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { pushNotification } from "./api/notifications/stream/route";

export async function createFeed(prevState, formData) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "you must be logged in to post!" };
  }

  //validate input

  const result = postSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    console.log(result.error);
    return { error: result.error.issues[0].message };
  }

  //result.data is now safe and validated

  createPost({ userId: user.id, content: result.data.content });

  /* revalidatePath("/"); */
  revalidateTag("posts");

  return { success: true };
}

export async function likePost(formData) {
  const user = await getCurrentUser();
  const postId = formData.get("postId");
  const result = likePostDb(user.id, postId);

  if (!user) {
    return { error: "you must be logged in to like a post" };
  }

  //create notifications for post owner

  const post = getPostById(postId);
  if (post && post.user_id !== user.id) {
    createNotification({
      userId: post.user_id,
      actorId: user.id,
      type: "like",
      postId: Number(postId),
    });

    //push real-time notification to post owner

    pushNotification(post.user_id, {
      type: "like",
      actorName: user.name,
      postId,
    });
  }

  console.log("post liked! ❤️❤️❤️❤️");

  revalidateTag("posts");

  return result;
}

export async function deletePost(prevState, formData) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Not logged in" };
  }

  const postId = formData.get("postId");
  const post = await getPostById(postId);
  if (!post) {
    return { error: "Post not found" };
  }

  //ownership check
  if (post.user_id !== user.id) {
    return { error: "you can only delete your own post" };
  }

  deletePostDb(postId);
  revalidateTag("posts");
  console.log("post deleted");
  return { success: true };
}

//add comments\\\\

export async function addComment(prevState, formData) {
  const user = await getCurrentUser();
  const postId = formData.get("postId");
  const content = formData.get("content");

  if (!user) {
    return { error: "you must be logged in to comment on a post" };
  }

  if (!content) return { error: "Comment cannot be empty!" };

  createComment({ userId: user.id, postId, content });
  revalidatePath(`/post/${postId}`);
  return { success: true };
}

//register and login server actions

export async function register(prevState, formData) {
  /*   const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const userName = formData.get("username");

  //validation

  if (!name || !userName || !email || !password) {
    return { error: "All fields are required!" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  } */

  const result = registerSchema.safeParse({
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const { name, username, email, password } = result.data;

  //check if email already exists

  const existing = getUserByEmail(email);

  if (existing) {
    return { error: "Email already in use" };
  }

  //hash password and create user

  const hashedPassword = await hashPassword(password);
  createUser({ name, username: username, email, password: hashedPassword });

  //get the new user and create session

  const user = getUserByEmail(email);
  const token = await createSession(user.id);
  await setSessionCookie(token);

  redirect("/"); //to feed thoooooooooooooooooo
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "All fields are required" };
  }

  const user = getUserByEmail(email);

  if (!user) {
    return { error: "Invalid email or password" };
  }

  const valid = await verifyPassword(password, user.password);

  if (!valid) {
    return { error: "Invalid email or password" };
  }

  const token = await createSession(user.id);
  await setSessionCookie(token);

  redirect("/"); //fedddddddddddddddddddddddddddddddddddddddddddddd\\\
}

export async function logout() {
  await deleteSession();

  redirect("/login");
}

//messages

export async function sendMessages(prevState, formData) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not logged in" };

  const receiverId = formData.get("receiverId");
  const content = formData.get("content");

  if (!content?.trim()) return { error: "Message cannot be empty" };

  sendMessagesDb({
    senderId: user.id,
    receiverId: Number(receiverId),
    content: content.trim(),
  });

  revalidatePath(`/messages/${receiverId}`);
  return { success: true };
}
