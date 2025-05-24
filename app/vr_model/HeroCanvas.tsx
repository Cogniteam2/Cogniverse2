"use client";

import { Canvas } from "@react-three/fiber";
import {
  ScrollControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import ScrollAnimation from "./ScrollAnimation";

export default function HeroCanvas() {
  return (
    <Canvas className="absolute top-0 left-0 w-full h-full z-0">
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <Environment preset="studio" />

      <ScrollControls pages={1.2} damping={0.25}>
        <ScrollAnimation />
      </ScrollControls>
    </Canvas>
  );
}
