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
  createPost,
  createUser,
  getUserByEmail,
  likePostDb,
} from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFeed(prevState, formData) {
  const user = await getCurrentUser();
  const content = formData.get("content");

  if (!content) return { error: "Content cannot be empty" };

  createPost({ userId: user.id, content });

  revalidatePath("/");

  return { success: true };
}

export async function likePost(formData) {
  const user = getCurrentUser();
  const postId = formData.get("postId");
  const result = likePostDb(user.id, postId);

  console.log("post liked! ❤️❤️❤️❤️");
  revalidatePath("/");

  return result;
}

//add comments\\\\

export async function addComment(prevState, formData) {
  const user = getCurrentUser();
  const postId = formData.get("postId");
  const content = formData.get("content");

  if (!content) return { error: "Comment cannot be empty!" };

  createComment({ userId: user.id, postId, content });
  revalidatePath(`/post/${postId}`);
  return { success: true };
}

//register and login server actions

export async function register(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const userName = formData.get("username");

  //validation

  if (!name || !userName || !email || !password) {
    return { error: "All fields are required!" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  //check if email already exists

  const existing = getUserByEmail(email);

  if (existing) {
    return { error: "Email already in use" };
  }

  //hash password and create user

  const hashedPassword = await hashPassword(password);
  createUser({ name, username: userName, email, password: hashedPassword });

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
    {
      error: "All fields are required";
    }
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
