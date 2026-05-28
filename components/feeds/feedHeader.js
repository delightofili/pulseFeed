"use client";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useTheme } from "@/lib/context/theme-context";

export default function FeedHeader() {
  const { theme, toogleTheme } = useTheme();
  return (
    <header className="px-4 py-3 flex items-center justify-between sticky top-0 bg-[#071029] dark:bg-[#000208]  backdrop-blur-md z-30 border-b border-neutral-800">
      <h1 className="text-xl font-bold text-white">Home</h1>
      <div className="flex gap-3 items-center">
        <button
          className="p-2 hover:bg-neutral-800 rounded-full transition"
          onClick={toogleTheme}
        >
          {theme === "dark" ? (
            <MdOutlineDarkMode className="w-5 h-5 text-white" />
          ) : (
            <MdOutlineLightMode className="w-5 h-5 text-white" />
          )}
        </button>
        <button className="p-2 hover:bg-neutral-800 rounded-full transition">
          <CgProfile className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  );
}
