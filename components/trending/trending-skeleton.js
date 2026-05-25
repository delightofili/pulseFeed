export default function TrendingSkeleton() {
  return (
    <div className="p-4 flex flex-col gap-4 animate-pulse">
      <div className="h-4 bg-neutral-800 rounded w-1/2" />
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="h-3 bg-neutral-800 rounded w-1/3" />
          <div className="h-3 bg-neutral-800 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}
