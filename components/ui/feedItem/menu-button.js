"use client";

import { deletePost } from "@/app/actions";
import { useActionState, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export default function MenuButton({ postId, currentUserId, postUserId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(deletePost, null);

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  console.log("currentUserId:", currentUserId, typeof currentUserId);
  console.log("postUserId:", postUserId, typeof postUserId);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent cursor-default"
          onClick={handleCloseMenu}
        ></div>
      )}
      <div className="absolute right-4 top-2 z-50 unique-menu-container">
        <div className="relative flex flex-col items-center group cursor-pointer">
          <button
            onClick={handleButtonClick}
            className="p-1 rounded-full hover:bg-neutral-800 transition-colors"
          >
            <BiDotsHorizontalRounded className="text-2xl text-[#64748B]" />
          </button>

          {!isOpen && (
            <div className="absolute top-9 hidden group-hover:block bg-neutral-700 text-white text-xs px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap ">
              More
            </div>
          )}
        </div>

        {isOpen && (
          <form
            action={formAction}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute right-0 top-9 w-40 bg-neutral-900 flex-col items-center justify-center border border-neutral-800 rounded-lg shadow-xl py-1 text-sm text-white"
          >
            <input name="postId" className="hidden" defaultValue={postId} />
            <ul className="w-full">
              {currentUserId === postUserId && (
                <li>
                  <button type="submit" disabled={isPending} className="...">
                    {isPending ? "Deleting..." : "Delete post"}
                  </button>
                </li>
              )}
            </ul>
          </form>
        )}
      </div>
    </>
  );
}
