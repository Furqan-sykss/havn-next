"use client";

import { useEffect, useState } from "react";
import { agency, nav } from "@/data/site";
import MobileMenu from "./MobileMenu";

/**
 * Not a sticky bar with a background. It hides on the way down,
 * returns on the way up, and flips contrast by measuring the
 * surface directly beneath it — including the burgundy closing field.
 */
export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const frame = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;

      setHidden(y > vh * 0.9 && y > last + 4);
      last = y;

      const BAND = 34;
      let dark = false;
      let current = "";
      document.querySelectorAll<HTMLElement>("section, footer").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= BAND && r.bottom > BAND) dark = !!el.dataset.surface;
        if (el.dataset.sec && r.top <= vh * 0.42 && r.bottom >= vh * 0.42) current = el.dataset.sec;
      });
      setOnDark(dark);
      setActive(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };

    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`nav ${hidden ? "hide" : ""} ${onDark ? "on-dark" : ""}`}>
        <a href="#top" className="brand" aria-label={`${agency.name}, back to top`}>
          {agency.name}
          <sup>®</sup>
        </a>

        <div className="nav-desk">
          <nav aria-label="Primary">
            <ul>
              {nav.map((item) => (
                <li key={item.id}>
                  <a className="lk" href={item.href} aria-current={active === item.id ? "true" : "false"}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contact" className="talk">
            <i aria-hidden="true" />
            Let&rsquo;s talk
          </a>
        </div>

        <button
          className="burger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <b />
          <b />
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
