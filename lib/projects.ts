export type Project = {
  slug: string;
  title: string;
  tagline: string;
  date: string;
  url: string | null;
  github: string | null;
  description: string;
  role: string[];
  roleLabel?: string;
  techStack?: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  tags?: string[];
};

// Newest first. Projects with only a year retain their previous relative order.
export const projects: Project[] = [
  {
    slug: "this-website",
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
    imageAlt: "Screenshot of an earlier version of Hana Benko's website",
    imageWidth: 1024,
    imageHeight: 929,
    tags: ["Web"],
  },
  {
    slug: "cmu-bulletin",
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
    imageAlt: "CMU Bulletin event discovery page with category filters and event cards",
    imageWidth: 1024,
    imageHeight: 541,
    tags: ["Web", "Open Source"],
  },
  {
    slug: "the-bias-lens",
    title: "The Bias Lens",
    tagline: "Making bias in news visible and explainable",
    date: "2025",
    url: "https://devpost.com/software/the-bias-lens",
    github: null,
    description:
      'The Bias Lens analyzes news articles and highlights language that may introduce ideological framing. Instead of labeling an article as simply "biased," it explains how specific wording choices can influence how a story is perceived.',
    role: [
      "Designed and implemented the article analysis pipeline",
      "Built prompts and processing logic to identify framing and ideological signals",
      "Developed a system to generate readable explanations of bias indicators",
    ],
    techStack: "Python · LLMs · NLP",
    image: "/the-bias-lens.png",
    imageAlt: "The Bias Lens analysis results page showing a bias score and explanations",
    imageWidth: 1024,
    imageHeight: 591,
    tags: ["AI/ML", "Research", "Python"],
  },
  {
    slug: "cmueats",
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
    imageAlt: "CMUEats page listing campus dining locations and opening times",
    imageWidth: 1024,
    imageHeight: 663,
    tags: ["Web", "Open Source"],
  },
  {
    slug: "teacher-dataset-scraper",
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
    imageAlt: "Public school search form on the National Center for Education Statistics website",
    imageWidth: 1024,
    imageHeight: 557,
    tags: ["Research", "Python"],
  },
  {
    slug: "lmya-multisport",
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
    imageAlt: "LMYA MultiSport mobile app screen listing basketball exercises",
    imageWidth: 472,
    imageHeight: 480,
    tags: ["Mobile"],
  },
  {
    slug: "scratch-projects",
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
    image: "/scratch-projects.png",
    imageAlt: "Scratch game scene with a dragon, donut, timer, and starry background",
    imageWidth: 938,
    imageHeight: 704,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
