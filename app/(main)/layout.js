//import SplashScreen from "@/components/ui/splash-screen";

import SideBar from "@/components/sidebar/sideBar";
import TrendingSection from "@/components/trending/trending";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function MainLayout({ children, modal }) {
  let user = null;
  try {
    user = await getCurrentUser();
  } catch {
    user = null;
  }
  return (
    <div className="min-h-screen bg-[#071029]  grid grid-cols-[120px_1fr] md:grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_340px]  xl:grid-cols-[275px_600px_350px] justify-center gap-x-2 px-2 sm:px-4">
      <SideBar user={user} />
      <main className="w-full">{children}</main>
      {modal}
      <TrendingSection />
    </div>
  );
}
