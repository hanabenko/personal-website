"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const artworkUrl = "https://artsandculture.google.com/asset/m%C3%B6nch-am-meer-caspar-david-friedrich/KwEv_TMiJhn5kA";

export function PaintingIntro() {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        scene.style.setProperty("--painting-reveal", "1");
        return;
      }
      const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -scene.getBoundingClientRect().top / travel));
      const reveal = Math.min(1, Math.max(0, (progress - 0.04) / 0.68));
      scene.style.setProperty("--painting-reveal", reveal.toFixed(3));
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return (
    <section ref={sceneRef} className="painting-scene" aria-label="Introduction">
      <figure className="painting-frame">
        <div className="gallery-light" aria-hidden="true" />
        <div className="painting-inner">
          <div className="painting-artwork">
            <Image
              src="/monk-by-the-sea-google-arts.jpg"
              alt="A lone monk stands on a pale shore beneath a vast clouded sky and a dark sea."
              fill
              priority
              quality={92}
              sizes="(max-width: 600px) 92vw, 116vh"
              className="painting-image"
            />
            <div className="painting-name-wrap">
              <h1 className="painting-name">Hana Benko</h1>
            </div>
          </div>
          <figcaption className="painting-credit">
            <a href={artworkUrl} target="_blank" rel="noopener noreferrer">
              Caspar David Friedrich, <cite>Monk by the Sea</cite> · Alte Nationalgalerie · Image © bpk / Andres Kilger via Google Arts &amp; Culture ↗
            </a>
          </figcaption>
        </div>
      </figure>
    </section>
  );
}
