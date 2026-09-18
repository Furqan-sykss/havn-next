"use client";

import { useEffect, useState } from "react";
import { agency } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * The opening shot: identity, a counter, a rule that fills,
 * then a clip-path wipe into the hero. ~1.4s total and it never
 * waits on anything it doesn't need to.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout = 0;

    if (reduced) {
      timeout = window.setTimeout(() => {
        setDone(true);
        onDone();
      }, 0);
      return () => window.clearTimeout(timeout);
    }

    const start = performance.now();
    const DURATION = 1250;
    let frame = 0;

    const tick = (now: number) => {
      const k = Math.min((now - start) / DURATION, 1);
      setProgress(Math.round((1 - Math.pow(1 - k, 3)) * 100));
      if (k < 1) frame = requestAnimationFrame(tick);
      else
        timeout = window.setTimeout(() => {
          setDone(true);
          onDone();
        }, 220);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [reduced, onDone]);

  return (
    <div id="pre" className={done ? "done" : undefined} aria-hidden="true">
      <div className="top">
        <span className="ct">{agency.descriptor}</span>
        <span className="ct">Rotterdam / 51.92°N</span>
      </div>
      <div className="mark">
        {agency.name.split("").map((letter, i) => (
          <span key={letter + i} style={{ animationDelay: `${0.05 + i * 0.08}s` }}>
            {letter}
          </span>
        ))}
      </div>
      <div className="bot">
        <span className="ct">{progress < 100 ? "Loading" : "Ready"}</span>
        <span className="bar">
          <i style={{ right: `${100 - progress}%` }} />
        </span>
        <span className="ct num">{String(progress).padStart(3, "0")}</span>
      </div>
    </div>
  );
}
