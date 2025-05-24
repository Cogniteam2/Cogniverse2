"use client";

import HeroCanvas from "./HeroCanvas";
import SimVid from "./SimVid";
export default function HeroSection() {
  return (
    <section className="relative h-[200vh] overflow-hidden bg-black">
      <div className="sticky top-0 h-screen">
        <HeroCanvas />
      </div>
      <SimVid />
    </section>
  );
}
