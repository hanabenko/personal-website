import { ProjectCard } from "@/components/ProjectCard";

export const metadata = {
  title: "Projects | Hana Benko",
  description: "Software and research portfolio — HCI, ed-tech, educational tools.",
};

const projects = [
  {
    title: "CMU Bulletin",
    tagline: "Campus events and announcements in one place.",
    date: "2024–present",
    url: "https://cmubulletin.com",
    github: "https://github.com/hanabenko/cmubulletin",
    description:
      "A web platform for campus events and announcements so students can find and share what's going on at CMU. Built and shipped with a team; it's the kind of tool I wish had existed when I was figuring out where to show up. Built with React and Firebase.",
    image: "/cmu-bulletin.png",
  },
  {
    title: "The Bias Lens",
    tagline: "Making bias in news visible and understandable.",
    date: "2024",
    url: "https://devpost.com/software/the-bias-lens",
    github: null,
    description:
      "An AI system that analyzes articles for ideological bias and framing, then explains how language choices can shape perception. Built to make bias in news more visible and understandable, not just \"good or bad.\" Python, LLMs, and NLP.",
    image: "/the-bias-lens.png",
  },
  {
    title: "Teacher Dataset Scraper",
    tagline: "Structuring public data for research recruitment.",
    date: "2024",
    url: null,
    github: "https://github.com/hanabenko",
    description:
      "Scripts that scrape and structure public datasets to identify 500+ teachers for research recruitment. Built to support study outreach for the CATS lab so we can connect with educators who might benefit from our tools. Python.",
    image: null,
  },
  {
    title: "Cache Simulator and Malloc Implementation",
    tagline: "Systems-level work on hardware and memory.",
    date: "2024",
    url: null,
    github: null,
    description:
      "A CPU cache simulator (set-associative, LRU eviction) and a dynamic memory allocator. Systems-level work to understand how hardware and memory really behave — the kind of project that makes everything else you build make more sense. C.",
    image: null,
  },
];

export default function ProjectsPage() {
  return (
    <div className="page-content" aria-label="Content">
      <div className="wrapper">
        <article className="post">
          <header className="post-header">
            <h1 className="post-title">Projects</h1>
          </header>

          <div className="post-content">
            <div className="projects">
              {projects.map((p) => (
                <ProjectCard
                  key={p.title}
                  title={p.title}
                  tagline={p.tagline}
                  date={p.date}
                  url={p.url}
                  github={p.github}
                  description={p.description}
                  image={p.image}
                />
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
