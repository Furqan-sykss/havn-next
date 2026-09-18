"use client";

import { motion } from "framer-motion";
import { lineRise, wordRise, VIEWPORT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

export interface DisplayLine {
  text: string;
  /** set in the display serif, italic — the second voice of the type system */
  serif?: boolean;
}

interface LineRevealProps {
  lines: DisplayLine[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** per-line indents, in any CSS length; keeps composition data-driven */
  indents?: string[];
  stagger?: number;
  delay?: number;
  animate?: boolean;
  id?: string;
}

/**
 * LineReveal — the studio's primary display treatment.
 * Each line sits in its own mask and rises. Used for headlines only.
 */
export function LineReveal({ lines, className = "", as: Tag = "h2", indents, stagger = 0.09, delay = 0, animate, id }: LineRevealProps) {
  const reduced = usePrefersReducedMotion();
  const controlled = typeof animate === "boolean";

  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <span key={line.text} className="line-mask" style={indents?.[i] ? { paddingLeft: indents[i] } : undefined}>
          <motion.span
            variants={reduced ? undefined : lineRise}
            custom={delay + i * stagger}
            initial={reduced ? false : "hidden"}
            {...(controlled ? { animate: animate ? "visible" : "hidden" } : { whileInView: "visible", viewport: VIEWPORT })}
            className={line.serif ? "ser" : undefined}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * WordReveal — reserved for short statements where line masking
 * would be too heavy. Never used on body copy.
 */
export function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="line-mask" style={{ display: "inline-block" }}>
          <motion.span style={{ display: "inline-block" }} variants={wordRise} custom={delay + i * 0.04} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}
