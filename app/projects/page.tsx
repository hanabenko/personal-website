// import { Photo } from "@/components/Photo";

export const metadata = {
  title: "Projects | Hana Benko",
  description: "Software and research portfolio — HCI, ed-tech, educational tools.",
};

// const projects = [
//   {
//     title: "CMU Bulletin",
//     url: "https://cmubulletin.com",
//     stack: "React, Firebase",
//     description:
//       "A web platform for campus events and announcements so students can find and share what's going on at CMU. Built and shipped with a team; it's the kind of tool I wish had existed when I was figuring out where to show up.",
//     image: "/cmu-bulletin.png",
//     featured: true,
//   },
//   {
//     title: "The Bias Lens",
//     url: "https://devpost.com/software/the-bias-lens",
//     stack: "Python, LLMs, NLP",
//     description:
//       "An AI system that analyzes articles for ideological bias and framing, then explains how language choices can shape perception. Built to make bias in news more visible and understandable, not just \"good or bad.\"",
//     image: "/the-bias-lens.png",
//     featured: false,
//   },
//   {
//     title: "Teacher Dataset Scraper",
//     url: null,
//     stack: "Python",
//     description:
//       "Scripts that scrape and structure public datasets to identify 500+ teachers for research recruitment. Built to support study outreach for the CATS lab so we can connect with educators who might benefit from our tools.",
//     image: null,
//     featured: false,
//   },
//   {
//     title: "Cache Simulator and Malloc Implementation",
//     url: null,
//     stack: "C",
//     description:
//       "A CPU cache simulator (set-associative, LRU eviction) and a dynamic memory allocator. Systems-level work to understand how hardware and memory really behave — the kind of project that makes everything else you build make more sense.",
//     image: null,
//     featured: false,
//   },
// ];

export default function ProjectsPage() {
  return (
    <div className="page">
      <span className="label" style={{ display: "block", marginBottom: "0.5rem" }}>
        Portfolio
      </span>
      <h1 className="heading" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", marginBottom: "0.5rem" }}>
        Projects
      </h1>
      <p style={{ color: "var(--color-muted)" }}>Coming soon.</p>
      {/* <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem", maxWidth: "42ch" }}>
        A mix of shipped products, research tools, and systems work. Each one taught me something different about building for real people and real constraints.
      </p>

      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.title} className={p.featured ? "featured" : ""}>
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-link project-card"
              >
                {p.image && (
                  <div className="project-card-image">
                    <Photo src={p.image} alt={p.title} fill placeholderLabel="" />
                  </div>
                )}
                <div className="project-card-body">
                  {p.featured && (
                    <span className="label" style={{ display: "block", marginBottom: "0.25rem" }}>
                      Featured
                    </span>
                  )}
                  <span className="heading" style={{ fontSize: p.featured ? "1.35rem" : "1.125rem", display: "block", marginBottom: "0.25rem" }}>
                    {p.title}
                  </span>
                  <span style={{ color: "var(--color-muted)", fontSize: "0.875rem", fontFamily: "var(--font-mono)" }}>
                    {p.stack}
                  </span>
                  <p style={{ margin: "0.5rem 0 0", color: "var(--color-muted)", fontSize: "0.95rem" }}>
                    {p.description}
                  </p>
                </div>
              </a>
            ) : (
              <div className="card" style={{ height: "100%" }}>
                <span className="heading" style={{ fontSize: "1.125rem", display: "block", marginBottom: "0.25rem" }}>
                  {p.title}
                </span>
                <span style={{ color: "var(--color-muted)", fontSize: "0.875rem", fontFamily: "var(--font-mono)" }}>
                  {p.stack}
                </span>
                <p style={{ margin: "0.5rem 0 0", color: "var(--color-muted)", fontSize: "0.95rem" }}>
                  {p.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
}
