"use client";

import Link from "next/link";
import type { Project } from "@/data/site";
import RevealImage from "@/components/media/RevealImage";
import Reveal from "@/components/motion/Reveal";
import { Spec } from "@/components/ui/SectionLabel";

function Head({ project }: { project: Project }) {
  return (
    <div className="proj-head">
      <div>
        <span className="meta num" style={{ display: "block", marginBottom: 10 }}>
          {project.index}
        </span>
        <h3 className="proj-title">{project.title}</h3>
      </div>
      <span className="proj-cli">{project.client}</span>
    </div>
  );
}

function Foot({ project }: { project: Project }) {
  return (
    <div className="proj-foot">
      <span className="meta">{project.disciplines}</span>
      <span className="meta num">{project.year}</span>
    </div>
  );
}

/**
 * One project, four possible compositions. The variety is the point:
 * an exhibition hang, not a card grid. Layout is chosen in data.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const label = `${project.title}, ${project.disciplines}, ${project.year}`;

  if (project.layout === "cinematic" || project.layout === "fullwidth") {
    const full = project.layout === "fullwidth";
    return (
      <Link href={project.href} className={`proj ${full ? "p-c" : "p-a"}`} data-cursor="view" aria-label={label}>
        <Head project={project} />
        <RevealImage
          {...project.media[0]}
          className={full ? "fw" : ""}
          parallax={full ? 46 : 0}
          sizes="100vw"
        />
        <Foot project={project} />
      </Link>
    );
  }

  if (project.layout === "column") {
    return (
      <div className="proj p-b">
        <Link href={project.href} className="h" data-cursor="view" aria-label={label}>
          <Head project={project} />
        </Link>
        <RevealImage {...project.media[0]} className="f1" parallax={0} sizes="(max-width:900px) 100vw, 45vw" />
        <Reveal className="tx">
          <p className="lead" style={{ maxWidth: "26ch" }}>
            {project.lead}
          </p>
          <p className="body" style={{ marginTop: 18 }}>
            {project.description}
          </p>
          <Spec
            rows={[
              ["Role", project.role ?? "—"],
              ["Year", project.year],
            ]}
          />
        </Reveal>
        <RevealImage {...project.media[1]} className="f2" parallax={18} sizes="(max-width:900px) 64vw, 24vw" />
      </div>
    );
  }

  return (
    <div className="proj p-d">
      <Link href={project.href} className="h" data-cursor="view" aria-label={label}>
        <Head project={project} />
      </Link>
      <RevealImage {...project.media[0]} className="f1" parallax={0} sizes="(max-width:900px) 100vw, 55vw" />
      <RevealImage {...project.media[1]} className="f2" parallax={40} sizes="(max-width:900px) 78vw, 45vw" />
      <Reveal className="tx">
        <p className="body">{project.description}</p>
        <Spec
          rows={[
            ["Role", project.role ?? "—"],
            ["Year", project.year],
          ]}
        />
      </Reveal>
    </div>
  );
}
