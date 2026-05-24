import AddPost from "@/components/feeds/add-post";
import Feeds from "@/components/feeds/feed";
import FeedHeader from "@/components/feeds/feedHeader";

export default async function Home({ searchParams }) {
  const { tab } = await searchParams;
  return (
    <div>
      <FeedHeader />
      <h2>{tab === "following" ? "Following" : "for you"}</h2>
      <AddPost />
      <Feeds />
    </div>
  );
}
