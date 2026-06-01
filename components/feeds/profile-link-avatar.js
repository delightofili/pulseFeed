import Image from "next/image";
import Link from "next/link";

export default function ProfileLinkAvatar({ avatar, name, username }) {
  return (
    <Link href={`/profile/${username}`}>
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
    </Link>
  );
}
