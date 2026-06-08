"use client";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "glow-cursor";
const TOGGLE_KEY = "g";

export default function GlowCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Persist preference
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "on") setEnabled(true);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  }, [enabled]);

  // Keyboard toggle
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.key.toLowerCase() === TOGGLE_KEY &&
        !e.metaKey && !e.ctrlKey && !e.altKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        setEnabled((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let tx = -600, ty = -600;
    let cx = -600, cy = -600;
    let raf: number;

    function animate() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (ref.current) {
        ref.current.style.left = `${cx}px`;
        ref.current.style.top = `${cy}px`;
      }
      raf = requestAnimationFrame(animate);
    }

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return (
    <div
      className="glow-cursor"
      ref={ref}
      aria-hidden="true"
      style={{ opacity: enabled ? 1 : 0, pointerEvents: "none" }}
    />
  );
}
