"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/data";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <footer className="site-footer">
      <div className="page-shell">
        <span>© 2026 {profile.name}</span>
        <span>{profile.role}</span>
        <Link href="/">Return home</Link>
      </div>
    </footer>
  );
}
