"use client";

import { Suspense, useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { ROADMAP_COURSES } from "@/lib/roadmapCourses";
import { generateRoadCurve } from "@/components/roadmap/curve";
import Scene from "@/components/roadmap/Scene";
import RoadmapLiteFallback from "@/components/roadmap/RoadmapLiteFallback";
import { useRoadmapStore } from "@/lib/roadmapStore";
import Logo from "@/components/ui/Logo";
import {
  detectDeviceQualityProfile,
  detectWebGLSupport,
  usePageVisibility,
  type SceneQualityProfile,
} from "@/lib/webglPerformance";

function LoadingScreen() {
  const { progress, active } = useProgress();
  const isComplete = !active && progress === 100;

  useEffect(() => {
    if (isComplete) {
      document.documentElement.dataset.roadmapReady = "1";
    }
  }, [isComplete]);

  if (isComplete) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-700"
      style={{ opacity: isComplete ? 0 : 1, pointerEvents: isComplete ? "none" : "auto" }}
    >
      <div className="mb-6 flex flex-col items-center">
        <Logo height={48} />
      </div>

      <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-zinc-200 border-t-[#1AAB95]" />
      </div>

      <div className="text-xl font-bold text-zinc-900">
        Loading Interactive 3D Highway
      </div>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[#1AAB95]">
        {Math.round(progress)}%
      </p>

      <div className="mt-5 h-1.5 w-56 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-[#1AAB95] transition-all duration-300"
          style={{ width: `${Math.max(5, progress)}%` }}
        />
      </div>
    </div>
  );
}

export default function RoadmapClient({ courseId }: { courseId: string }) {
  const setActiveNode = useRoadmapStore((state) => state.setActiveNode);
  const course =
    ROADMAP_COURSES[courseId] || ROADMAP_COURSES["python"] || ROADMAP_COURSES["mern"];

  const isTabVisible = usePageVisibility();
  const [quality, setQuality] = useState<SceneQualityProfile>(() =>
    detectDeviceQualityProfile(),
  );
  const [webglReady, setWebglReady] = useState<boolean>(true);
  const [contextLost, setContextLost] = useState<boolean>(false);
  const [forceLiteMode, setForceLiteMode] = useState<boolean>(false);

  // Evaluate WebGL support & adaptive GPU profile once on mount (async timer keeps React 19 lint clean)
  useEffect(() => {
    const t = window.setTimeout(() => {
      const profile = detectDeviceQualityProfile();
      setQuality(profile);
      const hasGl = detectWebGLSupport();
      setWebglReady(hasGl);
      if (profile.reducedMotion) {
        setForceLiteMode(true);
      }
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    setActiveNode(-1);
  }, [courseId, setActiveNode]);

  const showLiteFallback = !webglReady || contextLost || forceLiteMode;

  // Lock document scroll ONLY while interactive 3D ScrollControls owns wheel/touch
  useEffect(() => {
    if (showLiteFallback) return;

    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const getScrollEl = (): HTMLDivElement | null => {
      return (
        document.querySelector<HTMLDivElement>("div[style*='overflow: hidden auto']") ||
        document.querySelector<HTMLDivElement>("div[style*='overflow-y: auto']") ||
        Array.from(document.querySelectorAll<HTMLDivElement>("div")).find(
          (d) => d.scrollHeight > d.clientHeight + 10,
        ) ||
        null
      );
    };

    const handleWheel = (e: WheelEvent) => {
      const scrollEl = getScrollEl();
      if (scrollEl) {
        scrollEl.scrollTop += e.deltaY;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollEl = getScrollEl();
      if (!scrollEl) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        scrollEl.scrollTop += 320;
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        scrollEl.scrollTop -= 320;
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const scrollEl = getScrollEl();
      if (!scrollEl) return;
      const currentY = e.touches[0].clientY;
      const diffY = touchStartY - currentY;
      scrollEl.scrollTop += diffY * 1.45;
      touchStartY = currentY;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.overflow = origHtmlOverflow;
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [showLiteFallback]);

  const numSteps = course.steps.length;
  const totalPages = numSteps + 2;
  const roadCurve = useMemo(() => generateRoadCurve(numSteps), [numSteps]);

  return (
    <main
      className={`relative w-screen bg-white ${
        showLiteFallback ? "min-h-dvh overflow-y-auto" : "h-dvh overflow-hidden select-none"
      }`}
    >
      {/* 1. Top Navigation Bar (Safe for iOS Dynamic Island & Notches) */}
      <div className="pointer-events-none fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-50 flex items-center justify-between gap-2 px-3 sm:px-4 md:top-6 md:px-6">
        <Link
          href="/courses"
          className="pointer-events-auto flex min-h-[38px] items-center gap-1.5 rounded-full bg-zinc-900/10 px-3.5 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm backdrop-blur-md transition-colors hover:bg-zinc-900/20 sm:gap-2 sm:px-4 sm:py-2 md:px-6 md:py-2.5 md:text-sm"
        >
          <span>←</span> <span className="hidden xs:inline">All</span> Courses
        </Link>

        <div className="pointer-events-auto flex items-center gap-2">
          {webglReady && !contextLost && (
            <button
              type="button"
              onClick={() => setForceLiteMode((v) => !v)}
              className="min-h-[38px] rounded-full border border-zinc-200/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur-md transition-colors hover:border-brand hover:text-brand md:px-4"
            >
              {showLiteFallback ? "3D View" : "2D Lite"}
            </button>
          )}
          <Link
            href={course.seoHref || "/courses"}
            className="min-h-[38px] inline-flex items-center rounded-full border border-zinc-200/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm backdrop-blur-md transition-colors hover:bg-white sm:px-4 sm:py-2 md:px-5 md:py-2.5 md:text-sm"
          >
            Syllabus <span className="hidden sm:inline">&nbsp;Page</span> →
          </Link>
          <a
            href={`https://wa.me/919479611441?text=${encodeURIComponent(`Hi The Prime Step! I just explored the ${course.title} 3D Roadmap and want to book a free demo class.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-[38px] items-center rounded-full bg-[#1e9c99] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#156b69] sm:inline-flex md:px-5 md:py-2.5 md:text-sm"
          >
            Talk to Counselor
          </a>
        </div>
      </div>

      {showLiteFallback ? (
        <RoadmapLiteFallback
          course={course}
          canSwitchTo3D={webglReady && !contextLost}
          onEnable3D={() => setForceLiteMode(false)}
          reason={
            !webglReady
              ? "Showing lightweight interactive roadmap (WebGL is unavailable on this browser)."
              : contextLost
                ? "Switched to lightweight roadmap to preserve device memory."
                : quality.reducedMotion
                  ? "Showing reduced-motion interactive roadmap."
                  : undefined
          }
        />
      ) : (
        <>
          {/* 2. Loading Screen */}
          <LoadingScreen />

          {/* 3. Adaptive 3D Driveable Roadmap Canvas (pauses when tab is hidden) */}
          <Canvas
            camera={{ position: [0, 5, 10], fov: quality.tier === "mobile" ? 66 : 60 }}
            shadows={quality.shadows ? { type: THREE.PCFShadowMap } : false}
            frameloop={isTabVisible ? "always" : "never"}
            gl={{
              antialias: quality.antialias,
              powerPreference: quality.tier === "desktop" ? "high-performance" : "default",
              toneMapping: THREE.ACESFilmicToneMapping,
            }}
            dpr={quality.dpr}
            onCreated={({ gl }) => {
              const canvas = gl.domElement;
              const onLost = (ev: Event) => {
                ev.preventDefault();
                setContextLost(true);
              };
              const onRestored = () => setContextLost(false);
              canvas.addEventListener("webglcontextlost", onLost, false);
              canvas.addEventListener("webglcontextrestored", onRestored, false);
            }}
          >
            <Suspense fallback={null}>
              <ScrollControls pages={totalPages} damping={0.25}>
                <Scene course={course} roadCurve={roadCurve} quality={quality} />
              </ScrollControls>
            </Suspense>
          </Canvas>
        </>
      )}
    </main>
  );
}
