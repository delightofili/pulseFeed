"use client";

import { useRouter } from "next/router";

export default function FeedModal({ feed }) {
  const router = useRouter();

  const handleBackClick = (e) => {
    if (e.target === e.currentTarget) {
      router.back();
    }
  };
  return (
    <div
      onClick={handleBackClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 backdrop-blur-md p-4 cursor-pointer"
    ></div>
  );
}
