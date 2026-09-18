"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services, type Tone } from "@/data/site";
import Reveal from "@/components/motion/Reveal";
import { usePointerFine } from "@/lib/hooks";
import { EASE } from "@/lib/motion";

const TONE_CLASS: Record<Tone, string> = { a: "", b: "v2", c: "v3", d: "v4" };

/**
 * An index, not a card set. Desktop: hover moves the title, lifts the
 * number and swaps a preview plate. Every size: the row is a real
 * button that expands an accessible panel.
 */
export default function ServiceIndex() {
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [previewTop, setPreviewTop] = useState(0);
  const fine = usePointerFine();
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  return (
    <section className="srv wrap" id="services" data-sec="services" aria-label="Capabilities">
      <Reveal className="srv-note">
        <span className="meta note">
          Six disciplines
          <br />
          All of it in-house
        </span>
      </Reveal>

      <div className="srv-wrap" ref={wrapRef} onMouseLeave={() => setHovered(null)}>
        {fine && (
          <div className={`srv-preview ${hovered !== null ? "on" : ""}`} style={{ top: previewTop }} aria-hidden="true">
            <div className={`ph ${hovered !== null ? TONE_CLASS[services[hovered].tone] : ""}`} />
            <span className="ph-tag">[IMAGE] service preview</span>
          </div>
        )}

        {services.map((service, i) => {
          const isOpen = open === service.id;
          return (
            <div
              key={service.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={`srv-item ${isOpen ? "act" : ""}`}
              onMouseEnter={() => {
                if (!fine) return;
                setHovered(i);
                setPreviewTop((itemRefs.current[i]?.offsetTop ?? 0) - 40);
              }}
            >
              <button
                className="srv-btn"
                aria-expanded={isOpen}
                aria-controls={`panel-${service.id}`}
                onClick={() => setOpen(isOpen ? null : service.id)}
              >
                <span className="srv-n num">{service.index}</span>
                <span className="srv-t">{service.title}</span>
                <span className="srv-plus" aria-hidden="true">
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`panel-${service.id}`}
                    className="srv-panel"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <div className="in">
                      <p className="body d">{service.description}</p>
                      <div className="tags">
                        {service.tags.map((tag) => (
                          <span className="meta" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
