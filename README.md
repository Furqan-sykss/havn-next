# HAVN — independent creative studio

An art-directed studio site built with Next.js (App Router), TypeScript, Tailwind,
Framer Motion and Lenis.

```bash
npm install
npm run dev
```

## Where things live

```
app/            layout (fonts, metadata), page, globals.css (the design system)
components/     navigation · hero · motion · media · projects · gallery
                services · process · studio · contact · ui · providers
data/site.ts    ALL content — copy, projects, services, process, quotes
lib/            motion language (easing, variants) and SSR-safe hooks
public/images/  drop photography here
```

## Replacing the brand

Everything a client would change is in `data/site.ts`. Change `agency.name` and the
wordmark, preloader, navigation, menu and footer all follow.

## Replacing imagery

Each image is a `Media` object. With no `src` it renders the art-directed placeholder
plate, so composition can be judged before assets exist:

```ts
{ alt: "Aureus bottle photography", tag: "[IMAGE] project-01", tone: "c" }
```

Add a `src` and `RevealImage` switches to `next/image` with `fill`, correct `sizes`
and the same clip-path reveal. No component changes required.

```ts
{ src: "/images/project-01.jpg", alt: "…", tag: "…", tone: "c" }
```

`tone` (`a`–`d`) only tints the placeholder; it is ignored once a real image is set.

## Spacing

Sections deliberately do **not** share a padding scale. `--s1/2/3` exist as a base,
but `.identity`, `.work`, `.doc`, `.srv`, `.proc`, `.cult` and `.quote` each declare
their own top and bottom values in `globals.css` to create compression and expansion —
`.work` opens tight against the client index and closes with a long drop; `.cult` is
the airiest section on the page; `.quote` is the most compressed.

## Design system

Tokens are CSS custom properties in `app/globals.css`: `--background`, `--foreground`,
`--muted`, `--accent`, `--surface`, `--border`, plus spacing (`--s1/2/3`), the easing
curve (`--e: cubic-bezier(.16,1,.3,1)`) and durations. Sections opt into a palette with
`data-surface="dark"` or `data-surface="wine"`, which re-declares the same tokens —
so every child, including borders and captions, adapts without a single override.

Tailwind is deliberately thin: it mirrors the tokens for one-off utilities, while the
art direction stays legible in one stylesheet.

## Motion

One easing curve, four durations, defined in `lib/motion.ts`. Hierarchy is intentional:
the hero headline performs, section content fades and lifts, photography clips and
settles, metadata barely moves. `prefers-reduced-motion` is honoured in both the CSS
and every component — Lenis does not initialise, parallax is skipped, the marquee
holds still, the cursor is not rendered, and all content is immediately visible.

## Accessibility notes

Semantic landmarks and a single h1; skip link; visible focus rings on every surface;
the service index is a real disclosure pattern (`aria-expanded` / `aria-controls`);
the mobile menu traps focus, closes on Escape, and is removed from the tab order when
shut; the process caption is `aria-live`; the custom cursor is `pointer-events: none`
and desktop-only.
