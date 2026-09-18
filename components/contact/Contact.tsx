import { agency, contact } from "@/data/site";
import { LineReveal } from "@/components/motion/RevealText";
import Reveal from "@/components/motion/Reveal";

/**
 * The one bold move in the palette: a full burgundy field.
 * A statement first, the practical details underneath it — never a
 * form as the opening gesture.
 */
export default function Contact() {
  return (
    <section className="contact" id="contact" data-surface="wine" data-sec="contact" aria-labelledby="h-contact">
      <div className="wrap">
        <LineReveal
          as="h2"
          id="h-contact"
          className="display"
          lines={contact.statement}
          indents={["0px", "clamp(0px,14vw,300px)"]}
          stagger={0.11}
        />

        <div className="contact-grid">
          <Reveal className="a">
            <p className="lead" style={{ maxWidth: "32ch" }}>
              {contact.lead}
            </p>
            <p style={{ marginTop: "clamp(26px,3vw,40px)" }}>
              <a className="cta" href={`mailto:${agency.email}`}>
                <span>{contact.cta}</span>
                <span className="r">Reply within two days</span>
              </a>
            </p>
          </Reveal>

          <Reveal className="b" delay={0.08}>
            <p className="meta" style={{ marginBottom: 10 }}>
              General
            </p>
            <a className="mail" href={`mailto:${agency.email}`}>
              {agency.email}
            </a>
            <p className="meta" style={{ marginTop: 22 }}>
              New business
              <br />
              <strong>{agency.phone}</strong>
            </p>
            <p className="meta" style={{ marginTop: 18 }}>
              Taking work from
              <br />
              <strong>{agency.availability.replace("Taking work from ", "")}</strong>
            </p>
          </Reveal>

          <Reveal className="c" delay={0.14}>
            <p className="meta" style={{ marginBottom: 10 }}>
              Elsewhere
            </p>
            <nav className="soc" aria-label="Social">
              {agency.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener">
                  {s.label}
                </a>
              ))}
            </nav>
            <p className="meta" style={{ marginTop: 22 }}>
              {agency.address[0]}
              <br />
              {agency.address[1]}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
