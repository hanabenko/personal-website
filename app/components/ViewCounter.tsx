"use client";
import { useEffect, useState } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((r) => r.json())
      .then((d) => { if (typeof d.views === "number") setViews(d.views); });
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="post-views">
      {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  );
}
