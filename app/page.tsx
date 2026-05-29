import { Photo } from "@/components/Photo";
import { SocialLinks } from "@/components/FooterIcons";
import { HomeCtas } from "@/components/HomeCtas";
import { HomeBio } from "@/components/HomeBio";

const BLOG_URL = "https://hanabenko.github.io";

export default function Home() {
  return (
    <div className="page--home">

      {/* Intro: bio left, portrait right */}
      <div className="home-intro">
        <div className="home-intro-text">
          <h1 className="home-name">
            Hana <span className="home-name-accent">Benko</span>
          </h1>
          <p className="home-tagline">CS student · researcher · builder</p>
          <HomeBio />
          <HomeCtas blogUrl={BLOG_URL} />
        </div>

        <aside className="home-intro-photo">
          <Photo
            src="/hana.png"
            alt="Hana"
            fill
            placeholderLabel=""
            sizes="(max-width: 580px) 90px, 155px"
            quality={92}
            priority
            objectFit="cover"
          />
        </aside>
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
