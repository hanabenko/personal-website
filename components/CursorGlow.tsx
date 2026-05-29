"use client";
import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let af: number;
    let x = -1000, y = -1000;

    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const tick = () => {
      el.style.transform = `translate(${x}px, ${y}px)`;
      af = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    af = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(af); };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden />;
}
