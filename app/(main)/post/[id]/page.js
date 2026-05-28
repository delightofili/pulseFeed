import { getPostById, getComments, getPosts } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";

import Image from "next/image";

import { FaRegComment } from "react-icons/fa";

import { BiRepost } from "react-icons/bi";

import { CiBookmark } from "react-icons/ci";
import LikeButton from "@/components/like-button";
import CommentForm from "@/components/feeds/CommentForm";
import { getCachedComments, getCachedPost } from "@/lib/queries";
import PostHeader from "@/components/ui/post-header";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: `${post.name}: "${post.content.slice(0, 50)}..."`,
    description: post.content.slice(0, 160),
    openGraph: {
      title: `${post.name} on PulseFeed`,
      description: post.content.slice(0, 160),
      type: "article",
      authors: [post.name],
      images: post.image
        ? [
            {
              url: post.image,
              width: 900,
              height: 600,
              alt: `Post by ${post.name}`,
            },
          ]
        : ["/og-image.png"],
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: `${post.name} on PulseFeed`,
      description: post.content.slice(0, 160),
      images: post.image ? [post.image] : ["/og-image.png"],
    },
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.slice(0, 10).map((post) => ({
    id: String(post.id),
  }));
}
export default async function SinglePostPage({ params }) {
  const { id } = await params;
  const [post, comments] = await Promise.all([
    getCachedPost(id),
    getCachedComments(id),
  ]);

  if (!post) notFound();

  return (
    <>
      <PostHeader />
      <div className="m-4 border rounded-xl border-neutral-800">
        {/* post header */}
        <div className="p-4 grid grid-cols-[60px_1fr]">
          <div>
            {post.avatar && (
              <Image
                src={post.avatar}
                alt={post.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <h1 className="font-bold text-white">{post.name}</h1>
              <p className="text-[#64748B] text-[12px]">
                @{post.username} · {post.created_at}
              </p>
            </div>
            <div className="py-3">
              <p className="text-white">{post.content}</p>
            </div>
            {post.image && (
              <Image
                src={post.image}
                alt="post image"
                width={900}
                height={900}
                className="w-full object-cover rounded-xl"
              />
            )}

            {/* actions */}
            <div className="grid grid-cols-4 items-center text-center pt-3 w-[90%] text-[#64748B]">
              <div className="flex gap-1 items-center">
                <FaRegComment />
                <p className="text-sm">{comments.length}</p>
              </div>
              <div className="flex gap-1 items-center">
                <BiRepost className="w-6 h-6" />
                <p className="text-sm">0</p>
              </div>
              <LikeButton postId={post.id} initialLikes={post.like_count} />
              <div>
                <CiBookmark className="w-6 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* comments section */}
        <div className="border-t border-neutral-800 p-4">
          <h2 className="text-white font-bold mb-4">Comments</h2>

          {/* comment form */}
          <CommentForm postId={post.id} />

          {/* comments list */}
          <div className="flex flex-col gap-4 mt-6">
            {comments.length === 0 && (
              <p className="text-[#64748B] text-sm">
                No comments yet. Be the first.
              </p>
            )}
            {comments.map((comment) => (
              <div key={comment.id} className="grid grid-cols-[40px_1fr] gap-2">
                <div>
                  {comment.avatar && (
                    <Image
                      src={comment.avatar}
                      alt={comment.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold text-sm">
                      {comment.name}
                    </p>
                    <p className="text-[#64748B] text-xs">
                      @{comment.username}
                    </p>
                  </div>
                  <p className="text-white text-sm mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
