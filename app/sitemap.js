import { getPosts } from "@/lib/db";

export default function sitemap() {
  const posts = getPosts();

  const postUrls = posts.map((post) => ({
    url: `https://pulsefeed.vercel.app/post/${post.id}`,
    lastModified: new Date(post.created_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://pulsefeed.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://pulsefeed.vercel.app/explore",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...postUrls,
  ];
}
