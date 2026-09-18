import { projects } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import ProjectCard from "./ProjectCard";

export default function SelectedWork() {
  return (
    <section className="work wrap" id="work" data-sec="work" aria-label="Selected work">
      <Reveal>
        <SectionLabel title="Selected work" note="Four of eight" sub="2024—2026" />
      </Reveal>

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      <Reveal
        className="work-tail"
      >
        <span className="meta">Full index available on request</span>
        <a
          className="meta"
          href="#contact"
          style={{ color: "var(--fg)", borderBottom: "1px solid var(--fg)", paddingBottom: 2 }}
        >
          Ask for the full index
        </a>
      </Reveal>
    </section>
  );
}
