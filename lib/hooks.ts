"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query. Returns false on the server so markup matches. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** True only for a mouse-driven, non-touch pointer. */
export const usePointerFine = () => useMediaQuery("(hover: hover) and (pointer: fine)");

/** Our own reduced-motion read, so server render never guesses. */
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
