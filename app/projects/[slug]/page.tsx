import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Hana Benko`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[index + 1];

  return (
    <article className="project-page">
      <div className="project-page-layout">
        <Link className="project-page-back" href="/projects">← All projects</Link>

        <header className="project-page-header">
          <p className="project-page-kicker">Project {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
          <h1>{project.title}</h1>
          <p className="project-page-tagline">{project.tagline}</p>
        </header>

        <div className="project-page-meta">
          <div><span>Dates</span><p>{project.date}</p></div>
          {project.techStack && <div><span>Technologies</span><p>{project.techStack}</p></div>}
          {project.tags?.length ? <div><span>Areas</span><p>{project.tags.join(" · ")}</p></div> : null}
        </div>

        <figure className="project-page-figure">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={project.imageWidth}
            height={project.imageHeight}
            sizes="(max-width: 760px) 100vw, 1100px"
            quality={92}
            priority
          />
          <figcaption>{project.title}</figcaption>
        </figure>

        <div className="project-page-story">
          <section aria-labelledby="project-overview">
            <h2 id="project-overview">Overview</h2>
            <p>{project.description}</p>
          </section>
          <section aria-labelledby="project-contribution">
            <h2 id="project-contribution">{project.roleLabel ?? "My contribution"}</h2>
            <ul>{project.role.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          {(project.url || project.github) && (
            <section className="project-page-links" aria-labelledby="project-links">
              <h2 id="project-links">Links</h2>
              <div>
                {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">{project.slug === "scratch-projects" ? "Scratch profile" : project.slug === "the-bias-lens" ? "Devpost" : project.slug === "lmya-multisport" ? "App Store" : "Visit project"} ↗</a>}
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">{project.slug === "teacher-dataset-scraper" ? "GitHub profile" : "GitHub"} ↗</a>}
              </div>
            </section>
          )}
        </div>

        <nav className="project-page-next" aria-label="Project navigation">
          <Link href="/projects">← Project index</Link>
          {nextProject && <Link href={`/projects/${nextProject.slug}`}>Next: {nextProject.title} →</Link>}
        </nav>
      </div>
    </article>
  );
}
