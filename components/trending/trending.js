export default function TrendingSection() {
  return (
    <aside className="hidden xl:block sticky top-0 h-screen p-4 w-[350px]">
      <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
        <h2 className="font-bold text-xl mb-3">Whats happening</h2>
        <div className="space-y-4">
          <div>
            <span className="text-xs text-neutral-500">Trending in Tech</span>
            <p className="font-bold text-sm">Next.js App Router</p>
            <span className="text-xs text-neutral-500">24.5K Posts</span>
          </div>
          <div>
            <span className="text-xs text-neutral-500">Trending in Web</span>
            <p className="font-bold text-sm">Tailwind v4.0</p>
            <span className="text-xs text-neutral-500">12.2K Posts</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
