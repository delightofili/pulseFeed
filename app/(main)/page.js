import AddPost from "@/components/feeds/add-post";
import Feeds from "@/components/feeds/feed";
import FeedHeader from "@/components/feeds/feedHeader";
import { getCurrentUser } from "@/lib/auth";

export default async function Home({ searchParams }) {
  const { tab } = await searchParams;
  const user = getCurrentUser();
  return (
    <div>
      <FeedHeader />
      <AddPost user={user} />
      <Feeds />
    </div>
  );
}
