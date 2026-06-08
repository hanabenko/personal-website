"use client";

import Link from "next/link";
import posthog from "posthog-js";

export function HomeCtas() {
  return (
    <div className="home-ctas">
      <Link
        href="/projects"
        className="home-cta-btn"
        onClick={() => posthog.capture("home_cta_clicked", { label: "Projects", href: "/projects" })}
      >
        Projects →
      </Link>
      <Link
        href="/blog"
        className="home-cta-btn"
        onClick={() => posthog.capture("home_cta_clicked", { label: "Blog", href: "/blog" })}
      >
        Blog →
      </Link>
    </div>
  );
}
