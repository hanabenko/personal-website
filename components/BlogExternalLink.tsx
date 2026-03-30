"use client";

import posthog from "posthog-js";

export function BlogExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-link"
      style={{ display: "block", borderLeft: "4px solid var(--color-accent)" }}
      onClick={() => posthog.capture("blog_link_clicked", { href })}
    >
      {children}
    </a>
  );
}
