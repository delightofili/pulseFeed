import { getUserById } from "@/lib/db";

export async function generateMetadata({ params }) {
  const { username } = await params;
  const user = getUserByUsername(username);

  if (!user) return { title: "User not found" };

  return {
    title: `${user.name} (@${user.username})`,
    description: user.bio || `Check out ${user.name}'s profile on PulseFeed`,
    openGraph: {
      title: `${user.name} (@${user.username}) on PulseFeed`,
      description: user.bio || `Follow ${user.name} on PulseFeed`,
      images: user.avatar ? [{ url: user.avatar }] : ["/og-image.png"],
    },
  };
}

export default async function profilePage({ params }) {
  const { username } = await params;
  const user = getUserById(username);
  return (
    <div>
      <h1>Profile Page of {user.name}</h1>
    </div>
  );
}
