import FeedHeader from "./feedHeader";

export default function FeedPosts() {
  return (
    <main class="border-r border-neutral-800 min-h-screen max-w-150 w-full">
      <FeedHeader />

      <div class="divide-y divide-neutral-800">
        <div class="p-4 flex gap-x-3">
          <div class="w-10 h-10 rounded-full bg-emerald-600 shrink-0"></div>
          <div>
            <div class="flex gap-x-2 text-sm text-neutral-400">
              <span class="font-bold text-neutral-100">DevNotes</span>
              <span>@devnotes</span>
              <span>· 2h</span>
            </div>
            <p class="mt-1 text-neutral-200">
              Building UI layouts with Tailwind CSS grid is incredibly
              satisfying once the breakpoints click into place. Dark mode +
              green accents = perfection. 🚀
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
