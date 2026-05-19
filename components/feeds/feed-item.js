import Image from "next/image";
import FeedHeader from "./feedHeader";

export default function FeedItem({
  author,
  content,
  profileimage,
  postimage,
  created_at,
}) {
  if (!postimage) {
    return null;
  }
  return (
    /* card */
    <div className="m-4">
      <div className="p-4">
        <div>
          <Image
            src={profileimage}
            alt="User avatar"
            width={40} // 40px matches Tailwind's w-10
            height={40} // 40px matches Tailwind's h-10
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div>
          <div>
            <h1>{author}</h1>
            <p>@{author} .</p>
          </div>
          <div>
            <p>{content}</p>
          </div>
          <div>
            <Image
              src={postimage}
              alt="User avatar"
              width={900}
              height={900}
              className="w-full border-md object-cover"
            />
          </div>
          <div className="flex gap-6">
            <button>c</button>
            <button>c</button>
            <button>c</button>
            <button>c</button>
          </div>
        </div>
      </div>
    </div>
  );
}
