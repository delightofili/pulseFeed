"use client";
import { useActionState } from "react";
import { addComment } from "@/app/actions";

export default function CommentForm({ postId }) {
  const [state, formAction, isPending] = useActionState(addComment, null);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="postId" value={postId} />
      <textarea
        name="content"
        placeholder="Write a comment..."
        className="w-full bg-neutral-800 text-white rounded-lg p-3 text-sm resize-none"
        rows={2}
      />
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="self-end bg-blue-500 text-white px-4 py-2 rounded-full text-sm disabled:opacity-50"
      >
        {isPending ? "Posting..." : "Reply"}
      </button>
    </form>
  );
}
