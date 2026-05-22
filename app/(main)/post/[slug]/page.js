import { getFeed } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";

import { CiBookmark } from "react-icons/ci";
import LikeButton from "../../../../components/like-button";
import FeedHeader from "@/components/feeds/feedHeader";
import FeedModal from "@/components/feed/feed-modal";
import Link from "next/link";

export default async function SingleFeedPage({ params }) {
  const { slug } = await params;

  const Feed = getFeed(slug);

  // const feed = getFeed(params.slug)

  if (!Feed) {
    notFound();
  }

  return (
    <>
      <FeedHeader />
      <Link
        href={"/"}
        className="fixed w-screen h-screen z-20 flex items-center justify-center  backdrop-blur-md p-4 cursor-pointer"
      />
      <div className="m-4 border rounded-xl border-neutral-800 relative z-30">
        <div className="absolute right-4 top-2">
          <BiDotsHorizontalRounded className="text-2xl text-[#64748B]" />
        </div>
        <div className="p-4 grid grid-cols-[60px_1fr]">
          <div className="">
            <Image
              src={Feed.profileimage}
              alt="User avatar"
              width={40} // 40px matches Tailwind's w-10
              height={40} // 40px matches Tailwind's h-10
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center text-center gap-x-2">
              <h1 className="font-bold">{Feed.author}</h1>
              <p className="text-[#64748B] text-[12px] ">
                @{Feed.author} . {Feed.created_at}
              </p>
            </div>
            <div className="py-3 w-[75%]">
              <p>{Feed.content}</p>
            </div>
            <div className="">
              <Image
                src={Feed.postimage}
                alt="User avatar"
                width={900}
                height={900}
                className="w-full  border-md object-cover rounded-xl"
              />
            </div>
            <div className="grid grid-cols-4 items-center text-center pt-3 w-[90%] text-[#64748B]">
              <div className="flex gap-1 items-center">
                <FaRegComment /> <p className="text-sm">12</p>
              </div>
              <div className="flex gap-1 items-center">
                <BiRepost className="w-6 h-6" /> <p className="text-sm">12</p>
              </div>

              <LikeButton />

              <div className="">
                <CiBookmark className="w-6 h-5" />
              </div>
            </div>
            <div className=" flex flex-col">
              <p className="text-2xl text-white">Comentsssss section</p>
              <p className="text-2xl text-white">Comentsssss section</p>
              <p className="text-2xl text-white">Comentsssss section</p>
              <p className="text-2xl text-white">Comentsssss section</p>
              <p className="text-2xl text-white">Comentsssss section</p>
              <p className="text-2xl text-white">Comentsssss section</p>
              <p className="text-2xl text-white">Comentsssss section</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
