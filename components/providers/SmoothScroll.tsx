"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Lenis drives window scroll (not a transformed wrapper), so
 * position: sticky, anchor links and Framer Motion's useScroll
 * all keep working. Disabled entirely under reduced motion.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchor = (event: MouseEvent) => {
      const link = (event.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -10 });
    };
    document.addEventListener("click", onAnchor);

    const onLock = (event: Event) => {
      const locked = (event as CustomEvent<boolean>).detail;
      if (locked) lenis.stop();
      else lenis.start();
    };
    window.addEventListener("havn:scroll-lock", onLock as EventListener);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchor);
      window.removeEventListener("havn:scroll-lock", onLock as EventListener);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}

export const setScrollLock = (locked: boolean) =>
  window.dispatchEvent(new CustomEvent("havn:scroll-lock", { detail: locked }));
