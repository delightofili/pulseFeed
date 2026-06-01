This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<!--
in polling. explain the API route the whole route.js, what is this for like where is the count coming from  NextResponse.json({ count: 0 }). explian this too const count = getUnreadCount(session.userId). infact explain the polling... like why we removed previous code,  and what we replaced them with.





concerning  SSE, explian the new Map(), first time seeing it. also, first time seeing new Response, explain this line of code if (!token) return new Response('Unauthorized', { status: 401 }). infact explain the stream route, so many codes i am new to . what's the diffrent between JSON and json. explain this `data: ${JSON.stringify({ type: 'notification', notification })}\n\n`. and enqueue cover it when explaing the whole API in whole. also explain this
  // create notification in db
  const post = getPostById(postId)
  if (post && post.user_id !== user.id) {
    createNotification({
      userId: post.user_id,
      actorId: user.id,
      type: 'like',
      postId: Number(postId)
    })

    // push real-time notification to post owner
    pushNotification(post.user_id, {
      type: 'like',
      actorName: user.name,
      postId
    })
  }

  revalidateTag('posts')
  return result
}

also explain the notification listener code line by line.

why did we add <NotificationListener/> to the layout.

also, explain the messages database. also explain the getMessages. like explain word to word how if connects, the syntax of the getMessages is kinda confusing. also the sendMessages function AND the getconverstion. code line by line, explain throughly and why we use them. also explain the messageThread's useeffect codes.

also explain the messages route, line by line


 -->
