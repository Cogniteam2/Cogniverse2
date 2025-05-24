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

// Improved camera path with controlled rotation and direct lens approach
const createCameraPath = (numPoints = 120) => {
  // Reduced points for faster progression
  const path = [];
  const radius = 3.6;
  const initialHeight = 0.5;
  const finalHeight = -0.1; // Lower final height to see lens area better

  const lensTarget: [number, number, number] = [0, 0, -0.3];

  for (let i = 0; i < numPoints; i++) {
    const progress = i / (numPoints - 1);

    // Control rotation to stop at 180 degrees and transition to direct approach
    let angle;
    if (progress <= 0.7) {
      // Complete 180-degree rotation by 70% progress
      angle = (progress / 0.7) * Math.PI;
    } else {
      // Stop rotation at 180 degrees (Math.PI)
      angle = Math.PI;
    }

    const y = initialHeight * (1 - progress) + finalHeight * progress;

    let adjustedRadius = radius;

    // Revised zoom stages for smoother and faster progression
    if (progress > 0.6 && progress <= 0.75) {
      // Start zooming earlier
      const zoomProgress = (progress - 0.6) / 0.15;
      adjustedRadius = radius * (1 - zoomProgress * 0.4); // More aggressive zoom
    } else if (progress > 0.75 && progress <= 0.85) {
      const extraZoomProgress = (progress - 0.75) / 0.1;
      adjustedRadius = radius * (0.6 - extraZoomProgress * 0.25);
    } else if (progress > 0.85 && progress <= 0.92) {
      const fineZoomProgress = (progress - 0.85) / 0.07;
      adjustedRadius = radius * (0.35 - fineZoomProgress * 0.2);
    } else if (progress > 0.92) {
      const finalZoomProgress = (progress - 0.92) / 0.08;
      adjustedRadius = radius * (0.15 - finalZoomProgress * 0.12);
    }

    let position: [number, number, number];
    let lookAt: [number, number, number] = [0, y, 0];

    if (progress <= 0.7) {
      // Normal circular rotation
      position = [
        Math.sin(angle) * adjustedRadius,
        y,
        Math.cos(angle) * adjustedRadius,
      ];
    } else if (progress > 0.7 && progress < 0.95) {
      // Transition from back of headset to direct lens approach
      const transitionProgress = (progress - 0.7) / 0.25;
      const backPosition = [0, y, -adjustedRadius]; // Back of headset
      const lensPosition = [0, -0.05, -0.15]; // Final lens position

      position = [
        backPosition[0] * (1 - transitionProgress) +
          lensPosition[0] * transitionProgress,
        backPosition[1] * (1 - transitionProgress) +
          lensPosition[1] * transitionProgress,
        backPosition[2] * (1 - transitionProgress) +
          lensPosition[2] * transitionProgress,
      ];
    } else {
      // Final lens positioning - lower and more centered
      position = [0, -0.05, -0.15]; // Lower position to see lens area better
      lookAt = [0, 0, -0.3]; // Look directly at lens
    }

    path.push({ position, lookAt });
  }

  return path;
};

// Improved camera controller with faster correction
const SmoothCameraController = ({ progress }: { progress: number }) => {
  const { camera } = useThree();
  const cameraPath = useRef(createCameraPath());
  const prevProgress = useRef(progress);
  const lerpFactor = useRef(0.12); // Increased base lerp factor for faster correction

  useFrame(() => {
    // Faster progress smoothing for quicker response
    prevProgress.current += (progress - prevProgress.current) * 0.2; // Increased from 0.15
    const smoothProgress = prevProgress.current;

    const exactIndex = smoothProgress * (cameraPath.current.length - 1);
    const index = Math.floor(exactIndex);
    const nextIndex = Math.min(index + 1, cameraPath.current.length - 1);
    const t = exactIndex - index;

    const currentPoint = cameraPath.current[index];
    const nextPoint = cameraPath.current[nextIndex];

    const targetPosition = new THREE.Vector3(
      currentPoint.position[0] * (1 - t) + nextPoint.position[0] * t,
      currentPoint.position[1] * (1 - t) + nextPoint.position[1] * t,
      currentPoint.position[2] * (1 - t) + nextPoint.position[2] * t
    );

    const targetLookAt = new THREE.Vector3(
      currentPoint.lookAt[0] * (1 - t) + nextPoint.lookAt[0] * t,
      currentPoint.lookAt[1] * (1 - t) + nextPoint.lookAt[1] * t,
      currentPoint.lookAt[2] * (1 - t) + nextPoint.lookAt[2] * t
    );

    // Much faster correction based on progress - more aggressive lerp factors
    if (progress > 0.85 && progress <= 0.92) {
      lerpFactor.current = 0.15; // Faster correction in zoom phase
    } else if (progress > 0.92) {
      lerpFactor.current = 0.18; // Even faster for final positioning
    } else {
      // More responsive correction throughout
      const progressDelta = Math.abs(progress - prevProgress.current);
      lerpFactor.current = 0.12 + progressDelta * 4; // Higher base and multiplier
    }

    // Faster camera position correction
    camera.position.lerp(targetPosition, lerpFactor.current);

    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(5).add(camera.position);

    const smoothLookAt = new THREE.Vector3()
      .copy(currentLookAt)
      .lerp(targetLookAt, lerpFactor.current);
    camera.lookAt(smoothLookAt);
  });

  return null;
};

// Main Model Viewer with improved transitions
export default function ScrollVid() {
  const [progress, setProgress] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [lightIntensity, setLightIntensity] = useState(0.5);
  const [showVideo, setShowVideo] = useState(false);
  const [showIntroSlide, setShowIntroSlide] = useState(true);
  const [introSlideOpacity, setIntroSlideOpacity] = useState(1);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [fadeTransition, setFadeTransition] = useState(false);
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScrollTime = useRef(Date.now());
  const scrollInertia = useRef(0);
  const fadeAnimationRef = useRef<number | null>(null);
  const introFadeAnimationRef = useRef<number | null>(null);
  const canAdvanceProgress = useRef(false);

  // Handle black fade transition with direct model-to-video transition
  useEffect(() => {
    if (fadeTransition) {
      let startTime = Date.now();
      let duration = 1000; // Reduced duration (1 second total)

      const animateFade = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress < 0.5) {
          // Fade to black from model
          setFadeOpacity(progress * 2);
          fadeAnimationRef.current = requestAnimationFrame(animateFade);
        } else if (progress === 0.5 || (progress > 0.5 && !showVideo)) {
          // At midpoint, switch to video immediately
          setFadeOpacity(1);
          if (!showVideo) {
            setShowVideo(true);
            // Attempt to play video
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current
                  .play()
                  .catch((err) => console.error("Video play failed:", err));
              }
            }, 50);
          }
          fadeAnimationRef.current = requestAnimationFrame(animateFade);
        } else if (progress < 1) {
          // Fade from black to video
          const fadeOutProgress = (progress - 0.5) / 0.5;
          setFadeOpacity(1 - fadeOutProgress);
          fadeAnimationRef.current = requestAnimationFrame(animateFade);
        } else {
          setFadeOpacity(0);
          setFadeTransition(false);
        }
      };

      fadeAnimationRef.current = requestAnimationFrame(animateFade);

      return () => {
        if (fadeAnimationRef.current) {
          cancelAnimationFrame(fadeAnimationRef.current);
        }
      };
    }
  }, [fadeTransition, showVideo]);

  // Handle intro slide fade animation
  useEffect(() => {
    if (hasScrolled && showIntroSlide) {
      let startTime = Date.now();
      let duration = 500;

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
          canAdvanceProgress.current = true;
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

  useEffect(() => {
    if (!showIntroSlide) {
      canAdvanceProgress.current = true;
    }
  }, [showIntroSlide]);

  // Enhanced scroll handling with faster response
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (!hasScrolled) {
        setHasScrolled(true);
      }

      if (scrollLocked) {
        event.preventDefault();

        const now = Date.now();
        const timeDelta = now - lastScrollTime.current;
        lastScrollTime.current = now;

        // Increased scroll sensitivity for faster rotation
        const scrollInput = event.deltaY * 0.0004; // Increased from 0.00025
        scrollInertia.current =
          Math.sign(scrollInput) *
          Math.min(Math.abs(scrollInertia.current + scrollInput), 0.012); // Increased max

        // Faster inertia decay
        if (timeDelta > 40) {
          // Reduced from 50
          scrollInertia.current *= 0.75; // Increased dampening from 0.7
        }

        if (canAdvanceProgress.current) {
          setProgress((prev) => {
            const newProgress = Math.min(
              1,
              Math.max(0, prev + scrollInertia.current)
            );

            const extraLightBoost =
              newProgress > 0.85 ? (newProgress - 0.85) * 2 : 0;
            setLightIntensity(0.5 + newProgress * 1.5 + extraLightBoost);

            // Trigger fade transition instead of pulse
            if (newProgress >= 0.98 && !fadeTransition && !showVideo) {
              setFadeTransition(true);
              setScrollLocked(false);
            }

            return newProgress;
          });
        }
      }
    };

    // Faster inertia application
    const applyInertia = () => {
      if (Math.abs(scrollInertia.current) > 0.0001 && scrollLocked) {
        scrollInertia.current *= 0.9; // Faster decay from 0.88

        if (canAdvanceProgress.current) {
          setProgress((prev) => {
            const newProgress = Math.min(
              1,
              Math.max(0, prev + scrollInertia.current)
            );

            const extraLightBoost =
              newProgress > 0.85 ? (newProgress - 0.85) * 2 : 0;
            setLightIntensity(0.5 + newProgress * 1.5 + extraLightBoost);

            if (newProgress >= 0.98 && !fadeTransition && !showVideo) {
              setFadeTransition(true);
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
  }, [scrollLocked, fadeTransition, showVideo, hasScrolled, showIntroSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas Scene */}
      {!showVideo && (
        <Canvas
          camera={{ position: [0, 0.5, 3.6], fov: 65 }}
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
          <div className="absolute -rotate-45 -right-20 top-20 w-96 h-96 bg-[#24ffe9]/20 rounded-full blur-3xl"></div>
          <div className="absolute rotate-12 -left-20 bottom-20 w-96 h-96 bg-[#00a8c9]/20 rounded-full blur-3xl"></div>
          <div className="absolute rotate-45 left-40 top-20 w-64 h-64 bg-[#4f46e5]/15 rounded-full blur-3xl"></div>
          <div className="absolute -rotate-12 right-40 bottom-20 w-80 h-80 bg-[#a855f7]/15 rounded-full blur-3xl"></div>

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

      {/* Black Fade Transition Overlay */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-100 z-20"
        style={{ opacity: fadeOpacity }}
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
