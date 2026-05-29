"use client";

import { logout } from "@/app/actions";
import { useActionState } from "react";

export default function LogoutButton() {
  const [state, formAction, isPending] = useActionState(logout, null);
  return (
    <form action={formAction}>
      <button
        type="submit"
        className="rounded-lg bg-red-500 px-2 text-white cursor-pointer"
      >
        {isPending ? "logging out..." : " logout"}
      </button>
    </form>
  );
}
