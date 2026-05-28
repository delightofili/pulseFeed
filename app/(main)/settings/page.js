export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div>
      <h1 className="text-white text-xl font-bold p-4">Settings</h1>
      {/* settings content */}
    </div>
  );
}
