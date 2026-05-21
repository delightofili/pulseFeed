import { getFeeds } from "@/lib/db";

import FeedsGrid from "./feeds-grid";

function Feeds() {
  const feeds = getFeeds();
  return <FeedsGrid feeds={feeds} />;
}
export default async function FeedPosts() {
  return <Feeds />;
}
