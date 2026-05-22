import FeedItem from "./feed-item";
import FeedHeader from "./feedHeader";

export default function FeedsGrid({ feeds }) {
  return (
    <>
      <FeedHeader />
      <ul className="grid grid-rows-1">
        {feeds.map((feed) => (
          <li key={feed.id}>
            <FeedItem {...feed} />
          </li>
        ))}
      </ul>
    </>
  );
}
