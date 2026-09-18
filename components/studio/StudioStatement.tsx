import { studio } from "@/data/site";
import { Spec } from "@/components/ui/SectionLabel";
import { LineReveal } from "@/components/motion/RevealText";
import Reveal from "@/components/motion/Reveal";
import RevealImage from "@/components/media/RevealImage";

/** Magazine spread: statement across eight columns, specification stack beside it. */
export default function StudioStatement() {
  return (
    <section className="identity wrap" id="studio" data-sec="studio" aria-labelledby="h-identity">
      <div className="grid">
        <LineReveal as="h2" id="h-identity" className="h2 st" lines={studio.statement} indents={["0px", "0px", "clamp(30px,7vw,150px)"]} />

        <Reveal className="side" delay={0.2}>
          <p className="body" style={{ color: "var(--fg)" }}>
            {studio.summary}
          </p>
          <Spec rows={studio.spec} />
        </Reveal>

        <RevealImage {...studio.media} className="identity-fig" parallax={26} sizes="(max-width:900px) 100vw, 42vw" />

        <Reveal className="identity-txt">
          <p className="lead" style={{ maxWidth: "30ch" }}>
            {studio.lead}
          </p>
          {studio.paragraphs.map((p) => (
            <p className="body" style={{ marginTop: 18 }} key={p.slice(0, 24)}>
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
