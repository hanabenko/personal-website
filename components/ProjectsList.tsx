"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";

type Project = {
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

export function ProjectsList({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags ?? []))
  );

  const visible = activeFilter
    ? projects.filter((p) => p.tags?.includes(activeFilter))
    : projects;

  return (
    <>
      <div className="project-filters">
        <button
          className={`project-filter-btn${!activeFilter ? " project-filter-btn--active" : ""}`}
          onClick={() => setActiveFilter(null)}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`project-filter-btn${activeFilter === tag ? " project-filter-btn--active" : ""}`}
            onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="projects">
        {visible.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </>
  );
}
