type OrgProps = {
  href: string;
  label: string;
  title: string;
  role: string;
  desc: string;
};

function Org({ href, label, title, role, desc }: OrgProps) {
  return (
    <span className="org-wrap">
      <a href={href} target="_blank" rel="noopener noreferrer" className="org-link">
        {label}
      </a>
      <span className="org-tooltip" role="tooltip">
        <strong className="org-tooltip-name">{title}</strong>
        <span className="org-tooltip-role">{role}</span>
        <span className="org-tooltip-desc">{desc}</span>
      </span>
    </span>
  );
}

export function HomeBio() {
  return (
    <>
      <p className="home-lead">
        I&apos;m a CS+ML student at{" "}
        <Org
          href="https://www.cmu.edu/"
          label="Carnegie Mellon"
          title="Carnegie Mellon University"
          role="Computer Science Student"
          desc="Studying CS and ML in Pittsburgh. Expected graduation December 2027."
        />
        , currently interning at{" "}
        <Org
          href="https://daytona.io"
          label="Daytona"
          title="Daytona"
          role="Go-to-Market Intern"
          desc="Open-source dev environment platform. I work on partnerships and collaborations around compute infrastructure for AI agent workflows."
        />
        {" "}and doing HCI research at{" "}
        <Org
          href="https://www.hcii.cmu.edu/"
          label="HCII"
          title="Human-Computer Interaction Institute"
          role="Researcher"
          desc="CMU's HCI research lab. I work on projects at the intersection of education and AI."
        />
        .
      </p>
      <p className="home-lead">
        On campus, I direct{" "}
        <Org
          href="https://www.scottylabs.org/"
          label="Labrador"
          title="Labrador in ScottyLabs"
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
      <p className="home-lead home-lead--muted">
        I was born and raised in Croatia, and my family moved to the East Bay in 2018. I now spend most of my year in Pittsburgh; at least until December 2027, when I expect to graduate.
        Outside of school, I like beautiful sights, sports, and making things.

      </p>
    </>
  );
}
