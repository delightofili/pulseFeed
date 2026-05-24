import Modal from "@/components/ui/modal";
import { getFeed } from "@/lib/db";

export default async function PostModal({ params }) {
  const { slug } = await params;
  const post = getFeed(slug);

  return (
    <Modal>
      <h2>{post.author}</h2>
      <p>{post.content}</p>
    </Modal>
  );
}
