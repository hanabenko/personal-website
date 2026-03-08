"use client";

import { usePathname } from "next/navigation";

function getSection(pathname: string): string {
  if (pathname === "/") return "home";
  const segment = pathname.split("/")[1];
  return segment || "home";
}

export function SectionTheme({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const section = getSection(pathname);
  return <div data-section={section}>{children}</div>;
}
