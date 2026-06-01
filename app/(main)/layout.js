import SplashScreen from "@/components/ui/splash-screen";

import SideBar from "@/components/sidebar/sideBar";
import TrendingSection from "@/components/trending/trending";
import TrendingSkeleton from "@/components/trending/trending-skeleton";
import { getCurrentUser } from "@/lib/auth";
import { Suspense } from "react";
import { NotificationProvider } from "@/lib/context/notification-context";
import { getNotifications, getUnreadCount } from "@/lib/db";
import NotificationListener from "@/components/notifications/notification-listener";

export const dynamic = "force-dynamic";

export default async function MainLayout({ children, modal }) {
  const user = await getCurrentUser();
  const unreadCount = user ? getUnreadCount(user.id) : 0;
  return (
    <SplashScreen>
      <NotificationProvider initialNotifications={[]}>
        <NotificationListener />
        <div className="min-h-screen bg-[#071029] dark:bg-[#000208]  grid grid-cols-[120px_1fr] md:grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_340px]  xl:grid-cols-[275px_600px_350px] justify-center gap-x-2 px-2 sm:px-4">
          <SideBar user={user} unreadCount={unreadCount} />
          <main className="w-full">{children}</main>
          {modal}
          <Suspense fallback={<TrendingSkeleton />}>
            <TrendingSection />
          </Suspense>
        </div>
      </NotificationProvider>
    </SplashScreen>
  );
}
