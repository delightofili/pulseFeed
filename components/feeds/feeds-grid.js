import FeedItem from "./feed-item";

export default function FeedsGrid({ feeds, currentUserId }) {
  if (!feeds || feeds.length === 0) {
    return (
      <p className="text-neutral-500 text-center p-8">
        No posts yet. Be the first to post.
      </p>
    );
  }
  return (
    <>
      <ul className="grid grid-rows-1">
        {feeds.map((feed) => (
          <li key={feed.id}>
            <FeedItem {...feed} currentUserId={currentUserId} />
          </li>
        ))}
      </ul>
    </>
  );
}
