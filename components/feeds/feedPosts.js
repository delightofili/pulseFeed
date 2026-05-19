import { getFeeds } from "@/lib/db";

import FeedsGrid from "./feeds-grid";

async function Feeds() {
  const feeds = await getFeeds();
  return <FeedsGrid feeds={feeds} />;
}
export default async function FeedPosts() {
  return <Feeds />;
}
