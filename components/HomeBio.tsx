"use client";

import { useState, useRef, useEffect } from "react";

type OrgProps = {
  href: string;
  label: string;
  title: string;
  role: string;
  desc: string;
};

function Org({ href, label, title, role, desc }: OrgProps) {
  const [open, setOpen] = useState(false);
  const [tipStyle, setTipStyle] = useState<React.CSSProperties>({});
  const ref = useRef<HTMLSpanElement>(null);

  const computeAndOpen = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const style: React.CSSProperties = {};

      const tipWidth = 260;
      const margin = 12;
      const vw = window.innerWidth;
      // Ideal: align left edge of tooltip with left edge of word
      let vpLeft = rect.left;
      // Shift left if overflowing right edge
      if (vpLeft + tipWidth > vw - margin) vpLeft = vw - margin - tipWidth;
      // Clamp so it never goes off the left edge
      if (vpLeft < margin) vpLeft = margin;
      style.left = `${vpLeft - rect.left}px`;

      if (rect.top < 280) {
        style.bottom = "auto";
        style.top = "calc(100% + 8px)";
      }
      setTipStyle(style);
    }
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <span
      ref={ref}
      className={`org-wrap${open ? " org-wrap--open" : ""}`}
      onMouseEnter={computeAndOpen}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="org-link"
        onClick={(e) => {
          if (window.matchMedia("(hover: none)").matches) {
            e.preventDefault();
            if (open) setOpen(false);
            else computeAndOpen();
          }
        }}
      >
        {label}
      </a>
      <span className="org-tooltip" role="tooltip" style={tipStyle}>
        <strong className="org-tooltip-name">{title}</strong>
        <span className="org-tooltip-role">{role}</span>
        <span className="org-tooltip-desc">{desc}</span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="org-tooltip-visit"
          onClick={() => setOpen(false)}
        >
          Visit ↗
        </a>
      </span>
    </span>
  );
}

export function HomeBio() {
  return (
    <>
      <p className="home-lead">
        I&apos;m a junior studying CS at{" "}
        <Org
          href="https://www.cmu.edu/"
          label="Carnegie Mellon"
          title="Carnegie Mellon University"
          role="Computer Science Student"
          desc="Concentrating in Machine Learning in Pittsburgh. Expected graduation Spring 2028."
        />
        , concentrating in ML. I previously did research at{" "}
        <Org
          href="https://www.hcii.cmu.edu/"
          label="HCII"
          title="Human-Computer Interaction Institute"
          role="Former Researcher"
          desc="CMU's HCI research lab. I worked on projects at the intersection of education and AI."
        />
        {" "}and interned this past summer at{" "}
        <Org
          href="https://daytona.io"
          label="Daytona"
          title="Daytona"
          role="Go-to-Market Intern"
          desc="Open-source dev environment platform. I worked on the social and technical side of partnerships and collaborations around compute infrastructure for AI agent workflows."
        />
        .
      </p>
      <p className="home-lead">
        On campus, I direct{" "}
        <Org
          href="https://www.scottylabs.org/"
          label="Labrador"
          title="Labrador @ ScottyLabs"
          role="Director"
          desc="ScottyLabs is CMU's largest software club (1,000+ members, 8 executives). Labrador is a 100+ person committee running 20+ projects per semester; I manage the 12-person leadership team keeping the ship running."
        />
        , serve as exec on the{" "}
        <Org
          href="https://scsbusinessoffice.cs.cmu.edu/advisory-committees/index.html"
          label="SCS SAC"
          title="SCS Student Advisory Committee (SAC)"
          role="Executive"
          desc="Student governance body for CMU's School of Computer Science, representing CS undergrads in school decisions. This will be my second year as an executive member."
        />
        , and teach through{" "}
        <Org
          href="https://codeinplace.stanford.edu/"
          label="Code in Place"
          title="Code in Place"
          role="Section Leader"
          desc="Stanford's free intro CS course, with 20k+ students, open to anyone worldwide. I have taught for two years, teaching beginner Python to a section of 15 students."
        />
        .
      </p>
      <p className="home-lead">
        I was born and raised in Croatia, and my family moved to the East Bay in 2018. I now spend most of my year in Pittsburgh; at least until Spring 2028, when I expect to graduate.
        Outside of school, I like beautiful sights, sports, and making things.
      </p>
    </>
  );
}
