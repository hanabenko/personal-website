export const metadata = {
  title: "Blog | Hana Benko",
  description: "Thoughts, projects, and things I'm curious about.",
};

const BLOG_URL = "https://hanabenko.github.io";

// const recentPosts = [
//   "Why You Should Apply to Stanford Code in Place This Spring",
//   "Birthday Special: Happy Numbers",
//   "How to Write Essays",
//   "Mapping My Layovers",
//   "My College Spreadsheet",
// ];

export default function BlogPage() {
  return (
    <div className="page">
      <span className="label" style={{ display: "block", marginBottom: "0.5rem" }}>
        Writing
      </span>
      <h1 className="heading" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", marginBottom: "0.5rem" }}>
        Blog
      </h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem" }}>
        Thoughts, projects, and things I&apos;m curious about. My blog lives on GitHub Pages.
      </p>

      <a
        href={BLOG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="card card-link"
        style={{ display: "block", borderLeft: "4px solid var(--color-accent)" }}
      >
        Read all posts at hanabenko.github.io →
      </a>

      {/* <p className="label" style={{ marginBottom: "0.5rem" }}>Recently</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {recentPosts.map((title) => (
          <li
            key={title}
            style={{
              borderBottom: "1px solid var(--color-border)",
              padding: "0.5rem 0",
            }}
          >
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-text)", fontSize: "0.95rem" }}
            >
              {title}
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
