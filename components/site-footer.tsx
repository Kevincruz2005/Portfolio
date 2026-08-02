"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <footer className="site-footer">
      <div className="page-shell">
        <span>© 2026 Kevin Cruz</span>
        <span>Backend, systems and reliable infrastructure.</span>
        <Link href="/">Return home</Link>
      </div>
    </footer>
  );
}
