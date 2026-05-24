"use server";

import {
  createSession,
  deleteSession,
  hashPassword,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";
import { addFeed, createUser, getUserByEmail, likeFeed } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

//register and login server actions

export async function register(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  //validation

  if (!name || !email || !password) {
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
  createUser({ name, email, password: hashedPassword });

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
