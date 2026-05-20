"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function LikeButton() {
  const [likes, setLikes] = useState(12);
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
    <div className="flex gap-1 items-center">
      <button onClick={handleLikeChange}>
        <FaHeart className={`w-5 h-5 ${isLiked ? "text-pink-700" : ""}`} />{" "}
      </button>
      <p className={`text-sm w-5 h-5 ${isLiked ? "text-pink-700" : ""}`}>
        {likes}
      </p>
    </div>
  );
}
