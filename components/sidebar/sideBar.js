import Link from "next/link";
import { PiPulseBold } from "react-icons/pi";
import { BiHomeAlt } from "react-icons/bi";
import {
  IoSearch,
  IoNotificationsOutline,
  IoCreateOutline,
} from "react-icons/io5";
import { TbMessageMinus } from "react-icons/tb";
import { CiBookmark } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { logout } from "@/app/actions";

export default function SideBar({ user }) {
  return (
    <aside className="sticky top-0 h-screen sm:w-32 xl:w-64 flex flex-col items-center xl:items-start p-2 xl:pr-4 border-r border-neutral-800">
      <div className="p-3 font-bold block md:flex gap-2 items-center">
        <PiPulseBold className="h-9 w-9 md:h-7 md:w-7 text-[#4F7CFF]" />
        <h1 className="text-2xl text-white hidden xl:block">PulseFeed</h1>
      </div>

      <nav className="flex flex-col gap-y-2 w-full mt-4 items-center">
        <Link
          href="/"
          className="flex items-center gap-x-4 p-3 hover:bg-[#212f5b75] rounded-full w-fit xl:w-full transition active:text-[#4F7CFF]"
        >
          <span className="text-xl">
            <BiHomeAlt />
          </span>
          <span className="hidden xl:inline font-medium">Home</span>
        </Link>
        <Link
          href="/explore"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">
            <IoSearch />
          </span>
          <span className="hidden xl:inline font-medium">Explore</span>
        </Link>
        <Link
          href="/notifications"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">
            <IoNotificationsOutline />
          </span>
          <span className="hidden xl:inline font-medium">Notifications</span>
        </Link>
        <Link
          href="/messages"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">
            <TbMessageMinus />
          </span>
          <span className="hidden xl:inline font-medium">Messages</span>
        </Link>
        <Link
          href="/bookmarks"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">
            <CiBookmark />
          </span>
          <span className="hidden xl:inline font-medium">Bookmarks</span>
        </Link>
        <Link
          href={user ? `/profile/${user.username}` : "/login"}
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">
            <CgProfile />
          </span>
          <span className="hidden xl:inline font-medium">Profile</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 bg-[#4F7CFF] rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">
            <IoCreateOutline />
          </span>
          <span className="hidden xl:inline font-medium">+ Create Post</span>
        </Link>

        {/* user info at bottom */}
        {user && (
          <div className="mt-auto p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold text-sm">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden xl:flex xl:flex-col">
              <p className="text-white text-sm font-bold">{user.name}</p>
              <p className="text-[#64748B] text-xs">@{user.username}</p>
            </div>
            <form action={logout} className="hidden xl:block ml-auto">
              <button
                type="submit"
                className="text-xs text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </form>
          </div>
        )}
        {!user && <p>No fucking user</p>}
      </nav>
    </aside>
  );
}
