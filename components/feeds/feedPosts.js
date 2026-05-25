import FeedsGrid from "./feeds-grid";
import { getCachedPosts } from "@/lib/queries";

export default async function FeedPosts({ tab }) {
  const posts = await getCachedPosts();
  return <FeedsGrid feeds={posts} tab={tab} />;
}
