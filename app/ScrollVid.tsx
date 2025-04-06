"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Load 3D Model
const Model: React.FC = () => {
  const { scene } = useGLTF("/models/Quest3.glb");
  return <primitive object={scene} scale={1.5} />;
};

// Improved camera path positions with extended zoom stage
const createCameraPath = (numPoints = 100) => {
  const path = [];
  const radius = 4;
  const initialHeight = 0.5;
  const finalHeight = 0.2;

  const lensTarget = [0, 0.1, -0.3]; // Adjusted to focus directly on the lens

  for (let i = 0; i < numPoints; i++) {
    const progress = i / (numPoints - 1);
    const angle = progress * Math.PI;
    const y = initialHeight * (1 - progress) + finalHeight * progress;

    let adjustedRadius = radius;

    if (progress > 0.7 && progress <= 0.85) {
      const zoomProgress = (progress - 0.7) / 0.15;
      adjustedRadius = radius * (1 - zoomProgress * 0.3);
    } else if (progress > 0.85) {
      const extraZoomProgress = (progress - 0.85) / 0.15;
      adjustedRadius = radius * (0.7 - extraZoomProgress * 0.5);
    }

    let position = [
      Math.sin(angle) * adjustedRadius,
      y,
      Math.cos(angle) * adjustedRadius,
    ];

    let lookAt = [0, y, 0];

    if (progress >= 0.95) {
      position = [0, 0.1, -0.3]; // Move to the exact lens position
      lookAt = lensTarget;
    }

    path.push({ position, lookAt });
  }

  return path;
};

// Enhanced camera controller with smooth interpolation
const SmoothCameraController = ({ progress }: { progress: number }) => {
  const { camera } = useThree();
  const cameraPath = useRef(createCameraPath());
  const prevProgress = useRef(progress);
  const lerpFactor = useRef(0.05); // Smoothing factor (lower = smoother but slower)

  useFrame(() => {
    // Smooth the progress value to reduce jerkiness
    prevProgress.current += (progress - prevProgress.current) * 0.1;
    const smoothProgress = prevProgress.current;

    // Get the exact position in our path
    const exactIndex = smoothProgress * (cameraPath.current.length - 1);
    const index = Math.floor(exactIndex);
    const nextIndex = Math.min(index + 1, cameraPath.current.length - 1);
    const t = exactIndex - index; // Interpolation factor between points

    // Get current and next path points
    const currentPoint = cameraPath.current[index];
    const nextPoint = cameraPath.current[nextIndex];

    // Target position (where we want the camera to go)
    const targetPosition = new THREE.Vector3(
      currentPoint.position[0] * (1 - t) + nextPoint.position[0] * t,
      currentPoint.position[1] * (1 - t) + nextPoint.position[1] * t,
      currentPoint.position[2] * (1 - t) + nextPoint.position[2] * t
    );

    // Target lookAt (where we want the camera to look)
    const targetLookAt = new THREE.Vector3(
      currentPoint.lookAt[0] * (1 - t) + nextPoint.lookAt[0] * t,
      currentPoint.lookAt[1] * (1 - t) + nextPoint.lookAt[1] * t,
      currentPoint.lookAt[2] * (1 - t) + nextPoint.lookAt[2] * t
    );

    // Smoother transitions during final zoom stage
    if (progress > 0.85) {
      lerpFactor.current = 0.08; // Slightly slower transitions during final zoom
    } else {
      // Normal adaptive smoothing for the rest of the animation
      const progressDelta = Math.abs(progress - prevProgress.current);
      lerpFactor.current = 0.05 + progressDelta * 2;
    }

    // Smoothly interpolate camera position (LERP)
    camera.position.lerp(targetPosition, lerpFactor.current);

    // Create a temporary vector for the current lookAt
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(5).add(camera.position);

    // Smoothly adjust lookAt
    const smoothLookAt = new THREE.Vector3()
      .copy(currentLookAt)
      .lerp(targetLookAt, lerpFactor.current);
    camera.lookAt(smoothLookAt);
  });

  return null;
};

// Main Model Viewer with Brightness Effect & Video Transition
export default function ScrollVid() {
  const [progress, setProgress] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [lightIntensity, setLightIntensity] = useState(0.5);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScrollTime = useRef(Date.now());
  const scrollInertia = useRef(0);

  // Enhanced scroll handling with inertia
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (scrollLocked) {
        event.preventDefault();

        // Calculate time since last scroll
        const now = Date.now();
        const timeDelta = now - lastScrollTime.current;
        lastScrollTime.current = now;

        // Apply scroll inertia
        const scrollInput = event.deltaY * 0.0003; // Reduced sensitivity
        scrollInertia.current =
          Math.sign(scrollInput) *
          Math.min(Math.abs(scrollInertia.current + scrollInput), 0.01);

        // Apply dampening over time
        if (timeDelta > 100) {
          scrollInertia.current *= 0.8;
        }

        setProgress((prev) => {
          const newProgress = Math.min(
            1,
            Math.max(0, prev + scrollInertia.current)
          );

          // Increase brightness as we scroll, with extra boost during final zoom
          const extraLightBoost =
            newProgress > 0.85 ? (newProgress - 0.85) * 2 : 0;
          setLightIntensity(0.5 + newProgress * 1.5 + extraLightBoost);

          // Check if we've reached the end of the scroll
          if (newProgress >= 0.99) {
            // Show video after a delay to allow zoom to be visible
            setTimeout(() => {
              setShowVideo(true);
              // Attempt to play the video once it's shown
              setTimeout(() => {
                if (videoRef.current) {
                  videoRef.current
                    .play()
                    .catch((err) => console.error("Video play failed:", err));
                }
              }, 100);
            }, 500); // Increased from 300ms back to 500ms

            setScrollLocked(false);
          }

          return newProgress;
        });
      }
    };

    // Apply inertia for smoother scrolling
    const applyInertia = () => {
      if (Math.abs(scrollInertia.current) > 0.0001 && scrollLocked) {
        // Slower inertia decay for more gradual movement
        scrollInertia.current *= 0.93; // Changed from 0.95 for slower decay

        setProgress((prev) => {
          const newProgress = Math.min(
            1,
            Math.max(0, prev + scrollInertia.current)
          );

          // Update light intensity with extra boost during final zoom
          const extraLightBoost =
            newProgress > 0.85 ? (newProgress - 0.85) * 2 : 0;
          setLightIntensity(0.5 + newProgress * 1.5 + extraLightBoost);

          // Check if we've reached the end
          if (newProgress >= 0.99) {
            setTimeout(() => {
              setShowVideo(true);
              setTimeout(() => {
                if (videoRef.current) {
                  videoRef.current
                    .play()
                    .catch((err) => console.error("Video play failed:", err));
                }
              }, 100);
            }, 500); // Increased delay

            setScrollLocked(false);
          }

          return newProgress;
        });
      }

      requestAnimationFrame(applyInertia);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    const inertiaFrame = requestAnimationFrame(applyInertia);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      cancelAnimationFrame(inertiaFrame);
    };
  }, [scrollLocked]);

  // Delayed fade transition to allow viewing of the zoom
  const overlayOpacity =
    progress < 0.9
      ? 0 // No fade before most of the extra zoom is complete
      : progress > 0.99
      ? 1 // Full white at the very end
      : Math.pow((progress - 0.9) / 0.09, 1.5); // More gradual fade curve

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas Scene */}
      {!showVideo && (
        <Canvas
          camera={{ position: [0, 0.5, 4], fov: 65 }} // Starting position looking directly at headset
          className="fixed top-0 left-0 w-full h-full"
        >
          <ambientLight intensity={lightIntensity} />
          <directionalLight position={[5, 5, 5]} intensity={lightIntensity} />

          <Suspense fallback={null}>
            <Model />
          </Suspense>

          <SmoothCameraController progress={progress} />
        </Canvas>
      )}

      {/* Brightness Overlay (Fade starts later to allow zoom to be more visible) */}
      <div
        className="absolute inset-0 bg-white transition-opacity duration-400" // Slightly longer fade
        style={{ opacity: overlayOpacity }}
      ></div>

      {/* Video that replaces 3D model at the end */}
      {showVideo && (
        <div className="absolute inset-0 flex justify-center items-center bg-black z-10">
          <video
            ref={videoRef}
            src="/videos/sample.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Optional: Progress indicator for debugging */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded z-20">
        Progress: {Math.round(progress * 100)}%
      </div>
    </div>
  );
}
