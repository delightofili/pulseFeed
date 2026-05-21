import SplashScreen from "@/components/ui/splash-screen";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import SideBar from "@/components/sidebar/sideBar";
import TrendingSection from "@/components/trending/trending";

export const metadata = {
  title: "PulseFeed",
  description: "Social Media App",
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-[#071029] text-neutral-100 min-h-screen ${jakarta.className}`}
      >
        <SplashScreen>
          <div className="min-h-screen  grid grid-cols-[120px_1fr] md:grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_340px]  xl:grid-cols-[275px_600px_350px] justify-center gap-x-2 px-2 sm:px-4">
            <SideBar />
            <main className="w-full">{children}</main>
            <TrendingSection />
          </div>
        </SplashScreen>
      </body>
    </html>
  );
}
