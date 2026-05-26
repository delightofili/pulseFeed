import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

export const metadata = {
  metadataBase: new URL("https://pulsefeed.vercel.app"),
  title: {
    default: "PulseFeed",
    template: "%s | PulseFeed",
  },
  description:
    "PulseFeed is a microblogging platform built with Next.js, offering a seamless and engaging experience for sharing thoughts, news, and updates in real-time.",
  keywords: [
    "social media",
    "nigerian social media",
    "twitter alternative",
    "microblogging",
  ],
  authors: [{ name: "Delightsome" }],
  creator: "Delightsome Ofili",

  //OpenGraph - controls how links look when shared on social media

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://pulsefeed.vercel.app",
    siteName: "PulseFeed",
    title: "PulseFeed",
    description: "Share your pulse with the world",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PulseFeed",
      },
    ],
  },

  //Twitter card -control how links looks on twitter

  twitter: {
    card: "summary_large_image",
    title: "PulseFeed",
    description: "Share your pulse with the world",
    images: ["/og-image.png"],
  },

  //robots - tell search engines what to index

  robots: {
    index: true,
    follow: true,
  },
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body
        className={`bg-[#071029] text-neutral-100 min-h-screen ${jakarta.className}`}
      >
        {children}
      </body>
    </html>
  );
}
