import Link from "next/link";
import { getAllPostMeta } from "@/lib/posts";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostFooter({
  slug,
  categories,
  tags,
}: {
  slug: string;
  categories?: string[];
  tags?: string[];
}) {
  const allPosts = getAllPostMeta();
  const others = allPosts.filter((p) => p.slug !== slug);

  const related = others.filter(
    (p) =>
      categories?.some((c) => p.categories?.includes(c)) ||
      tags?.some((t) => p.tags?.includes(t))
  );
  const furtherReading = [
    ...related,
    ...others.filter((p) => !related.includes(p)),
  ].slice(0, 2);

  return (
    <div className="post-footer">
      <p className="post-license">
        This post is licensed under{" "}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY 4.0
        </a>{" "}
        by Hana Benko.
      </p>

      {furtherReading.length > 0 && (
        <div className="post-footer-widget">
          <span className="post-footer-heading">Further Reading</span>
          <div className="further-reading-list">
            {furtherReading.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="further-reading-card"
              >
                <time className="further-reading-date">{formatDate(p.date)}</time>
                <span className="further-reading-title">{p.title}</span>
                {p.description && (
                  <span className="further-reading-desc">{p.description}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
