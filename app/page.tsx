import { Photo } from "@/components/Photo";
import { SocialLinks } from "@/components/FooterIcons";
import { HomeCtas } from "@/components/HomeCtas";

const BLOG_URL = "https://hanabenko.github.io";
const CMU_URL = "https://www.cmu.edu/";
const HCII_URL = "https://www.hcii.cmu.edu/";
const CODE_IN_PLACE_URL = "https://codeinplace.stanford.edu/";
const SCOTTYLABS_URL = "https://www.scottylabs.org/";
const DEANS_ADVISORY_URL = "https://scsbusinessoffice.cs.cmu.edu/advisory-committees/index.html";

export default function Home() {
  return (
    <div className="page--home">
      {/* Full-width headline with ruled borders */}
      <h1 className="home-title">Hey there!</h1>

      {/* Newspaper body: text column | photo column */}
      <div className="home-body-grid">
        <div className="home-body-text">
          <p className="home-lead">
            I&apos;m Hana Benko, a computer science student at{" "}
            <a href={CMU_URL} target="_blank" rel="noopener noreferrer">Carnegie Mellon</a>
            {" "}interested in building thoughtful and useful things.
          </p>
          <p className="home-bio">
            I was born and raised in Croatia, and my family moved to the East Bay in 2018. I now spend most of my year in Pittsburgh; at least until December 2027, when I expect to graduate.
          </p>
          <p className="home-bio">
            I work in human–computer interaction research through the{" "}
            <a href={HCII_URL} target="_blank" rel="noopener noreferrer">CMU HCII</a>
            {", "}teach Python as a section leader for{" "}
            <a href={CODE_IN_PLACE_URL} target="_blank" rel="noopener noreferrer">Stanford Code in Place</a>
            {", and help run technical programs with "}
            <a href={SCOTTYLABS_URL} target="_blank" rel="noopener noreferrer">ScottyLabs</a>
            {". I also serve on the "}
            <a href={DEANS_ADVISORY_URL} target="_blank" rel="noopener noreferrer">School of Computer Science Dean&apos;s Student Advisory Committee</a>
            .
          </p>
          <p className="home-bio">
            Outside of school, I like beautiful sights, sports, and making things.
          </p>
          <HomeCtas blogUrl={BLOG_URL} />
        </div>

        <aside className="home-body-photo">
          <div className="home-photo home-photo--vertical">
            <Photo
              src="/hana.png"
              alt="Hana"
              fill
              placeholderLabel=""
              sizes="(max-width: 768px) 100vw, min(360px, 35vw)"
              quality={92}
              priority
              objectFit="contain"
            />
          </div>
        </aside>
      </div>

      <section className="home-connect">
        <span className="home-connect-label">Find me online</span>
        <SocialLinks />
      </section>

      <footer className="home-footer">
        <p className="home-footer-copy">© {new Date().getFullYear()} Hana Benko. All rights reserved.</p>
      </footer>
    </div>
  );
}
