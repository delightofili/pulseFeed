// components/feeds/AddPost.js
"use client";

import { createFeed } from "@/app/actions";
import NavLink from "../ui/nav-link";
import { useActionState } from "react";
import { FiImage, FiGift } from "react-icons/fi";
import { MdOutlineEmojiEmotions } from "react-icons/md";

export default function AddPost({ user }) {
  const [state, formAction, isPending] = useActionState(createFeed, null);

  return (
    <div className="border-b border-neutral-800">
      {/* tabs */}
      <div className="flex border-b border-neutral-800">
        <NavLink
          className="flex-1 text-center py-3 text-sm font-bold text-white"
          href="?tab=for-you"
        >
          For You
        </NavLink>
        <NavLink
          className="flex-1 text-center py-3 text-sm font-bold text-white"
          href="?tab=following"
        >
          Following
        </NavLink>
      </div>

      {/* post composer */}
      <div className="p-4 grid grid-cols-[44px_1fr] gap-3">
        {/* avatar */}
        <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {user?.name?.charAt(0).toUpperCase() ?? "?"}
        </div>

        {/* form */}
        <form action={formAction} className="flex flex-col gap-3">
          <textarea
            name="content"
            placeholder="What's happening?"
            rows={2}
            className="w-full bg-transparent text-white placeholder-neutral-500 resize-none outline-none text-lg pt-2"
          />

          {state?.error && (
            <p className="text-red-500 text-sm">{state.error}</p>
          )}
          {state?.success && <p className="text-green-500 text-sm">Posted!</p>}

          <div className="flex items-center justify-between border-t border-neutral-800 pt-3">
            <div className="flex gap-3 text-[#4F7CFF]">
              <button type="button">
                <FiImage className="w-5 h-5" />
              </button>
              <button type="button">
                <FiGift className="w-5 h-5" />
              </button>
              <button type="button">
                <MdOutlineEmojiEmotions className="w-5 h-5" />
              </button>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#4F7CFF] text-white px-5 py-1.5 rounded-full font-bold text-sm disabled:opacity-50 hover:bg-blue-600 transition"
            >
              {isPending ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
