"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function PostHeader() {
  const router = useRouter();
  return (
    <div className="px-4 py-3 flex items-center justify-start sticky top-0 bg-[#071029]/90 backdrop-blur-md z-30 border-b border-neutral-800 gap-5">
      <div
        onClick={() => router.back()}
        className="hover:bg-[#212f5b75] p-2 rounded-full hover:cursor-pointer"
      >
        <FaArrowLeft />
      </div>
      <p className="text-white font-bold">Post</p>
    </div>
  );
}
