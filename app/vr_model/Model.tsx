import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

interface Props {
  zoomProgress: number;
}

export default function Model({ zoomProgress }: Props) {
  const modelRef = useRef<Group>(null);
  const { scene } = useGLTF("/models/Quest3.glb");

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = zoomProgress * Math.PI * 2;
      modelRef.current.position.z = -2 + zoomProgress * 3;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.2} />;
}
