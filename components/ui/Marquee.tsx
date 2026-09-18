"use client";

import { clientIndex } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/hooks";
import Reveal from "@/components/motion/Reveal";

/**
 * One moving band, used once, bounded by the measure rather than the
 * viewport. It carries the client roster, so it reads as an index
 * rather than a strip of discipline nouns. Still under reduced motion.
 */
export default function Marquee({ items = clientIndex, repeat = 4 }: { items?: readonly string[]; repeat?: number }) {
  const reduced = usePrefersReducedMotion();

  const row = (
    <span>
      {items.map((name, i) => (
        <span key={name + i}>
          {name} <i>✳</i>{" "}
        </span>
      ))}
    </span>
  );

  return (
    <div className="wrap marq-wrap">
      <Reveal className="marq-label">
        <span className="meta">Recently, for</span>
        <span className="meta num">2024—2026</span>
      </Reveal>

      <div className="marq" aria-hidden="true">
        {Array.from({ length: reduced ? 1 : repeat }).map((_, i) => (
          <div className="t" key={i}>
            {row}
          </div>
        ))}
      </div>

      <Reveal className="marq-foot">
        <span className="meta">Sixty-one engagements</span>
        <span className="meta">Eight a year, by choice</span>
      </Reveal>
    </div>
  );
}
