"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quotes } from "@/data/site";
import { EASE } from "@/lib/motion";

/** No cards. One quotation, set large, with a rule of dashes to change it. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];

  return (
    <section className="quote wrap" data-sec="studio" aria-label="What clients say">
      <div className="quote-track">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={quote.name}
            className="qslide on"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="qtext">
              {quote.text} <em>{quote.emphasis}</em>
            </p>
            <footer className="qmeta">
              <span className="meta">—</span>
              <span className="meta">
                <strong>{quote.name}</strong>
                <br />
                {quote.role}
              </span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="qnav">
        <span className="meta num" style={{ marginRight: 8 }}>
          {String(index + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}
        </span>
        {quotes.map((q, i) => (
          <button
            key={q.name}
            className={`qdot ${i === index ? "on" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Quote ${i + 1} of ${quotes.length}, ${q.name}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </section>
  );
}
