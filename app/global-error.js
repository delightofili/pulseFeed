"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="bg-[#071029] flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4 text-center p-8">
          <h1 className="text-white text-4xl font-bold">PulseFeed is down</h1>
          <p className="text-neutral-400 max-w-md">
            Something went seriously wrong. We are working on it.
          </p>
          <button
            onClick={reset}
            className="bg-[#4F7CFF] text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
