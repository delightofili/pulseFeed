import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

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
        {children}
      </body>
    </html>
  );
}
