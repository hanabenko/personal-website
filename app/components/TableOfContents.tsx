import type { TocEntry } from "@/lib/posts";

export default function TableOfContents({ toc }: { toc: TocEntry[] }) {
  if (toc.length < 2) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <span className="toc-heading">Contents</span>
      <ol className="toc-list">
        {toc.map((entry) => (
          <li key={entry.id} className={`toc-item toc-item--h${entry.depth}`}>
            <a href={`#${entry.id}`} className="toc-link">
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
