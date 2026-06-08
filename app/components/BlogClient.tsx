"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function CategoryDropdown({
  categories,
  active,
  onToggle,
}: {
  categories: string[];
  active: Set<string>;
  onToggle: (c: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const label =
    active.size === 0
      ? "All categories"
      : active.size === 1
      ? [...active][0]
      : `${active.size} selected`;

  return (
    <div className="cat-dropdown" ref={ref}>
      <button
        type="button"
        className={`cat-dropdown-btn${open ? " cat-dropdown-btn--open" : ""}${active.size > 0 ? " cat-dropdown-btn--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <span className="cat-dropdown-chevron">{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div className="cat-dropdown-panel">
          {categories.map((c) => (
            <label key={c} className="cat-dropdown-item">
              <input
                type="checkbox"
                className="cat-dropdown-checkbox"
                checked={active.has(c)}
                onChange={() => onToggle(c)}
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BlogClient({
  posts,
  initialCategory,
  initialTag,
}: {
  posts: PostMeta[];
  initialCategory?: string;
  initialTag?: string;
}) {
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    () => initialCategory ? new Set([initialCategory]) : new Set()
  );
  const [activeTags, setActiveTags] = useState<Set<string>>(
    () => initialTag ? new Set([initialTag]) : new Set()
  );

  const allCategories = useMemo(() => {
    const s = new Set<string>();
    posts.forEach((p) => p.categories?.forEach((c) => s.add(c)));
    return [...s].sort();
  }, [posts]);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => s.add(t)));
    return [...s].sort();
  }, [posts]);

  function toggleCategory(c: string) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });
  }

  function toggleTag(t: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  }

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const q = search.trim().toLowerCase();
      if (q) {
        const haystack = [p.title, p.description ?? ""].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (activeCategories.size > 0 && !p.categories?.some((c) => activeCategories.has(c))) return false;
      if (activeTags.size > 0 && !p.tags?.some((t) => activeTags.has(t))) return false;
      return true;
    });
  }, [posts, search, activeCategories, activeTags]);

  const grouped = useMemo(() => {
    const map = new Map<string, PostMeta[]>();
    filtered.forEach((p) => {
      const year = p.date.slice(0, 4) || "—";
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(p);
    });
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  const hasFilters = search.trim() !== "" || activeCategories.size > 0 || activeTags.size > 0;

  return (
    <div className="blog-layout">
      {/* ── Main post list ── */}
      <div className="blog-main">
        {grouped.length === 0 ? (
          <p className="blog-no-results">No posts match your search.</p>
        ) : (
          grouped.map(([year, yearPosts]) => (
            <div key={year} className="blog-year-group">
              <div className="blog-year-marker">
                <span className="blog-year-label">{year}</span>
              </div>
              <ul className="blog-list">
                {yearPosts.map((post) => (
                  <li key={post.slug} className="blog-item">
                    <Link href={`/blog/${post.slug}`} className="blog-item-link">
                      <time className="blog-item-date">{formatDate(post.date)}</time>
                      <span className="blog-item-title">{post.title}</span>
                      {post.description && (
                        <span className="blog-item-desc">{post.description}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {/* ── Sidebar ── */}
      <aside className="blog-sidebar">
        <input
          className="blog-search"
          type="search"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {allCategories.length > 0 && (
          <div className="blog-sidebar-section">
            <span className="blog-sidebar-heading">Category</span>
            <CategoryDropdown
              categories={allCategories}
              active={activeCategories}
              onToggle={toggleCategory}
            />
          </div>
        )}

        {allTags.length > 0 && (
          <div className="blog-sidebar-section">
            <span className="blog-sidebar-heading">Tags</span>
            <div className="blog-filter-chips">
              {allTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`blog-chip blog-chip--tag blog-chip--btn${activeTags.has(t) ? " blog-chip--active" : ""}`}
                  onClick={() => toggleTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasFilters && (
          <button
            type="button"
            className="blog-clear-btn"
            onClick={() => { setSearch(""); setActiveCategories(new Set()); setActiveTags(new Set()); }}
          >
            Clear filters
          </button>
        )}
      </aside>
    </div>
  );
}
