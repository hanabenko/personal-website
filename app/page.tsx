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

      {/* Intro: bio left, photo right */}
      <div className="home-intro">
        <div className="home-intro-text">
          <h1 className="home-name">
            Hana <span className="home-name-accent">Benko</span>
          </h1>
          <p className="home-tagline">CS student · researcher · builder</p>
          <p className="home-lead">
            I&apos;m a computer science student at{" "}
            <a href={CMU_URL} target="_blank" rel="noopener noreferrer">Carnegie Mellon</a>
            {" "}interested in building thoughtful and useful things.
          </p>
          <p className="home-lead">
            Born in Croatia, raised in the East Bay. Based in Pittsburgh until at least December 2027.
            Outside of school, I like beautiful sights, sports, and making things.
          </p>
          <HomeCtas blogUrl={BLOG_URL} />
        </div>

        <aside className="home-intro-photo">
          <Photo
            src="/hana.png"
            alt="Hana"
            fill
            placeholderLabel=""
            sizes="(max-width: 580px) 100vw, 155px"
            quality={92}
            priority
            objectFit="cover"
          />
        </aside>
      </div>

      {/* Currently — pill buttons */}
      <div className="home-currently">
        <span className="home-currently-label">Currently</span>
        <div className="home-role-pills">
          <a href={HCII_URL} className="home-role-pill" target="_blank" rel="noopener noreferrer">
            <span className="home-role-pill-type">Research</span>
            <span className="home-role-pill-at">at</span>
            CMU HCII
          </a>
          <a href={CODE_IN_PLACE_URL} className="home-role-pill" target="_blank" rel="noopener noreferrer">
            <span className="home-role-pill-type">Teaching</span>
            <span className="home-role-pill-at">at</span>
            Code in Place
          </a>
          <a href={SCOTTYLABS_URL} className="home-role-pill" target="_blank" rel="noopener noreferrer">
            <span className="home-role-pill-type">Leadership</span>
            <span className="home-role-pill-at">at</span>
            ScottyLabs
          </a>
          <a href={DEANS_ADVISORY_URL} className="home-role-pill" target="_blank" rel="noopener noreferrer">
            <span className="home-role-pill-type">Committee</span>
            <span className="home-role-pill-at">at</span>
            SCS Dean&apos;s Advisory
          </a>
        </div>
      </div>

      <section className="home-connect">
        <span className="home-connect-label">Online</span>
        <SocialLinks />
      </section>

      <footer className="home-footer">
        <p className="home-footer-copy">© {new Date().getFullYear()} Hana Benko.</p>
      </footer>
    </div>
  );
}
