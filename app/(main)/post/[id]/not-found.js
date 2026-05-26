import Link from "next/link";

export default function PostNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4">
      <h2 className="text-white text-2xl font-bold">Post not found</h2>
      <p className="text-neutral-400 text-sm">
        This post may have been deleted or never existed.
      </p>
      <Link
        href="/"
        className="bg-[#4F7CFF] text-white px-6 py-2 rounded-full text-sm hover:bg-blue-600 transition"
      >
        Back to feed
      </Link>
    </div>
  );
}
