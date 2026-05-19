import Feeds from "@/components/feeds/feed";
import SideBar from "@/components/sidebar/sideBar";
import TrendingSection from "@/components/trending/trending";

export default function Home() {
  return (
    <div class="min-h-screen bg-[#020817] text-neutral-100 grid grid-cols-1 md:grid-cols-[80px_1fr] xl:grid-cols-[275px_600px_350px] justify-center gap-x-2 px-2 sm:px-4">
      <SideBar />
      <Feeds />
      <TrendingSection />
    </div>
  );
}
