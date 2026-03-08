import Link from "next/link";
import { notFound } from "next/navigation";

// Placeholder — replace with real content / CMS later
const posts: Record<string, { title: string; date: string; body: string }> = {
  welcome: {
    title: "Welcome",
    date: "2026-03-06",
    body: "First post. More soon.",
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <article style={{ maxWidth: "42rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <Link href="/blog" style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
        ← Back to blog
      </Link>
      <h1 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>{post.title}</h1>
      <time style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>{post.date}</time>
      <div style={{ marginTop: "1.5rem" }}>{post.body}</div>
    </article>
  );
}
