"use client";

import posthog from "posthog-js";

export function BlogExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card blog-external-link"
      onClick={() => posthog.capture("blog_link_clicked", { href })}
    >
      {children}
    </a>
  );
}
