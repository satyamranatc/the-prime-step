"use client";

import { Suspense, useMemo, useEffect } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { ROADMAP_COURSES } from "@/lib/roadmapCourses";
import { generateRoadCurve } from "@/components/roadmap/curve";
import Scene from "@/components/roadmap/Scene";
import HtmlOverlay from "@/components/roadmap/HtmlOverlay";
import { useRoadmapStore } from "@/lib/roadmapStore";
import Logo from "@/components/ui/Logo";

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
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-paper transition-opacity duration-700"
      style={{ opacity: isComplete ? 0 : 1, pointerEvents: isComplete ? "none" : "auto" }}
    >
      <div className="mb-6 flex flex-col items-center">
        <Logo height={48} />
      </div>

      <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-pale border-t-brand" />
        <span className="text-3xl animate-pulse">🏎️</span>
      </div>

      <div className="display text-2xl text-deep">
        Preparing 3D Interactive Highway
      </div>
      <p className="mt-2 text-xs font-mono uppercase tracking-widest text-brand">
        Tuning shaders & road curves &bull; {Math.round(progress)}%
      </p>

      <div className="mt-5 h-1.5 w-64 overflow-hidden rounded-full bg-soft">
        <div
          className="h-full rounded-full bg-brand transition-all duration-300"
          style={{ width: `${Math.max(5, progress)}%` }}
        />
      </div>
    </div>
  );
}

export default function RoadmapClient({ courseId }: { courseId: string }) {
  const activeNode = useRoadmapStore((state) => state.activeNode);
  const setActiveNode = useRoadmapStore((state) => state.setActiveNode);
  const course = ROADMAP_COURSES[courseId] || ROADMAP_COURSES["mern"];

  useEffect(() => {
    setActiveNode(-1);
  }, [courseId, setActiveNode]);

  // Lock document scroll so 3D ScrollControls owns the wheel interaction
  useEffect(() => {
    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.overflow = origHtmlOverflow;
    };
  }, []);

  const numSteps = course.steps.length;
  const totalPages = numSteps + 2;
  const roadCurve = useMemo(() => generateRoadCurve(numSteps), [numSteps]);
  const isFinished = activeNode >= numSteps;

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-paper select-none">
      {/* 1. Frosted Top Navigation Bar — Solid Protection Barrier */}
      <nav
        aria-label="Roadmap navigation"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-deep/10 bg-paper/90 px-4 py-3 shadow-xs backdrop-blur-md md:px-8 md:py-3.5"
      >
        <Link
          href="/#programs"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-deep/15 bg-paper px-4 py-2 text-xs font-semibold text-deep shadow-xs transition-colors hover:bg-soft md:text-sm"
        >
          <span>←</span> Back to Programs
        </Link>

        {/* Center Course Badge */}
        <div className="pointer-events-auto flex items-center gap-3">
          <Logo height={34} className="hidden md:block" />
          <div className="h-4 w-px bg-deep/20 hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-deep md:text-sm">
              {course.title}
            </span>
            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand border border-brand/20">
              3D Highway
            </span>
          </div>
        </div>

        <Link
          href="/#admission"
          className="pointer-events-auto rounded-full bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md transition-colors hover:bg-deep md:text-sm"
        >
          Enroll Now
        </Link>
      </nav>

      {/* 2. Interactive Stage Card HUD (Zero Overlap, Zero Collision) */}
      <HtmlOverlay course={course} />

      {/* 3. Floating Bottom Driving Hint / Milestone Status */}
      <div className="pointer-events-none fixed bottom-5 inset-x-0 z-40 flex justify-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-brand/20 bg-paper/95 px-4 py-1.5 text-xs font-medium text-deep shadow-md backdrop-blur-md transition-all">
          {isFinished ? (
            <>
              <span>🏁</span>
              <span className="font-semibold text-brand">Destination Reached — Placement Ready</span>
            </>
          ) : activeNode >= 0 ? (
            <>
              <span className="inline-block animate-pulse text-brand">⚡</span>
              <span>Milestone {activeNode + 1} of {numSteps} Cleared</span>
              <span className="font-mono text-brand text-[11px]">↓ Scroll to drive ahead</span>
            </>
          ) : (
            <>
              <span className="inline-block animate-bounce text-brand">↓</span>
              <span>Scroll mouse wheel or touch to drive</span>
              <span className="font-mono text-brand">• {numSteps} Milestones</span>
            </>
          )}
        </div>
      </div>

      {/* 4. Loading Screen Overlay */}
      <LoadingScreen />

      {/* 5. 3D Driveable Roadmap Canvas */}
      <Canvas
        camera={{ position: [0, 5, 10], fov: 58 }}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        dpr={[1, 1.8]}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={totalPages} damping={0.25}>
            <Scene course={course} roadCurve={roadCurve} />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </main>
  );
}
