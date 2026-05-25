import Modal from "@/components/ui/modal";
import { getPostById } from "@/lib/db";

export default async function PostModal({ params }) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) return null;

  return (
    <Modal>
      <h2 className="text-white font-bold">{post.name}</h2>
      <p className="text-white mt-2">{post.content}</p>
    </Modal>
  );
}
