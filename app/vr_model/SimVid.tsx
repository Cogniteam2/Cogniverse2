"use client";

import { useEffect, useState } from "react";

export default function SimVid() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const trigger = document.getElementById("hero-trigger");
      if (trigger) {
        const rect = trigger.getBoundingClientRect();
        if (rect.top <= 0) setShowVideo(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="hero-trigger" className="h-screen relative z-10">
      {showVideo && (
        <video
          src="/videos/sample.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
