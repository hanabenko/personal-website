"use client";

import Image from "next/image";
import { useState } from "react";

type ProjectCardProps = {
  title: string;
  tagline: string;
  date: string;
  url: string | null;
  github: string | null;
  description: string;
  image: string | null;
  role?: string[];
  roleLabel?: string;
  techStack?: string;
  tags?: string[];
};

export function ProjectCard({
  title, tagline, date, url, github, description,
  image, role, roleLabel = "My role", techStack, tags,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const imageHref = url ?? github ?? null;

  return (
    <article className={`project-box${expanded ? " project-box--expanded" : ""}`}>

      {/* Full-width image at top */}
      <div className="project-image-box">
        {imageHref ? (
          <a className="project-image-link" href={imageHref} target="_blank" rel="noopener noreferrer" aria-label={`View ${title}`}>
            {image
              ? <Image className="project-image" src={image} alt={title} fill sizes="(max-width: 640px) 100vw, 50vw" quality={90} />
              : <div className="project-image project-image--placeholder" aria-hidden>Project</div>
            }
          </a>
        ) : (
          image
            ? <Image className="project-image" src={image} alt={title} fill sizes="(max-width: 640px) 100vw, 50vw" quality={90} />
            : <div className="project-image project-image--placeholder" aria-hidden>Project</div>
        )}
      </div>

      {/* Card body */}
      <div className="project-body">
        {/* Always-visible summary */}
        <div className="project-summary">
          <div className="project-summary-text">
            <h2 className="project-title-h2">{title}</h2>
            <p className="project-tagline">{tagline}</p>
            <div className="project-meta-row">
              <span className="project-date">{date}</span>
              {tags?.map((tag) => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>
          </div>
          <button
            className="project-toggle"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            {expanded ? "−" : "+"}
          </button>
        </div>

        {/* Collapsible details */}
        <div className={`project-details${expanded ? " project-details--open" : ""}`}>
          <div className="project-details-inner">
            <p className="project-detail-desc">{description}</p>
            {role && role.length > 0 && (
              <>
                <p className="project-role-label">{roleLabel}</p>
                <ul className="project-role-list">
                  {role.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </>
            )}
            {techStack && (
              <p className="project-tech-stack">
                <span className="project-tech-label">Tech stack</span>
                {" "}{techStack}
              </p>
            )}
            {(url || github) && (
              <div className="project-links">
                {url && <a href={url} target="_blank" rel="noopener noreferrer" className="project-link">View project →</a>}
                {github && <a href={github} target="_blank" rel="noopener noreferrer" className="project-link">GitHub →</a>}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
