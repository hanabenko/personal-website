import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostMeta, getPostBySlug } from "@/lib/posts";
import CommentsSection from "@/app/components/CommentsSection";
import PostFooter from "@/app/components/PostFooter";
import TableOfContents from "@/app/components/TableOfContents";
import "katex/dist/katex.min.css";

export async function generateStaticParams() {
  return getAllPostMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Hana Benko`,
    description: post.description,
  };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPostMeta();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const olderPost = allPosts[idx + 1] ?? null;
  const newerPost = allPosts[idx - 1] ?? null;

  return (
    <div className={`page page--post${post.toc.length >= 2 ? " page--post-with-toc" : ""}`}>
      <Link href="/blog" className="post-back">
        ← Blog
      </Link>

      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <time className="post-meta-date">{formatDate(post.date)}</time>
          {(post.categories?.length || post.tags?.length) ? (
            <div className="blog-item-chips">
              {post.categories?.map((c) => (
                <Link key={c} href={`/blog?category=${encodeURIComponent(c)}`} className="blog-chip blog-chip--cat">{c}</Link>
              ))}
              {post.tags?.map((t) => (
                <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="blog-chip blog-chip--tag">{t}</Link>
              ))}
            </div>
          ) : null}
        </div>
        {post.description && (
          <p className="post-intro">{post.description}</p>
        )}
      </header>

      <div className="post-body">
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post.toc.length >= 2 && (
          <aside className="post-toc-sidebar">
            <TableOfContents toc={post.toc} />
          </aside>
        )}
      </div>

      <nav className="post-prev-next">
        {olderPost ? (
          <Link href={`/blog/${olderPost.slug}`} className="post-prev-next-btn post-prev-next-btn--older">
            <span className="post-prev-next-arrow">←</span>
            <span className="post-prev-next-inner">
              <span className="post-prev-next-label">Older</span>
              <span className="post-prev-next-title">{olderPost.title}</span>
            </span>
          </Link>
        ) : <div />}
        {newerPost ? (
          <Link href={`/blog/${newerPost.slug}`} className="post-prev-next-btn post-prev-next-btn--newer">
            <span className="post-prev-next-inner">
              <span className="post-prev-next-label">Newer</span>
              <span className="post-prev-next-title">{newerPost.title}</span>
            </span>
            <span className="post-prev-next-arrow">→</span>
          </Link>
        ) : <div />}
      </nav>

      <PostFooter slug={slug} categories={post.categories} tags={post.tags} />

      <CommentsSection slug={slug} />
    </div>
  );
}
