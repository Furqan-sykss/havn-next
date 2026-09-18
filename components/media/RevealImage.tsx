"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { imageReveal } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import type { Media, Tone } from "@/data/site";

const TONE_CLASS: Record<Tone, string> = { a: "", b: "v2", c: "v3", d: "v4" };

const LOCAL_IMAGE_BY_ALT: Record<string, string> = {
  "Reference wall on the studio's second floor": "/images/roberto-nickson-TB_cvdUHUuc-unsplash.jpg",
  "The studio, ground floor": "/images/cherrydeck-UpsEF48wAgk-unsplash.jpg",
  "Aureus bottle photography": "/images/patrik-michalicka-r3iAqHb7JWs-unsplash.jpg",
  "Mono Editions catalogue, portrait crop": "/images/balazs-ketyi-9VzoRKfBsMM-unsplash.jpg",
  "Specimen detail": "/images/balazs-ketyi-FeuEg-8XlA8-unsplash.jpg",
  "Nordhavn House interior": "/images/daniela-almeida-ys2phgbHfJU-unsplash.jpg",
  "On-air identity frame": "/images/krisztian-tabori-IyaNci0CyRk-unsplash.jpg",
  "Title sequence frame": "/images/nikita-kachanovsky-g-YiX8ynmnY-unsplash.jpg",
  "Home page, desktop": "/images/kobu-agency-csJt89dL9pE-unsplash.jpg",
  "Catalogue view": "/images/marvin-meyer-SYTO3xs06fU-unsplash.jpg",
  "Weight slider detail": "/images/labib-jaffar-ylx85nvunvw-unsplash.jpg",
  "Grid studies": "/images/cherrydeck-Qx7A7SChpnI-unsplash.jpg",
  "Mobile specimen": "/images/cherrydeck-rMILC1PIwM0-unsplash.jpg",
  "Abandoned exploration": "/images/cherrydeck-oVWc3lehRz8-unsplash.jpg",
  "Typography detail": "/images/balazs-ketyi-FeuEg-8XlA8-unsplash.jpg",
  "Thursday print review": "/images/cherrydeck-UpsEF48wAgk-unsplash.jpg",
  "Studio detail": "/images/roberto-nickson-TB_cvdUHUuc-unsplash.jpg",
};

interface Props extends Media {
  className?: string;
  /** parallax travel in px; 0 disables. Mobile halves it automatically. */
  parallax?: number;
  priority?: boolean;
  sizes?: string;
}

/**
 * RevealImage — the only way photography enters the page.
 * Clip-path + scale on entry, optional parallax on the inner layer.
 * With no `src` it renders the art-directed placeholder plate, so the
 * composition can be judged before a single asset exists.
 */
export default function RevealImage({ src, alt, tag, tone = "a", className = "", parallax = 0, priority = false, sizes = "(max-width: 900px) 100vw, 60vw" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const imageSrc = src ?? LOCAL_IMAGE_BY_ALT[alt];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [parallax * -0.5, parallax * 0.5]);

  return (
    <motion.figure ref={ref} className={`fig ${className}`}>
      <motion.div className="inner" variants={reduced ? undefined : imageReveal} initial={reduced ? false : "hidden"} animate="visible">
        <motion.div className="par" style={reduced || !parallax ? undefined : { y }}>
          {imageSrc ? <Image src={imageSrc} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" /> : <div className={`ph ${TONE_CLASS[tone]}`} role="img" aria-label={alt} />}
        </motion.div>
      </motion.div>
      <figcaption className="ph-tag">{tag}</figcaption>
    </motion.figure>
  );
}
