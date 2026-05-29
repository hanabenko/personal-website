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
        I&apos;m a CS student at{" "}
        <Org
          href="https://www.cmu.edu/"
          label="Carnegie Mellon"
          title="Carnegie Mellon University"
          role="Computer Science Student"
          desc="Studying CS in Pittsburgh. Expected graduation December 2027."
        />
        , currently interning at{" "}
        <Org
          href="https://daytona.io"
          label="Daytona"
          title="Daytona"
          role="Software Engineering Intern"
          desc="Open-source development environment manager. I'm on the engineering team building developer tooling."
        />
        {" "}and doing HCI research at{" "}
        <Org
          href="https://www.hcii.cmu.edu/"
          label="HCII"
          title="Human-Computer Interaction Institute"
          role="Researcher"
          desc="CMU's HCI research lab. I work on projects at the intersection of people and technology."
        />
        .
      </p>
      <p className="home-lead">
        On campus, I direct{" "}
        <Org
          href="https://www.scottylabs.org/"
          label="Labrador"
          title="Labrador — ScottyLabs"
          role="Director"
          desc="A project within ScottyLabs, CMU's student-run tech org. I lead the Labrador team."
        />
        , serve as exec on the{" "}
        <Org
          href="https://scsbusinessoffice.cs.cmu.edu/advisory-committees/index.html"
          label="SCS Student Advisory Committee"
          title="SCS Student Advisory Committee"
          role="Executive"
          desc="Student governance body for CMU's School of Computer Science, representing CS undergrads in school decisions."
        />
        , and teach through{" "}
        <Org
          href="https://codeinplace.stanford.edu/"
          label="Code in Place"
          title="Code in Place"
          role="Section Leader"
          desc="Stanford's free intro CS course, open to anyone worldwide. I teach Python to a section of students."
        />
        .
      </p>
      <p className="home-lead home-lead--muted">
        Born in Croatia, raised in the East Bay. Based in Pittsburgh until at least December 2027.
        Outside of school, I like beautiful sights, sports, and making things.
      </p>
    </>
  );
}
