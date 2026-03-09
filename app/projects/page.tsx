import { ProjectCard } from "@/components/ProjectCard";

export const metadata = {
  title: "Projects | Hana Benko",
  description: "Software and research portfolio — HCI, ed-tech, educational tools.",
};

const projects = [
  {
    title: "CMU Bulletin",
    tagline: "Campus events and announcements in one place",
    date: "2025–present",
    url: "https://cmubulletin.com",
    github: "https://github.com/hanabenko/cmubulletin",
    description:
      "CMU Bulletin is a platform where students can discover and share campus events. Instead of announcements being scattered across group chats, Slack channels, and mailing lists, everything lives in one searchable feed.",
    role: [
      "Co-developed the full-stack web application with a team",
      "Built core frontend components and event posting flows",
      "Helped design the event submission and moderation system",
      "Shipped the first working version used by students",
    ],
    techStack: "React · Firebase · TypeScript",
    image: "/cmu-bulletin.png",
  },
  {
    title: "LMYA MultiSport",
    tagline: "Training resources for youth coaches, players, and parents",
    date: "2020–2024",
    url: "https://apps.apple.com/us/app/lmya-multisport/id1514895433",
    github: null,
    description:
      "LMYA MultiSport is a mobile app for the Lafayette-Moraga Youth Association that provides training videos, drills, and resources for youth sports programs. Coaches and players can browse structured practice content and learn skills outside of practice.",
    role: [
      "Designed and developed the cross-platform mobile application",
      "Delivered technical presentations to organization leadership to secure $10K in funding",
      "Managed the App Store and TestFlight release pipeline",
      "Handled QA, updates, and deployment for production releases",
    ],
    techStack: "React Native · iOS · Android · App Store Connect · TestFlight",
    image: "/lmya-multisport.png",
  },
  {
    title: "The Bias Lens",
    tagline: "Making bias in news visible and explainable",
    date: "2025",
    url: "https://devpost.com/software/the-bias-lens",
    github: null,
    description:
      "The Bias Lens analyzes news articles and highlights language that may introduce ideological framing. Instead of labeling an article as simply \"biased,\" it explains how specific wording choices can influence how a story is perceived.",
    role: [
      "Designed and implemented the article analysis pipeline",
      "Built prompts and processing logic to identify framing and ideological signals",
      "Developed a system to generate readable explanations of bias indicators",
    ],
    techStack: "Python · LLMs · NLP",
    image: "/the-bias-lens.png",
  },
  {
    title: "CMUEats",
    tagline: "CMU dining locations and menus in one place",
    date: "2025",
    url: "https://cmueats.com",
    github: "https://github.com/ScottyLabs/cmueats",
    description:
      "CMUEats helps students quickly check which campus dining locations are open and what's on the menu. The app aggregates dining information into a single interface designed for quick mobile use between classes.",
    role: [
      "Helped design product features and user experience improvements",
      "Collaborated with the team and CMU dining on data access",
      "Contributed to frontend development and feature planning",
    ],
    techStack: "Vite · JavaScript · Web APIs",
    image: "/cmueats.png",
  },
  {
    title: "Teacher Dataset Scraper",
    tagline: "Structuring public datasets for research outreach",
    date: "2025",
    url: null,
    github: "https://github.com/hanabenko",
    description:
      "This project collects and structures publicly available datasets to identify teachers who may be interested in participating in education research studies. The goal is to make it easier for researchers to connect with educators who could benefit from new tools.",
    role: [
      "Built Python scripts to scrape and structure public data sources",
      "Cleaned and standardized datasets for researcher use",
      "Produced a structured dataset of 500+ teachers for outreach",
    ],
    techStack: "Python · Web scraping · Data processing",
    image: "/teacher-scraper.png",
  },
  {
    title: "This Website",
    tagline: "The site you're currently on",
    date: "2026–present",
    url: "https://www.hanabenko.com/",
    github: "https://github.com/hanabenko/personal-website",
    description:
      "This portfolio site is where I share projects, writing, and experiments. I built it to be simple, fast, and easy to update as I keep building new things.",
    role: [
      "Designed and implemented the entire site",
      "Built reusable project and blog components",
      "Deployed and maintain the site",
    ],
    techStack: "Next.js · TypeScript · CSS",
    image: "/this-website.png",
  },
  {
    title: "Scratch Projects",
    tagline: "Where it all started",
    date: "2016",
    url: "https://scratch.mit.edu/users/Hana10/",
    github: null,
    description:
      "My earliest programming projects were built in Scratch — mostly small games and interactive experiments. They're simple, but they're also where I first learned how programming could turn ideas into something playable.",
    role: [
      "Small games and interactive animations",
      "Logic systems using Scratch blocks",
      "Early experiments with game design",
    ],
    roleLabel: "What I built",
    techStack: undefined,
    image: "/scratch-projects.png",
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
            <p className="post-intro">
              Not everything I build is big or polished, but every project here started with a problem I wanted to solve. Some were built with teams, some on my own, and most taught me something new along the way.
            </p>
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
                  role={p.role}
                  roleLabel={p.roleLabel}
                  techStack={p.techStack}
                />
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
