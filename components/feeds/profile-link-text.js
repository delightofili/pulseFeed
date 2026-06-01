import Link from "next/link";

export default async function ProfileLinkText({ username, name, created_at }) {
  return (
    <Link href={`/profile/${username}`}>
      <div className="flex items-center gap-x-2">
        <h1 className="font-bold text-white">{name}</h1>
        <p className="text-[#64748B] text-[12px]">
          @{username} · {created_at}
        </p>
      </div>
    </Link>
  );
}
