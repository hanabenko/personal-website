"use client";
import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/posts";

export default function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (toc.length < 2) return;

    const headings = toc
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-8% 0% -80% 0%", threshold: 0 }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  if (toc.length < 2) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <span className="toc-heading">Contents</span>
      <ol className="toc-list">
        {toc.map((entry) => (
          <li key={entry.id} className={`toc-item toc-item--h${entry.depth}`}>
            <a
              href={`#${entry.id}`}
              className={`toc-link${activeId === entry.id ? " toc-link--active" : ""}`}
            >
              {entry.text.trim()}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
