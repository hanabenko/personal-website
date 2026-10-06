import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Hana Benko",
  description: "Software and research portfolio — HCI, ed-tech, educational tools.",
};

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <div className="projects-layout">
        <header className="projects-header">
          <h1>Projects</h1>
          <p>Things I have built, researched, and helped bring into the world.</p>
        </header>

        <ol className="projects-index" aria-label="Projects, newest first">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <article className="projects-index-entry">
                <span className="projects-index-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div className="projects-index-main">
                  <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
                  <p>{project.tagline}</p>
                </div>
                <p className="projects-index-role">{project.role[0]}</p>
                <span className="projects-index-date">{project.date}</span>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
