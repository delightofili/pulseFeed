import { useRouter } from "next/navigation";

export default function MessageButton({ userId }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/messages/${userId}`)}
      className="border border-neutral-600 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-neutral-800 transition"
    >
      Message
    </button>
  );
}
