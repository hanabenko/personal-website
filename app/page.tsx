import Link from "next/link";
import { Photo } from "@/components/Photo";
import { SocialLinks } from "@/components/FooterIcons";
import { HomeBio } from "@/components/HomeBio";
import { PaintingIntro } from "@/components/PaintingIntro";

export default function Home() {
  return (
    <div className="page--home">
      <PaintingIntro />

      <div className="home-after-painting">
        <section id="about" className="home-about-grid" aria-label="About Hana Benko">
          <div className="home-about-bio">
            <HomeBio />
          </div>

          <nav className="home-about-links" aria-label="More from Hana">
            <div className="home-about-internal-links">
              <Link href="/projects">Projects</Link>
              <Link href="/blog">Writing</Link>
            </div>
            <SocialLinks />
          </nav>

          <aside className="home-about-photo">
            <Photo
              src="/hana.png"
              alt="Portrait of Hana Benko"
              fill
              placeholderLabel=""
              sizes="(max-width: 700px) 45vw, 260px"
              quality={92}
              objectFit="cover"
            />
          </aside>
        </section>

        <footer className="home-footer">
          <p className="home-footer-copy">© {new Date().getFullYear()} Hana Benko.</p>
        </footer>
      </div>
    </div>
  );
}
