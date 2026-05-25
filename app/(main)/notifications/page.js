import { getCurrentUser } from "@/lib/auth";
import { getNotifications } from "@/lib/db";

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  const notifications = getNotifications(user.id);
  return (
    <div className="w-full min-h-screen border-r border-neutral-800">
      {/* HEADER SECTION HEADER FILTER CONTROLS */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-[#071029]/80 border-b border-neutral-800 p-4">
        <h1 className="font-bold text-xl text-neutral-100 tracking-tight">
          Notifications
        </h1>

        {/* SUB NAVIGATION TAB CHOICES */}
        <div className="flex mt-4 text-sm font-semibold text-neutral-400 border-t border-neutral-800/40 pt-2">
          <div className="flex-1 text-center text-emerald-400 border-b-2 border-emerald-400 pb-2 cursor-pointer">
            All Activities
          </div>
          <div className="flex-1 text-center hover:text-neutral-200 pb-2 cursor-pointer transition">
            Mentions
          </div>
        </div>
      </header>

      {/* NOTIFICATION FEED BODY CONTENT CARDS */}
      <div className="divide-y divide-neutral-800/60">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="p-4 flex gap-x-4 hover:bg-neutral-900/20 transition cursor-pointer"
          >
            {/* TYPE IDENTIFIER ICON BOUNDARIES */}
            {/* <span className="text-xl shrink-0 select-none pt-0.5">
              {item.icon}
            </span> */}

            {/* CONTAINER META AND ATTACHED CONTENT BLOCKS */}
            <div className="space-y-1 w-full">
              <div className="text-sm text-neutral-300">
                <span className="font-bold text-neutral-100 mr-1">
                  {item.name} {item.type}d your post
                </span>
                {/*  <span className="text-neutral-400 mr-1">{item.username}</span> */}
                {/*  <span className="text-neutral-400">{item.meta}</span> */}
              </div>

              {/* POST CARD DATA TARGET SUMMARIES */}
              <p className="text-sm text-neutral-400 bg-neutral-950/30 border border-neutral-800/40 rounded-xl p-3 mt-2 font-medium max-w-lg leading-relaxed">
                {/*  {item.body} */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
