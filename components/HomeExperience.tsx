"use client";

import { useCallback, useState } from "react";
import Preloader from "@/components/ui/Preloader";
import Navigation from "@/components/navigation/Navigation";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import Hero from "@/components/hero/Hero";
import StudioStatement from "@/components/studio/StudioStatement";
import Marquee from "@/components/ui/Marquee";
import SelectedWork from "@/components/projects/SelectedWork";
import CaseDocumentation from "@/components/gallery/CaseDocumentation";
import ServiceIndex from "@/components/services/ServiceIndex";
import Process from "@/components/process/Process";
import Culture from "@/components/studio/Culture";
import Testimonials from "@/components/ui/Testimonials";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/contact/Footer";

/**
 * Narrative order:
 * introduction → identity → work → documentation → capabilities
 * → process → studio → on the record → contact.
 * Only the preloader hand-off needs shared state, so it lives here
 * and every section below stays independently composable.
 */
export default function HomeExperience() {
  const [started, setStarted] = useState(false);
  const onDone = useCallback(() => setStarted(true), []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <Preloader onDone={onDone} />
      <ScrollProgress />
      <CustomCursor />
      <Navigation />

      <main id="main">
        <span id="top" />
        <Hero start={started} />
        <StudioStatement />
        <Marquee />
        <SelectedWork />
        <CaseDocumentation />
        <ServiceIndex />
        <Process />
        <Culture />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
