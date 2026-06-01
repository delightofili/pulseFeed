import { getUserByUsername } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";

import UsersFeed from "@/components/feeds/users-feed";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { username } = await params;
  const user = getUserByUsername(username);
  if (!user) return { title: "User not found" };

  return {
    title: `${user.name} (@${user.username})`,
    description: user.bio || `Check out ${user.name}'s profile on PulseFeed`,
    openGraph: {
      title: `${user.name} (@${user.username}) on PulseFeed`,
      description: user.bio || `Follow ${user.name} on PulseFeed`,
      images: user.avatar ? [{ url: user.avatar }] : ["/og-image.png"],
    },
  };
}

export default async function ProfilePage({ params }) {
  const { username } = await params;
  const user = getUserByUsername(username);
  const currentUser = await getCurrentUser();

  if (!user) notFound();

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div>
      {/* header */}
      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="w-16 h-16 rounded-full bg-neutral-700 flex items-center justify-center text-white text-2xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          {isOwnProfile ? (
            <button className="border border-neutral-600 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-neutral-800 transition">
              Edit profile
            </button>
          ) : (
            <div className="flex gap-4 items-center">
              <Link
                href={`/messages/${user?.id}`}
                className="bg-[#4F7CFF] text-white cursor-pointer px-4 py-1.5 rounded-full text-sm font-bold hover:bg-[#4F7CFF]/70 transition"
              >
                Message
              </Link>
              <button className="bg-white text-black cursor-pointer px-4 py-1.5 rounded-full text-sm font-bold hover:bg-neutral-200 transition">
                Follow
              </button>
            </div>
          )}
        </div>
        <div className="mt-3">
          <p className="text-white font-bold text-lg">{user.name}</p>
          <p className="text-neutral-500 text-sm">@{user.username}</p>
          {user.bio && <p className="text-white text-sm mt-2">{user.bio}</p>}
          <p className="text-neutral-500 text-xs mt-2">
            Joined{" "}
            {new Date(user.created_at).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <UsersFeed profileUserId={user.id} currentUserId={currentUser?.id} />
    </div>
  );
}
