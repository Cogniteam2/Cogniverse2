"use client";

import { Scroll, useScroll } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Model from "./Model";

export default function ScrollAnimation() {
  const scroll = useScroll();
  const progressRef = useRef(0);

  useFrame(() => {
    progressRef.current = scroll.offset;
  });

  return (
    <>
      <Model zoomProgress={progressRef.current} />
      <Scroll html>
        <div className="h-screen w-full relative z-10 flex items-center justify-center text-white text-4xl">
          <p>{progressRef.current < 0.95 ? "Scroll Into VR" : ""}</p>
        </div>
      </Scroll>
    </>
  );
}
