import Modal from "@/components/ui/modal";
import { getCachedPost } from "@/lib/queries";

export const revalidate = 60;
export default async function PostModal({ params }) {
  const { id } = await params;
  const post = await getCachedPost(id);

  if (!post) return null;

  return (
    <Modal>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold">
          {post.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-white font-bold text-sm">{post.name}</p>
          <p className="text-neutral-500 text-xs">@{post.username}</p>
        </div>
      </div>
      <p className="text-white">{post.content}</p>
      {post.like_count > 0 && (
        <p className="text-neutral-500 text-sm mt-4">{post.like_count} likes</p>
      )}
    </Modal>
  );
}
