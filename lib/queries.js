import { unstable_cache } from "next/cache";
import { getPosts, getPostById, getComments, getNotifications } from "@/lib/db";

export const getCachedPosts = unstable_cache(
  async () => {
    await new Promise((r) => setTimeout(r, 2000));
    return getPosts();
  },
  ["posts"],
  { tags: ["posts"], revalidate: 60 },
);

export const getCachedPost = unstable_cache(
  async (id) => getPostById(id),
  ["post"],
  { tags: ["posts"], revalidate: 60 },
);

export const getCachedComments = unstable_cache(
  async (postId) => getComments(postId),
  ["comments"],
  { tags: ["comments"], revalidate: 30 },
);

export const getCachedNotifications = unstable_cache(
  async (userId) => getNotifications(userId),
  ["notifications"],
  { tags: ["notifications"], revalidate: 30 },
);
