"use client";

import { useEffect, useRef } from "react";
import { agency, nav } from "@/data/site";
import { setScrollLock } from "@/components/providers/SmoothScroll";

/**
 * Full-screen editorial menu. Clip-path wipe, staggered lines,
 * contact details at the foot. Focus is trapped while open.
 */
export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    setScrollLock(open);
    if (open) closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !ref.current) return;
      const focusable = ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      className={`menu ${open ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
    >
      <div className="mtop">
        <span className="brand" style={{ fontFamily: "var(--display)", fontSize: 22 }}>
          {agency.name}
          <sup style={{ fontSize: 9, fontFamily: "var(--sans)" }}>®</sup>
        </span>
        <button ref={closeRef} className="close" onClick={onClose}>
          Close
        </button>
      </div>

      <nav aria-label="Mobile">
        <ul>
          {nav.map((item, i) => (
            <li key={item.id}>
              <a href={item.href} onClick={onClose}>
                <em>{String(i + 1).padStart(2, "0")}</em>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mbot">
        <div>
          <p className="meta" style={{ marginBottom: 8 }}>
            Start a project
          </p>
          <a className="mail" href={`mailto:${agency.email}`}>
            {agency.email}
          </a>
        </div>
        <div className="meta" style={{ textAlign: "right" }}>
          <p>{agency.socials.map((s) => s.label).join(" — ")}</p>
          <p style={{ marginTop: 6 }}>{agency.location}</p>
        </div>
      </div>
    </div>
  );
}
