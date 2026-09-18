"use client";

import { useEffect, useRef, useState } from "react";
import { usePointerFine, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Pointer-fine only, pointer-events: none, purely additive.
 * Expands to a labelled disc over project links; never blocks a click.
 */
export default function CustomCursor() {
  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "view" | "link">("idle");

  useEffect(() => {
    if (!fine || reduced) return;
    const el = ref.current;
    if (!el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const render = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`;
      raf = Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3 ? requestAnimationFrame(render) : 0;
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="view"]')) setState("view");
      else if (target.closest("a, button")) setState("link");
      else setState("idle");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <div ref={ref} className={`cur ${state === "view" ? "big" : state === "link" ? "lk" : ""}`} aria-hidden="true">
      <span className="lbl">View</span>
    </div>
  );
}
