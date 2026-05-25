export default function FeedSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border border-neutral-800 rounded-xl p-4 animate-pulse"
        >
          <div className="flex gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-neutral-800" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-3 bg-neutral-800 rounded w-1/4" />
              <div className="h-3 bg-neutral-800 rounded w-1/3" />
            </div>
          </div>
          <div className="h-4 bg-neutral-800 rounded w-3/4 mb-2" />
          <div className="h-4 bg-neutral-800 rounded w-1/2" />
          <div className="h-36 bg-neutral-800 rounded-xl mt-3" />
        </div>
      ))}
    </div>
  );
}
