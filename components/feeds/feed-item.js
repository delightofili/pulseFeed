import Image from "next/image";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import LikeButton from "../like-button";
import Link from "next/link";

export default function FeedItem({
  id,
  name,
  username,
  avatar,
  content,
  image,
  created_at,
  like_count,
}) {
  return (
    <Link href={`/post/${id}`}>
      <div className="m-4 border rounded-xl border-neutral-800 relative">
        <div className="absolute right-4 top-2">
          <BiDotsHorizontalRounded className="text-2xl text-[#64748B]" />
        </div>
        <div className="p-4 grid grid-cols-[60px_1fr]">
          <div>
            {avatar ? (
              <Image
                src={avatar}
                alt={name}
                width={40}
                height={40}
                priority
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold">
                {name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <h1 className="font-bold text-white">{name}</h1>
              <p className="text-[#64748B] text-[12px]">
                @{username} · {created_at}
              </p>
            </div>
            <div className="py-3 w-[75%]">
              <p className="text-white">{content}</p>
            </div>
            {image && (
              <Image
                src={image}
                alt="post image"
                width={900}
                height={900}
                priority
                className="w-full h-36 object-cover rounded-xl"
              />
            )}
            <div className="grid grid-cols-4 items-center text-center pt-3 w-[90%] text-[#64748B]">
              <div className="flex gap-1 items-center">
                <FaRegComment />
                <p className="text-sm">0</p>
              </div>
              <div className="flex gap-1 items-center">
                <BiRepost className="w-6 h-6" />
                <p className="text-sm">0</p>
              </div>
              <LikeButton postId={id} initialLikes={like_count} />
              <div>
                <CiBookmark className="w-6 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
