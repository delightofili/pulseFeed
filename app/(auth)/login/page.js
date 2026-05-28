"use client";

import { login } from "@/app/actions";
import Link from "next/link";
import { useActionState } from "react";

export const dynamic = "force-static";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);
  return (
    <div className="w-full max-w-sm p-8 bg-neutral-900 rounded-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Login to PulseFeed</h1>

      <form action={formAction} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="bg-neutral-800 text-white p-3 rounded-lg"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="bg-neutral-800 text-white p-3 rounded-lg"
        />

        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white p-3 rounded-lg disabled:opacity-50"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-neutral-400 text-sm mt-4">
        No account?{" "}
        <Link href="/register" className="text-blue-400">
          Register
        </Link>
      </p>
    </div>
  );
}
