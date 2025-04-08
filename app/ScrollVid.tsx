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

// Updated camera path positions with more stages between 89-100%
const createCameraPath = (numPoints = 150) => {
  const path = [];
  const radius = 3.6; // Reduced from 4 to bring camera closer to model
  const initialHeight = 0.5;
  const finalHeight = 0.2;

  const lensTarget: [number, number, number] = [0, 0.1, -0.3]; // Explicitly typed as tuple

  for (let i = 0; i < numPoints; i++) {
    const progress = i / (numPoints - 1);
    const angle = progress * Math.PI;
    const y = initialHeight * (1 - progress) + finalHeight * progress;

    let adjustedRadius = radius;

    // Modified movement stages for smoother progression
    if (progress > 0.7 && progress <= 0.85) {
      const zoomProgress = (progress - 0.7) / 0.15;
      adjustedRadius = radius * (1 - zoomProgress * 0.3);
    } else if (progress > 0.85 && progress <= 0.89) {
      const extraZoomProgress = (progress - 0.85) / 0.04;
      adjustedRadius = radius * (0.7 - extraZoomProgress * 0.2);
    } else if (progress > 0.89 && progress <= 0.93) {
      const fineZoomProgress = (progress - 0.89) / 0.04;
      adjustedRadius = radius * (0.5 - fineZoomProgress * 0.15);
    } else if (progress > 0.93 && progress <= 0.97) {
      const microZoomProgress = (progress - 0.93) / 0.04;
      adjustedRadius = radius * (0.35 - microZoomProgress * 0.15);
    } else if (progress > 0.97) {
      const finalZoomProgress = (progress - 0.97) / 0.03;
      adjustedRadius = radius * (0.2 - finalZoomProgress * 0.1);
    }

    let position: [number, number, number] = [
      Math.sin(angle) * adjustedRadius,
      y,
      Math.cos(angle) * adjustedRadius,
    ];

    let lookAt: [number, number, number] = [0, y, 0];

    if (progress >= 0.98) {
      position = [0, 0.1, -0.2]; // Move to the exact lens position, slightly closer than before
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
  const lerpFactor = useRef(0.08); // Increased from 0.05 for faster transitions

  useFrame(() => {
    // Smooth the progress value to reduce jerkiness
    prevProgress.current += (progress - prevProgress.current) * 0.15; // Increased from 0.1 for quicker progress update
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

    // Variable smoothing based on progress - increased values for faster correction
    if (progress > 0.85 && progress <= 0.93) {
      lerpFactor.current = 0.09; // Increased from 0.06
    } else if (progress > 0.93) {
      lerpFactor.current = 0.07; // Increased from 0.04
    } else {
      // Normal adaptive smoothing for the rest of the animation
      const progressDelta = Math.abs(progress - prevProgress.current);
      lerpFactor.current = 0.08 + progressDelta * 2.5; // Increased base value and multiplier
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

// Main Model Viewer with Pulse Effect & Video Transition
export default function ScrollVid() {
  const [progress, setProgress] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [lightIntensity, setLightIntensity] = useState(0.5);
  const [showVideo, setShowVideo] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [pulseOpacity, setPulseOpacity] = useState(0);
  const [showIntroSlide, setShowIntroSlide] = useState(true);
  const [introSlideOpacity, setIntroSlideOpacity] = useState(1);
  const [hasScrolled, setHasScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScrollTime = useRef(Date.now());
  const scrollInertia = useRef(0);
  const pulseAnimationRef = useRef<number | null>(null);
  const introFadeAnimationRef = useRef<number | null>(null);
  const canAdvanceProgress = useRef(false); // Track whether we can start advancing progress

  // Handle pulse animation
  useEffect(() => {
    if (pulseEffect) {
      let startTime = Date.now();
      let duration = 600; // Duration of pulse in ms

      const animatePulse = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Create a pulse effect using sine wave
        if (progress < 1) {
          const pulseValue = Math.sin(progress * Math.PI * 3) * 0.5 + 0.5;
          setPulseOpacity(pulseValue);
          pulseAnimationRef.current = requestAnimationFrame(animatePulse);
        } else {
          setPulseOpacity(0);
          setPulseEffect(false);
          // Show video after pulse completes
          setShowVideo(true);

          // Attempt to play video
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current
                .play()
                .catch((err) => console.error("Video play failed:", err));
            }
          }, 100);
        }
      };

      pulseAnimationRef.current = requestAnimationFrame(animatePulse);

      return () => {
        if (pulseAnimationRef.current) {
          cancelAnimationFrame(pulseAnimationRef.current);
        }
      };
    }
  }, [pulseEffect]);

  // Handle intro slide fade animation
  useEffect(() => {
    if (hasScrolled && showIntroSlide) {
      let startTime = Date.now();
      let duration = 500; // Duration of fade in ms

      const animateIntroFade = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress < 1) {
          setIntroSlideOpacity(1 - progress);
          introFadeAnimationRef.current =
            requestAnimationFrame(animateIntroFade);
        } else {
          setIntroSlideOpacity(0);
          setShowIntroSlide(false);
          canAdvanceProgress.current = true; // Allow progress to advance once intro is gone
        }
      };

      introFadeAnimationRef.current = requestAnimationFrame(animateIntroFade);

      return () => {
        if (introFadeAnimationRef.current) {
          cancelAnimationFrame(introFadeAnimationRef.current);
        }
      };
    }
  }, [hasScrolled, showIntroSlide]);

  // Effect to ensure scrolling works after intro slide is removed
  useEffect(() => {
    if (!showIntroSlide) {
      canAdvanceProgress.current = true;
    }
  }, [showIntroSlide]);

  // Enhanced scroll handling with inertia
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      // Mark that scrolling has begun - used for intro slide
      if (!hasScrolled) {
        setHasScrolled(true);
      }

      if (scrollLocked) {
        event.preventDefault();

        // Calculate time since last scroll
        const now = Date.now();
        const timeDelta = now - lastScrollTime.current;
        lastScrollTime.current = now;

        // Apply scroll inertia - reduced sensitivity for less dramatic initial movement
        const scrollInput = event.deltaY * 0.00025; // Reduced from 0.0003
        scrollInertia.current =
          Math.sign(scrollInput) *
          Math.min(Math.abs(scrollInertia.current + scrollInput), 0.008); // Reduced max inertia from 0.01

        // Apply stronger dampening over time
        if (timeDelta > 50) {
          // Reduced from 100 for quicker reaction
          scrollInertia.current *= 0.7; // Increased dampening from 0.8
        }

        // Only advance progress if intro is complete
        if (canAdvanceProgress.current) {
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
            if (newProgress >= 0.99 && !pulseEffect && !showVideo) {
              // Trigger pulse effect as transition
              setPulseEffect(true);
              setScrollLocked(false);
            }

            return newProgress;
          });
        }
      }
    };

    // Apply inertia for smoother scrolling - with faster decay
    const applyInertia = () => {
      if (Math.abs(scrollInertia.current) > 0.0001 && scrollLocked) {
        // Faster inertia decay for quicker correction
        scrollInertia.current *= 0.88; // Changed from 0.93 for faster decay

        // Only advance progress if intro is complete
        if (canAdvanceProgress.current) {
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
            if (newProgress >= 0.99 && !pulseEffect && !showVideo) {
              // Create pulse effect
              setPulseEffect(true);
              setScrollLocked(false);
            }

            return newProgress;
          });
        }
      }

      requestAnimationFrame(applyInertia);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    const inertiaFrame = requestAnimationFrame(applyInertia);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      cancelAnimationFrame(inertiaFrame);
    };
  }, [scrollLocked, pulseEffect, showVideo, hasScrolled, showIntroSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas Scene */}
      {!showVideo && (
        <Canvas
          camera={{ position: [0, 0.5, 3.6], fov: 65 }} // Starting position closer to headset
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

      {/* Intro Slide with Bloom Effects */}
      {showIntroSlide && (
        <div
          className="absolute inset-0 flex flex-col justify-center items-center bg-gray-800 z-30 overflow-hidden"
          style={{ opacity: introSlideOpacity, transition: "opacity 0.5s" }}
        >
          {/* Bloom effect - top right */}
          <div className="absolute -rotate-45 -right-20 top-20 w-96 h-96 bg-[#24ffe9]/20 rounded-full blur-3xl"></div>

          {/* Bloom effect - bottom left */}
          <div className="absolute rotate-12 -left-20 bottom-20 w-96 h-96 bg-[#00a8c9]/20 rounded-full blur-3xl"></div>

          {/* Additional complementary bloom effects for more immersive feel */}
          <div className="absolute rotate-45 left-40 top-20 w-64 h-64 bg-[#4f46e5]/15 rounded-full blur-3xl"></div>
          <div className="absolute -rotate-12 right-40 bottom-20 w-80 h-80 bg-[#a855f7]/15 rounded-full blur-3xl"></div>

          {/* Content */}
          <h1 className="text-5xl font-bold text-white mb-6 z-10 relative">
            Enter the world of VR
          </h1>
          <p className="text-xl text-white mb-12 z-10 relative">
            Scroll to continue
          </p>
          <div className="animate-bounce z-10 relative">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      )}

      {/* Pulse Effect Overlay for transition */}
      <div
        className="absolute inset-0 bg-white transition-opacity duration-100 z-20"
        style={{ opacity: pulseOpacity }}
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

      {/* Debug indicators */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded z-30">
        <div>Progress: {Math.round(progress * 100)}%</div>
        <div>Intro: {showIntroSlide ? "Visible" : "Hidden"}</div>
        <div>Can Advance: {canAdvanceProgress.current ? "Yes" : "No"}</div>
      </div>
    </div>
  );
}
