"use client";

import { likePost } from "@/app/actions";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function LikeButton({ slug, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeChange() {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  }

  return (
    <form
      action={likePost}
      className="flex gap-1 items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <button value={slug} type="submit" name="slug" onClick={handleLikeChange}>
        <FaHeart className={`w-5 h-5 ${isLiked ? "text-pink-700" : ""}`} />{" "}
      </button>
      <p className={`text-sm w-5 h-5 ${isLiked ? "text-pink-700" : ""}`}>
        {likes}
      </p>
    </form>
  );
}
