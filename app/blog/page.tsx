import { BlogExternalLink } from "@/components/BlogExternalLink";

export const metadata = {
  title: "Blog | Hana Benko",
  description: "Thoughts, projects, and things I'm curious about.",
};

const BLOG_URL = "https://hanabenko.github.io";

export default function BlogPage() {
  return (
    <div className="page-content" aria-label="Content">
      <div className="wrapper">
        <article className="post">
          <header className="post-header">
            <h1 className="post-title">Blog</h1>
          </header>

          <div className="post-content">
            <p className="post-intro">
              Thoughts, projects, and things I&apos;m curious about. My blog lives on GitHub Pages.
            </p>

            <BlogExternalLink href={BLOG_URL}>
              Read all posts at hanabenko.github.io →
            </BlogExternalLink>
          </div>
        </article>
      </div>
    </div>
  );
}
