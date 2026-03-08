import { ProjectCard } from "@/components/ProjectCard";

export const metadata = {
  title: "Projects | Hana Benko",
  description: "Software and research portfolio — HCI, ed-tech, educational tools.",
};

const projects = [
  {
    title: "CMU Bulletin",
    tagline: "Campus events and announcements in one place.",
    date: "2025–present",
    url: "https://cmubulletin.com",
    github: "https://github.com/hanabenko/cmubulletin",
    description:
      "A web platform for campus events and announcements so students can find and share what's going on at CMU. Built and shipped with a team; it's the kind of tool I wish had existed when I was figuring out where to show up. Built with React and Firebase.",
    image: "/cmu-bulletin.png",
  },
  {
    title: "LMYA MultiSport",
    tagline: "Video content and tools for LMYA community coaches, players, and parents.",
    date: "2020–2024",
    url: "https://apps.apple.com/us/app/lmya-multisport/id1514895433",
    github: null,
    description:
      "Developed a cross-platform iOS/Android training app for the Lafayette-Moraga Youth Association, serving 1,000+ yearly users. Secured $10K project funding through technical presentations to organization leadership. Managed App Store and TestFlight deployments, releases, and QA.",
    image: "/lmya-multisport.png",
  },
  {
    title: "The Bias Lens",
    tagline: "Making bias in news visible and understandable.",
    date: "2025",
    url: "https://devpost.com/software/the-bias-lens",
    github: null,
    description:
      "An AI system that analyzes articles for ideological bias and framing, then explains how language choices can shape perception. Built to make bias in news more visible and understandable, not just \"good or bad.\" Python, LLMs, and NLP.",
    image: "/the-bias-lens.png",
  },
  {
    title: "CMUEats",
    tagline: "CMU dining locations and menus in one place.",
    date: "2025",
    url: "https://cmueats.com",
    github: "https://github.com/ScottyLabs/cmueats",
    description:
      "A Vite web app that keeps track of dining location statuses and menus across Carnegie Mellon. I worked on brainstorming better user experience features and collaborating with dining.",
    image: "/cmueats.png",
  },
  {
    title: "Teacher Dataset Scraper",
    tagline: "Structuring public data for research recruitment.",
    date: "2025",
    url: null,
    github: "https://github.com/hanabenko",
    description:
      "Scripts that scrape and structure public datasets to identify 500+ teachers for research recruitment. Built to support study outreach for the CATS lab so we can connect with educators who might benefit from our tools. Python.",
    image: "/teacher-scraper.png",
  },
  {
    title: "This website",
    tagline: "Woah, recursive...?",
    date: "2026–present",
    url: "https://www.hanabenko.com/",
    github: "https://github.com/hanabenko/personal-website",
    description:
      "This portfolio site, built with Next.js, TypeScript, and CSS. Source code on GitHub.",
    image: "/this-website.png",
  },
  {
    title: "Scratch projects",
    tagline: "Where it started.",
    date: "2016",
    url: "https://scratch.mit.edu/users/Hana10/",
    github: null,
    description:
      "Check out Escape the Dragon and many more projects I worked on as a young programmer! Most of these games and interactive projects are from 2016.",
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
