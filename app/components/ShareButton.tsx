"use client";
import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      className={`share-btn${copied ? " share-btn--copied" : ""}`}
      onClick={copy}
      aria-label="Copy link to this post"
    >
      {copied ? "✓ Copied" : "Share"}
    </button>
  );
}
