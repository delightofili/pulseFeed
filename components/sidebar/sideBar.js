import Link from "next/link";
import { PiPulseBold } from "react-icons/pi";
import { BiHomeAlt } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbMessageMinus } from "react-icons/tb";
import { CiBookmark } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoCreateOutline } from "react-icons/io5";

export default function SideBar() {
  return (
    <aside className="sticky top-0 h-screen sm:w-32 xl:w-64 flex flex-col items-center xl:items-start p-2 xl:pr-4  border-r border-neutral-800">
      <div className="p-3 font-bold block md:flex gap-2 items-center">
        <PiPulseBold className=" h-9 w-9 md:h-7 md:w-7  text-[#4F7CFF]" />
        <h1 className="text-2xl text-white hidden xl:block">PulseFeed</h1>
      </div>

      <nav className="flex flex-col gap-y-2 w-full mt-4 items-center ">
        <Link
          href="/"
          className="flex items-center gap-x-4 p-3 hover:bg-[#212f5b75] rounded-full w-fit xl:w-full transition active:text-[#4F7CFF]"
        >
          <span className="text-xl">
            <BiHomeAlt className="hover:text-[#4F7CFF]" />
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
          href="/test/feed"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">
            <IoNotificationsOutline />
          </span>
          <span className="hidden xl:inline font-medium">Notifications</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">
            <TbMessageMinus />
          </span>
          <span className="hidden xl:inline font-medium">Messages</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">
            <CiBookmark />
          </span>
          <span className="hidden xl:inline font-medium">Bookmarks</span>
        </Link>
        <Link
          href="/omo"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">
            <CgProfile />
          </span>
          <span className="hidden xl:inline font-medium">Profile</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 bg-[#4F7CFF] rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">
            <IoCreateOutline />
          </span>
          <span className="hidden xl:inline font-medium">+ Create Post</span>
        </Link>
      </nav>
    </aside>
  );
}
