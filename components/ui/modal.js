"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";

export default function PostModal({ post }) {
  const router = useRouter();
  const commentInputRef = useRef(null);

  // Interactive state management
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  // Helper function to focus the comment input box immediately
  const handleFocusComment = () => {
    setIsReplying(true);
    commentInputRef.current?.focus();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 backdrop-blur-md p-4 cursor-pointer"
    >
      {/* THE MODAL WINDOW */}
      <div className="w-full max-w-xl bg-[#0b1329] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* STICKY HEADER */}
        <div className="flex items-center gap-x-4 border-b border-neutral-800 p-4 bg-[#0b1329]/80 backdrop-blur-sm sticky top-0 z-10">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-neutral-800 text-emerald-400 rounded-full transition font-bold"
          >
            ← Back
          </button>
          <span className="font-bold text-neutral-200">Pulse Thread</span>
        </div>

        {/* FEED AREA */}
        <div className="overflow-y-auto p-4 space-y-4">
          {/* PARENT POST */}
          <div className="space-y-3">
            <div className="flex items-center gap-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold text-neutral-950 shrink-0">
                {post.author ? post.author.substring(0, 2).toUpperCase() : "AO"}
              </div>
              <div>
                <h4 className="font-bold text-neutral-100 text-sm leading-tight">
                  {post.author || "Adaeze Obasi"}
                </h4>
                <span className="text-xs text-neutral-400">
                  @_pulse_feed · Just now
                </span>
              </div>
            </div>

            <p className="text-neutral-100 text-lg leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>

            {post.image && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-800/60">
                <Image
                  src={post.image}
                  alt="Post asset"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* ACTION BUTTON BAR (Clicking message bubbles focuses the form input below) */}
          <div className="flex items-center justify-between text-neutral-400 text-sm py-3 border-y border-neutral-800/60 px-4">
            <button
              onClick={handleFocusComment}
              className="flex items-center gap-x-2 hover:text-emerald-400 transition cursor-pointer"
            >
              💬{" "}
              <span className="font-medium text-xs text-neutral-400 hover:text-emerald-400">
                12
              </span>
            </button>
            <button className="flex items-center gap-x-2 hover:text-emerald-400 transition cursor-pointer">
              🔁 <span className="text-xs">22</span>
            </button>
            <button className="flex items-center gap-x-2 hover:text-rose-500 transition cursor-pointer">
              ❤️ <span className="text-xs">42</span>
            </button>
            <button className="flex items-center gap-x-2 hover:text-emerald-400 transition cursor-pointer">
              🔖 <span className="text-xs">15</span>
            </button>
          </div>

          {/* DYNAMIC REPLY FORM CONTAINER */}
          <div className="pt-2">
            <div className="flex gap-x-3">
              <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs text-neutral-300 font-bold shrink-0">
                Me
              </div>
              <div className="w-full">
                <textarea
                  ref={commentInputRef}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onFocus={() => setIsReplying(true)}
                  placeholder={`Reply to @${post.author || "user"}...`}
                  className="w-full bg-transparent text-neutral-200 text-sm placeholder-neutral-500 focus:outline-none resize-none min-h-[50px] pt-1"
                />

                {/* Submit actions only drop open when user focuses input box */}
                {isReplying && (
                  <div className="flex justify-end gap-x-2 mt-2 pt-2 border-t border-neutral-800/40">
                    <button
                      onClick={() => setIsReplying(false)}
                      type="button"
                      className="text-neutral-400 hover:text-neutral-200 px-3 py-1.5 rounded-full text-xs transition"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={!replyText.trim()}
                      className="bg-emerald-500 text-neutral-950 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-400 disabled:opacity-40 disabled:pointer-events-none transition"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LISTED FEED COMMENTS STREAM */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Discussion
            </h5>

            {/* Comment Item 1 */}
            <div className="flex gap-x-3 text-sm pb-3 border-b border-neutral-800/40">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                U1
              </div>
              <div>
                <div className="flex gap-x-2 text-xs text-neutral-400">
                  <span className="font-bold text-neutral-200">Chidi</span>
                  <span>@chidi_dev · 2h</span>
                </div>
                <p className="text-neutral-300 mt-1 leading-relaxed">
                  This layout is looking incredibly clean. The blur overlay
                  effects match perfectly!
                </p>
              </div>
            </div>

            {/* Comment Item 2 */}
            <div className="flex gap-x-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                U2
              </div>
              <div>
                <div className="flex gap-x-2 text-xs text-neutral-400">
                  <span className="font-bold text-neutral-200">Tariq</span>
                  <span>@tariq_codes · 5h</span>
                </div>
                <p className="text-neutral-300 mt-1 leading-relaxed">
                  Lagos tech tech workspace setups are hit completely different.
                  Pure gold. ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
