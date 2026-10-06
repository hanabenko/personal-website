import type { Metadata } from "next";
import { getAllPostMeta } from "@/lib/posts";
import BlogClient from "@/app/components/BlogClient";

export const metadata: Metadata = {
  title: "Blog — Hana Benko",
  description: "Writing on tech, math, games, and life.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string }>;
}) {
  const { category, tag } = await searchParams;
  const posts = getAllPostMeta();

  return (
    <div className="page page--blog">
      <header className="projects-header blog-header">
        <h1>Blog</h1>
        <p>Writing on tech, math, games, and life.</p>
      </header>
      <BlogClient posts={posts} initialCategory={category} initialTag={tag} />
    </div>
  );
}
