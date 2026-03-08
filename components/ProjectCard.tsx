"use client";

import Image from "next/image";

type ProjectCardProps = {
  title: string;
  tagline: string;
  date: string;
  url: string | null;
  github: string | null;
  description: string;
  image: string | null;
};

export function ProjectCard({ title, tagline, date, url, github, description, image }: ProjectCardProps) {
  const href = url ?? github ?? null;

  const imageContent = image ? (
    <Image
      className="project-image"
      src={image}
      alt={title}
      width={400}
      height={400}
      sizes="200px"
      quality={90}
    />
  ) : (
    <div className="project-image project-image--placeholder" aria-hidden>
      Project
    </div>
  );

  return (
    <article className="project-box">
      <div className="project-image-box">
        {href ? (
          <a
            className="project-image-link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title}`}
          >
            {imageContent}
          </a>
        ) : (
          imageContent
        )}
      </div>
      <div className="project-content">
        <div className="project-title">
          <h2>{title}</h2>
          <h5>{tagline}</h5>
          <h6>{date}</h6>
        </div>
        <div className="project-description">
          <p>{description}</p>
        </div>
      </div>
    </article>
  );
}
