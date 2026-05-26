export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/settings/", "/messages/"],
      },
    ],
    sitemap: "https://pulsefeed.vercel.app/sitemap.xml",
  };
}
