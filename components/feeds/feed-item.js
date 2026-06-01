import Image from "next/image";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import LikeButton from "../like-button";
import Link from "next/link";
import MenuButton from "../ui/feedItem/menu-button";
import FeedItemWrapper from "../ui/feedItem/feed-item-wrapper";
import ProfileLinkText from "./profile-link-text";
import ProfileLinkAvatar from "./profile-link-avatar";

export default function FeedItem({
  id,
  name,
  username,
  avatar,
  content,
  image,
  created_at,
  like_count,
  currentUserId,
  user_id,
}) {
  return (
    <FeedItemWrapper id={id}>
      <div>
        <div className="m-4 border rounded-xl border-neutral-800 relative">
          <MenuButton
            postId={id}
            currentUserId={currentUserId}
            postUserId={user_id}
          />
          <div className="p-4 grid grid-cols-[60px_1fr]">
            <ProfileLinkAvatar
              avatar={avatar}
              name={name}
              username={username}
            />
            <div>
              <ProfileLinkText
                created_at={created_at}
                name={name}
                username={username}
              />
              <Link href={`/post/${id}`}>
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
              </Link>
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
      </div>
    </FeedItemWrapper>
  );
}
