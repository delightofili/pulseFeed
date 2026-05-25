"use client";

import { register } from "@/app/actions";
import Link from "next/link";
import { useActionState } from "react";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, null);
  return (
    <div className="w-full max-w-sm p-8 bg-neutral-900 rounded-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">
        Register to PulseFeed
      </h1>

      <form action={formAction} className="flex flex-col gap-4">
        <input
          name="name"
          type="name"
          placeholder="Name"
          className="bg-neutral-800 text-white p-3 rounded-lg"
        />
        <input
          name="username"
          type="username"
          placeholder="User name"
          className="bg-neutral-800 text-white p-3 rounded-lg"
        />
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
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-neutral-400 text-sm mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400">
          Login
        </Link>
      </p>
    </div>
  );
}
