"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** Section-level entrance. Deliberately quiet: metadata barely moves. */
export default function Reveal({ children, delay = 0, className, as = "div" }: { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "section" | "figure" | "li" | "p" }) {
  const reduced = usePrefersReducedMotion();
  const Component = motion[as];

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <Component className={className} variants={fadeUp} custom={delay} initial="hidden" animate="visible">
      {children}
    </Component>
  );
}
