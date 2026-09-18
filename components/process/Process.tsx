"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { process } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";

const STAGE_IMAGES = [
  "/images/marvin-meyer-SYTO3xs06fU-unsplash.jpg",
  "/images/kobu-agency-csJt89dL9pE-unsplash.jpg",
  "/images/cherrydeck-Qx7A7SChpnI-unsplash.jpg",
  "/images/labib-jaffar-ylx85nvunvw-unsplash.jpg",
  "/images/cherrydeck-rMILC1PIwM0-unsplash.jpg",
] as const;

/**
 * Editorial timeline. The stage list scrolls past a sticky plate;
 * the active stage drives the rule, the caption and the image layer.
 */
export default function Process() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = stepRefs.current.indexOf(entry.target as HTMLLIElement);
          if (index > -1) setActive(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stage = process[active];

  return (
    <section className="proc" data-surface="dark" data-sec="studio" aria-label="Process">
      <div className="wrap">
        <Reveal>
          <SectionLabel title="How the work happens" note="Five stages" sub="Twelve to twenty weeks" />
        </Reveal>

        <div className="proc-grid">
          <div className="proc-sticky">
            <figure className="fig proc-fig in">
              <div className="inner">
                {process.map((s, i) => (
                  <div key={s.index} className={`layer ${i === active ? "on" : ""}`}>
                    <Image src={STAGE_IMAGES[i]} alt={`${s.title} process stage`} fill sizes="(max-width: 900px) 0px, 42vw" className="object-cover" />
                  </div>
                ))}
              </div>
              <figcaption className="ph-tag">
                [IMAGE] stage {stage.index} — {stage.title.toLowerCase()}
              </figcaption>
            </figure>
            <p className="cap" style={{ marginTop: 10 }} aria-live="polite">
              {stage.caption}
            </p>
          </div>

          <ol className="proc-list">
            {process.map((s, i) => (
              <li
                key={s.index}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={`step ${i === active ? "on" : ""}`}
              >
                <span className="bar" aria-hidden="true" />
                <div className="top">
                  <span className="n num">{s.index}</span>
                  <h3 className="ti">{s.title}</h3>
                </div>
                <p className="d">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
