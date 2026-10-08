"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/lib/data";

const navigation = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="wordmark" href="/" aria-label={`KC ${profile.name} — home`}>
          <span className="wordmark-mark" aria-hidden="true">KC</span>
          <span className="wordmark-name">{profile.name}</span>
        </Link>

        <nav
          id="primary-navigation"
          className={open ? "primary-navigation is-open" : "primary-navigation"}
          aria-label="Primary navigation"
        >
          <ul>
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="nav-signal" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>

        </nav>

        <a
          className="nav-resume header-resume"
          href="/KevinCruz_Resume.pdf"
          download
          onClick={() => setOpen(false)}
        >
          Résumé
          <Download aria-hidden="true" />
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
