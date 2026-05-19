export default function SideBar() {
  return (
    <aside className="sticky top-0 h-screen hidden  md:flex flex-col items-center xl:items-start p-2 xl:pr-4 border-r border-neutral-800">
      <div className="p-3 text-emerald-500 font-bold text-xl">D</div>

      <nav className="flex flex-col gap-y-2 w-full mt-4">
        <a
          href="#"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">🏠</span>
          <span className="hidden xl:inline font-medium">Home</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">🔔</span>
          <span className="hidden xl:inline font-medium">Notifications</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-x-4 p-3 hover:bg-neutral-900 rounded-full w-fit xl:w-full transition"
        >
          <span className="text-xl">👤</span>
          <span className="hidden xl:inline font-medium">Profile</span>
        </a>
      </nav>
    </aside>
  );
}
