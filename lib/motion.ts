import type { Variants, Transition } from "framer-motion";

/** One easing curve for the whole site. Motion language, not decoration. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const DURATION = { fast: 0.32, mid: 0.72, slow: 1.15, image: 1.25 } as const;

export const transition = (duration: number = DURATION.mid, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/** Section-level entrance: soft and controlled. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: transition(DURATION.mid, delay as number) }),
};

/** Display typography: a line rising out of its own mask. */
export const lineRise: Variants = {
  hidden: { y: "105%" },
  visible: (delay = 0) => ({ y: "0%", transition: transition(DURATION.slow, delay as number) }),
};

export const wordRise: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (delay = 0) => ({ y: "0%", opacity: 1, transition: transition(0.9, delay as number) }),
};

/** Photography: clipped, slightly oversized, settling into place. */
export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", scale: 1.09 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { clipPath: transition(DURATION.image), scale: transition(1.6) },
  },
};

export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;
