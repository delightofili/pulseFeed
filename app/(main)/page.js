import AddPost from "@/components/feeds/add-post";

import FeedSkeleton from "@/components/feeds/feed-skeleton";
import FeedHeader from "@/components/feeds/feedHeader";
import FeedPosts from "@/components/feeds/feedPosts";
import { getCurrentUser } from "@/lib/auth";
import { Suspense } from "react";

export default async function Home({ searchParams }) {
  const { tab } = await searchParams;

  const user = await getCurrentUser();
  return (
    <div>
      <FeedHeader />
      <AddPost user={user} />
      <Suspense fallback={<FeedSkeleton />}>
        <FeedPosts tab={tab} />
      </Suspense>
    </div>
  );
}
