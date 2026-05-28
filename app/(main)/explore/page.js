export const revalidate = 300; // rebuild every 5 minutes

import { getPosts } from "@/lib/db";
import FeedsGrid from "@/components/feeds/feeds-grid";
import FeedHeader from "@/components/feeds/feedHeader";

export default async function ExplorePage() {
  const posts = getPosts(); // all posts, no user filter

  return (
    <div>
      <FeedHeader />
      <FeedsGrid feeds={posts} />
    </div>
  );
}
