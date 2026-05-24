"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname() || "";

  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={
        isActive
          ? "text-gray-300 hover:text-white transition-colors duration-300 border-b-2 border-orange-500 pb-2"
          : "text-gray-300 hover:text-white transition-colors duration-300"
      }
    >
      {children}
    </Link>
  );
}
