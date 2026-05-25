import { getPosts } from "@/lib/db";
import FeedsGrid from "./feeds-grid";

export default async function FeedPosts() {
  const posts = getPosts();
  return <FeedsGrid feeds={posts} />;
}
