"use client";

import Link from "next/link";
import posthog from "posthog-js";

export function HomeCtas({ blogUrl }: { blogUrl: string }) {
  return (
    <div className="home-ctas">
      <Link
        href="/projects"
        className="home-cta-btn"
        onClick={() => posthog.capture("home_cta_clicked", { label: "Projects", href: "/projects" })}
      >
        Projects →
      </Link>
      <a
        href={blogUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="home-cta-btn"
        onClick={() => posthog.capture("home_cta_clicked", { label: "Blog", href: blogUrl })}
      >
        Blog →
      </a>
    </div>
  );
}
