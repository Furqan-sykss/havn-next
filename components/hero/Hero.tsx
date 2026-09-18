"use client";

import { hero, agency } from "@/data/site";
import { LineReveal } from "@/components/motion/RevealText";
import Reveal from "@/components/motion/Reveal";
import RevealImage from "@/components/media/RevealImage";

/**
 * The opening shot. Metadata rule, a four-line statement stepped
 * across the grid, then a wide photographic plate. Motion hierarchy:
 * the headline performs, everything else barely moves.
 */
export default function Hero({ start }: { start: boolean }) {
  return (
    <section className="hero wrap" data-sec="top" aria-labelledby="h1">
      <Reveal className="hero-meta">
        <span className="meta">
          {agency.descriptor}
          <br />
          <strong>Since {agency.founded}</strong>
        </span>
        <span className="meta">
          Digital · Brand · Motion
          <br />
          <strong>{agency.location} / Worldwide</strong>
        </span>
        <span className="meta" style={{ textAlign: "right" }}>
          Selected index
          <br />
          <strong className="num">2016—2026</strong>
        </span>
      </Reveal>

      <LineReveal
        as="h1"
        id="h1"
        className="display hero-title"
        lines={hero.lines}
        indents={["0px", "clamp(0px,10vw,220px)", "clamp(0px,4vw,88px)", "0px"]}
        animate={start}
        delay={0.06}
        stagger={0.12}
      />

      <div className="hero-body">
        <Reveal className="a" delay={0.68}>
          <p className="lead">{hero.lead}</p>
        </Reveal>
        <Reveal className="b" delay={0.76}>
          <p className="body">{hero.body}</p>
          <div className="scroll-ind">
            <span className="track">
              <i />
            </span>
            <span className="meta">Scroll</span>
          </div>
        </Reveal>
        <Reveal className="c" delay={0.82}>
          <span className="meta">
            Fig.
            <br />
            <strong className="num">001</strong>
          </span>
        </Reveal>
      </div>

      {/* The photograph bleeds off the right edge; its caption occupies the
          gutter beside it. The empty left column is the composition. */}
      <div className="hero-plate">
        <Reveal className="hero-side" delay={0.9}>
          <span className="cap num" style={{ display: "block" }}>
            Fig. 001
          </span>
          <p className="cap" style={{ marginTop: 8 }}>
            {hero.caption}
          </p>
          <p className="cap num" style={{ marginTop: "auto" }}>
            {agency.coordinates}
          </p>
        </Reveal>
        <RevealImage {...hero.media} className="hero-fig" parallax={40} priority sizes="85vw" />
      </div>
    </section>
  );
}
