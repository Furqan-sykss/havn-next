import { documentation } from "@/data/site";
import SectionLabel, { Spec } from "@/components/ui/SectionLabel";
import { LineReveal } from "@/components/motion/RevealText";
import Reveal from "@/components/motion/Reveal";
import RevealImage from "@/components/media/RevealImage";

function Caption({ text, plate }: { text: string; plate: string }) {
  return (
    <Reveal className="capt">
      <span className="cap">{text}</span>
      <span className="cap num">{plate}</span>
    </Reveal>
  );
}

/**
 * The process archive, on a dark surface so the work sits forward.
 * Seven plates, five different compositions — never one repeated grid.
 */
export default function CaseDocumentation() {
  return (
    <section className="doc" data-surface="dark" data-sec="work" aria-labelledby="h-doc">
      <div className="wrap">
        <Reveal>
          <SectionLabel title={documentation.file} note="Seven plates" sub="Case documentation" />
        </Reveal>

        <div className="doc-hero">
          <LineReveal as="h2" id="h-doc" className="h2 t" lines={documentation.statement} />
          <Reveal className="m" delay={0.16}>
            <p className="body">{documentation.intro}</p>
            <Spec rows={documentation.spec} />
          </Reveal>
        </div>

        <RevealImage {...documentation.cover} className="doc-fw" parallax={40} sizes="100vw" />
        <Caption text={documentation.coverCaption} plate="01 / 07" />

        <div className="doc-pair">
          {documentation.pair.map((media, i) => (
            <RevealImage key={media.tag} {...media} parallax={0} sizes="(max-width:900px) 100vw, 50vw" />
          ))}
        </div>
        <Caption text={documentation.pairCaption} plate="02 / 07" />

        <div className="doc-tri">
          {documentation.triptych.map((media, i) => (
            <RevealImage key={media.tag} {...media} parallax={0} sizes="(max-width:900px) 100vw, 33vw" />
          ))}
        </div>
        <Caption text={documentation.triptychCaption} plate="03 / 07" />

        <div className="doc-split">
          <RevealImage {...documentation.closing} parallax={0} sizes="(max-width:900px) 100vw, 45vw" />
          <Reveal className="tx">
            <p className="lead">{documentation.closingLead}</p>
            {documentation.closingBody.map((p) => (
              <p className="body" style={{ marginTop: 20 }} key={p.slice(0, 20)}>
                {p}
              </p>
            ))}
            <p className="body" style={{ marginTop: 16 }}>
              <strong>Result</strong> — {documentation.result}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
