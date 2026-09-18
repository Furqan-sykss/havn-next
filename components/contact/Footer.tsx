"use client";

import { useEffect, useState } from "react";
import { agency } from "@/data/site";

/** Restrained colophon. The clock renders after mount to avoid hydration drift. */
export default function Footer() {
  const [time, setTime] = useState<string>("—");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Amsterdam",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="wrap" data-surface="wine" style={{ paddingBottom: "clamp(20px,3vw,34px)" }}>
      <div className="foot">
        <div className="a">
          <span className="meta">
            {agency.mark} — {agency.descriptor}
            <br />© {new Date().getFullYear()}. All rights reserved.
          </span>
        </div>
        <div className="b">
          <span className="meta">
            Colophon
            <br />
            Bodoni Moda &amp; Inter Tight
          </span>
        </div>
        <div className="c">
          <span className="meta num">
            {agency.coordinates}
            <br />
            {time} CET
          </span>
        </div>
      </div>
    </footer>
  );
}
