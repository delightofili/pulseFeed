import { getUserPosts } from "@/lib/db";
import FeedsGrid from "./feeds-grid";

export default async function UsersFeed({ profileUserId, currentUserId }) {
  const posts = getUserPosts(profileUserId);

  return <FeedsGrid feeds={posts} currentUserId={currentUserId} />;
}
