import { culture } from "@/data/site";
import { Spec } from "@/components/ui/SectionLabel";
import { LineReveal } from "@/components/motion/RevealText";
import Reveal from "@/components/motion/Reveal";
import RevealImage from "@/components/media/RevealImage";

/** The calm before the close. Almost nothing happens here, deliberately. */
export default function Culture() {
  return (
    <section className="cult wrap" data-sec="studio" aria-labelledby="h-cult">
      <div className="grid">
        <LineReveal as="h2" id="h-cult" className="h2 cult-st" lines={culture.statement} />
        <RevealImage {...culture.media[0]} className="cult-fig" parallax={28} sizes="(max-width:900px) 100vw, 55vw" />
        <RevealImage {...culture.media[1]} className="cult-fig2" parallax={16} sizes="(max-width:900px) 62vw, 30vw" />
        <Reveal className="cult-meta">
          <p className="cap">{culture.caption}</p>
          <Spec rows={culture.spec} />
        </Reveal>
      </div>
    </section>
  );
}
