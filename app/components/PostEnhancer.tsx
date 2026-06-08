"use client";
import { useEffect } from "react";

export default function PostEnhancer({ articleId }: { articleId: string }) {
  useEffect(() => {
    const article = document.getElementById(articleId);
    if (!article) return;

    // Copy buttons on code blocks
    article.querySelectorAll<HTMLElement>("pre").forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code");
      btn.addEventListener("click", async () => {
        const text = pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copied!";
        btn.classList.add("copy-btn--done");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("copy-btn--done");
        }, 2000);
      });
      pre.appendChild(btn);
    });

    // Scroll-reveal on prose elements
    const targets = article.querySelectorAll<HTMLElement>(
      "p, h2, h3, h4, li, blockquote, pre, table, .katex-display"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationPlayState = "running";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    targets.forEach((el) => {
      el.classList.add("reveal-target");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [articleId]);

  return null;
}
