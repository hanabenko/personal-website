"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className={`nav-header${pathname === "/" ? " nav-header--home" : ""}`}>
      <nav className="nav-inner">
        <Link href="/" className="nav-logo">
          Hana Benko
        </Link>
        {links.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`nav-link ${isActive ? "nav-link--active" : ""}`}
            >
              {label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
      <div className="nav-stripe" />
    </header>
  );
}
