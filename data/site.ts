/* ============================================================
   HAVN — content layer.
   Everything a client would ever want to change lives here.
   Swap `image: undefined` for `image: "/images/project-01.jpg"`
   and the placeholder becomes a real next/image. Nothing else
   in the codebase needs touching.
   ============================================================ */

export type Tone = "a" | "b" | "c" | "d";

export interface Media {
  /** e.g. "/images/project-01.jpg" — omit to render the art-directed placeholder */
  src?: string;
  alt: string;
  /** caption shown on the placeholder plate */
  tag: string;
  tone?: Tone;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  client: string;
  year: string;
  disciplines: string;
  /** short editorial lead used by the column composition */
  lead?: string;
  description?: string;
  role?: string;
  href: string;
  /** composition: full-bleed / editorial column / edge-to-edge / overlapping pair */
  layout: "cinematic" | "column" | "fullwidth" | "overlap";
  media: Media[];
}

export interface Service {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  tone: Tone;
}

export interface Stage {
  index: string;
  title: string;
  description: string;
  caption: string;
  tone: Tone;
}

export interface Quote {
  text: string;
  emphasis: string;
  name: string;
  role: string;
}

export const agency = {
  name: "HAVN",
  mark: "HAVN®",
  descriptor: "Independent creative studio",
  founded: "2016",
  location: "Rotterdam, NL",
  address: ["Veerlaan 12b", "3072 AN Rotterdam, NL"],
  coordinates: "51.9244° N / 4.4777° E",
  email: "studio@havn.co",
  phone: "+31 10 000 0000",
  team: "14",
  clients: "60+",
  projectsPerYear: "8",
  availability: "Taking work from March 2026",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;

export const nav = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Studio", href: "#studio", id: "studio" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const hero = {
  lines: [
    { text: "Built", serif: false },
    { text: "slowly.", serif: true },
    { text: "Felt", serif: false },
    { text: "instantly.", serif: true },
  ],
  lead: "We design and build websites for brands that intend to be looked at — carefully, and for longer than a scroll.",
  body: "Fourteen people. One room. Work made at the speed it deserves rather than the speed it was asked for.",
  media: { alt: "Reference wall on the studio's second floor", tag: "[IMAGE] Studio archive — 2400×1400", tone: "a" } as Media,
  caption: "Fig. 001 — Reference wall, second floor. Photographed on 35mm.",
};

export const studio = {
  statement: [
    { text: "A small room of", serif: false },
    { text: "people who argue", serif: false },
    { text: "about millimetres.", serif: true },
  ],
  summary:
    "HAVN is an independent studio working across digital design, development and motion. We take on eight projects a year, which is fewer than we could — and exactly as many as we can do properly.",
  spec: [
    ["Founded", agency.founded],
    ["Based", agency.location],
    ["Team", agency.team],
    ["Focus", "Digital / Brand / Motion / Build"],
    ["Clients", agency.clients],
  ] as [string, string][],
  lead: "Most of our work begins as an argument about one detail, and ends as a thing nobody can stop looking at.",
  paragraphs: [
    "We don't run a new-business department, a growth funnel or a methodology with a name. We run a studio. Briefs arrive, we read them properly, and we say yes to the ones we would want to show people three years from now.",
    "Everything is designed and built in-house: art direction, interface, motion, front-end. Nothing gets handed to a stranger halfway through.",
  ],
  media: { alt: "The studio, ground floor", tag: "[IMAGE] Studio, ground floor", tone: "b" } as Media,
};

/** The moving band is a client index — information, not decoration. */
export const clientIndex = [
  "Aureus",
  "Mono Editions",
  "Nordhavn House",
  "Salt & Signal",
  "Form Atelier",
  "Kessler Bureau",
];

export const projects: Project[] = [
  {
    id: "aureus",
    index: "01",
    title: "Aureus",
    client: "Mineral water, Iceland",
    year: "2026",
    disciplines: "Brand system · Website · Motion",
    href: "/work/aureus",
    layout: "cinematic",
    media: [{ alt: "Aureus bottle photography", tag: "[IMAGE] project-01 — 2800×1600", tone: "c" }],
  },
  {
    id: "mono-editions",
    index: "02",
    title: "Mono Editions",
    client: "Independent type foundry",
    year: "2025",
    disciplines: "Platform · Motion · Specimen engine",
    lead: "A retail platform for typefaces where the typefaces do the selling.",
    description:
      "Specimens render live in the browser, at any size, in any of the foundry's eleven weights. The interface steps back until it is almost furniture.",
    role: "Design, build, motion",
    href: "/work/mono-editions",
    layout: "column",
    media: [
      { alt: "Mono Editions catalogue, portrait crop", tag: "[IMAGE] project-02-a — 1400×2000", tone: "a" },
      { alt: "Specimen detail", tag: "[IMAGE] project-02-b", tone: "d" },
    ],
  },
  {
    id: "nordhavn",
    index: "03",
    title: "Nordhavn House",
    client: "Hotel & residences, Copenhagen",
    year: "2025",
    disciplines: "Art direction · Website · Booking experience",
    href: "/work/nordhavn-house",
    layout: "fullwidth",
    media: [{ alt: "Nordhavn House interior", tag: "[IMAGE] project-03 — 3200×1400", tone: "b" }],
  },
  {
    id: "salt-signal",
    index: "04",
    title: "Salt & Signal",
    client: "Broadcast studio, Lisbon",
    year: "2024",
    disciplines: "Motion · Identity",
    description:
      "A motion identity built from one rule: every transition is a cut, never a fade. Forty-one on-air assets, one system.",
    role: "Motion, identity",
    href: "/work/salt-and-signal",
    layout: "overlap",
    media: [
      { alt: "On-air identity frame", tag: "[IMAGE] project-04-a", tone: "d" },
      { alt: "Title sequence frame", tag: "[IMAGE] project-04-b", tone: "c" },
    ],
  },
];

export const documentation = {
  file: "File 02 / Mono Editions",
  statement: [
    { text: "Eleven weights,", serif: false },
    { text: "one quiet shelf.", serif: true },
  ],
  intro:
    "The archive below is a working record: explorations, rejected routes, interface details and the three screens that survived.",
  spec: [
    ["Client", "Mono Editions"],
    ["Year", "2025"],
    ["Role", "Art direction, design, front-end"],
    ["Services", "Platform, motion, type specimen engine"],
  ] as [string, string][],
  cover: { alt: "Home page, desktop", tag: "[IMAGE] doc-01 cover — 3000×1500", tone: "a" } as Media,
  coverCaption: "Pl. 01 — Home, desktop at 1440. Specimen set in the foundry's own Mono Grotesk.",
  pair: [
    { alt: "Catalogue view", tag: "[IMAGE] doc-02 desktop", tone: "b" },
    { alt: "Weight slider detail", tag: "[IMAGE] doc-03 detail", tone: "d" },
  ] as Media[],
  pairCaption: "Pl. 02—03 — Catalogue view and the weight slider, which was redrawn six times.",
  triptych: [
    { alt: "Grid studies", tag: "[IMAGE] doc-04 process", tone: "c" },
    { alt: "Mobile specimen", tag: "[IMAGE] doc-05 mobile", tone: "a" },
    { alt: "Abandoned exploration", tag: "[IMAGE] doc-06 exploration", tone: "b" },
  ] as Media[],
  triptychCaption: "Pl. 04—06 — Early grid studies, mobile specimen, and a route we abandoned in week two.",
  closing: { alt: "Typography detail", tag: "[IMAGE] doc-07 typography", tone: "d" } as Media,
  closingLead: "The specimen engine renders 240 glyphs per weight without a single image file.",
  closingBody: [
    "Every character is live text. Buyers can type their own name, their own headline, their own paragraph of nonsense, and the page answers instantly. It made the catalogue 40% lighter and considerably more convincing.",
  ],
  result: "2.4× licence sales in the first quarter, and a foundry that no longer needs to explain what its typefaces are for.",
};

export const services: Service[] = [
  {
    id: "art-direction",
    index: "01",
    title: "Art direction",
    description:
      "The look, and the reason for it. Photography, typography, tone and the rules that keep a brand recognisable when we are no longer in the room.",
    tags: ["Visual language", "Photography", "Type systems", "Guidelines"],
    tone: "b",
  },
  {
    id: "website-design",
    index: "02",
    title: "Website design",
    description:
      "Editorial thinking applied to screens. Composition, hierarchy and pacing designed for the page someone actually lands on, not the one in the deck.",
    tags: ["Art-directed layout", "Design systems", "Prototyping", "Copy"],
    tone: "c",
  },
  {
    id: "creative-development",
    index: "03",
    title: "Creative development",
    description:
      "We build what we draw. Front-end engineering with performance budgets agreed before the first component, and no gap between the design and the thing that ships.",
    tags: ["Next.js / React", "WebGL", "Headless CMS", "Performance"],
    tone: "d",
  },
  {
    id: "motion",
    index: "04",
    title: "Motion & interaction",
    description:
      "Movement with a job to do. Transitions that explain what changed, timing that matches the brand's temperament, and a reduced-motion version that loses nothing.",
    tags: ["Interface motion", "Broadcast", "Title sequences", "Sound"],
    tone: "a",
  },
  {
    id: "brand-experience",
    index: "05",
    title: "Brand experience",
    description:
      "Identity that survives contact with the real world — on a phone, a façade, a bottle and a ninety-second film — without being redrawn each time.",
    tags: ["Identity", "Naming", "Packaging", "Environments"],
    tone: "b",
  },
  {
    id: "creative-technology",
    index: "06",
    title: "Creative technology",
    description:
      "The odd ones. Configurators, generative specimen engines, installations, and tools built for one client and no one else.",
    tags: ["Prototypes", "Generative systems", "Installations", "Tooling"],
    tone: "c",
  },
];

export const process: Stage[] = [
  {
    index: "01",
    title: "Read",
    description:
      "We spend the first two weeks listening. Stakeholders, sales calls, support tickets, the competitor everyone is quietly worried about. Nothing is drawn yet.",
    caption: "Stage 01 of 05 — Reading the brief, the business and the room it lives in.",
    tone: "a",
  },
  {
    index: "02",
    title: "Frame",
    description:
      "One page. The idea, the audience, the tone and the three things the work has to do. If it can't fit on the page, it isn't clear yet.",
    caption: "Stage 02 of 05 — One page that everyone can agree on before anything is drawn.",
    tone: "b",
  },
  {
    index: "03",
    title: "Draw",
    description:
      "Art direction first, always. Two routes, fully composed, with real copy and real images — never greyboxes and never three safe variations of the same idea.",
    caption: "Stage 03 of 05 — Two art-directed routes, composed with real copy.",
    tone: "c",
  },
  {
    index: "04",
    title: "Build",
    description:
      "Design and engineering run together from week one. You review in the browser, on your own phone, with the motion in place — not as a flat image.",
    caption: "Stage 04 of 05 — Design and engineering running in the same week.",
    tone: "d",
  },
  {
    index: "05",
    title: "Release",
    description:
      "Launch, then stay. Six weeks of measurement, tuning and the small corrections that only appear once real people arrive.",
    caption: "Stage 05 of 05 — Launch, measure, and correct what only real users reveal.",
    tone: "b",
  },
];

export const culture = {
  statement: [
    { text: "The details nobody", serif: false },
    { text: "notices are the ones", serif: true },
    { text: "people remember.", serif: false },
  ],
  media: [
    { alt: "Thursday print review", tag: "[IMAGE] studio-01 — 2000×1400", tone: "c" },
    { alt: "Studio detail", tag: "[IMAGE] studio-02", tone: "a" },
  ] as Media[],
  caption: "Fig. 014 — Thursday print review. Everything gets printed before it gets approved.",
  spec: [
    ["Studio", "Katendrecht, Rotterdam"],
    ["People", agency.team],
    ["Projects / year", agency.projectsPerYear],
    ["Coffee / day", "31"],
  ] as [string, string][],
};

export const quotes: Quote[] = [
  {
    text: "They asked better questions than our board did, and then",
    emphasis: "answered them in the design.",
    name: "Ilse Brandt",
    role: "Managing Director, Mono Editions",
  },
  {
    text: "Six weeks after launch the site was still getting emails about it.",
    emphasis: "That never happens.",
    name: "Petra Sandvik",
    role: "Brand Lead, Aureus",
  },
  {
    text: "We came for a website. We left with a way of",
    emphasis: "looking at ourselves.",
    name: "Joaquim Reis",
    role: "Founder, Salt & Signal",
  },
];

export const contact = {
  statement: [
    { text: "Have something", serif: false },
    { text: "worth making?", serif: true },
  ],
  lead: "Tell us what it is, who it's for, and when it has to exist. A paragraph is plenty — we'll reply within two days.",
  cta: "Start a project",
};
