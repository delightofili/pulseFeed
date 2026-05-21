"use client";

export default function GlobalError({ error, unstable_retry }) {
  return (
    <html>
      <body>
        <h1>Something went wrong!</h1>
        <button onClick={() => unstable_retry()}>Try again</button>
      </body>
    </html>
  );
}
