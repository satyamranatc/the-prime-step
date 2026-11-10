"use client";

import { Suspense, useMemo, useEffect } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { ROADMAP_COURSES } from "@/lib/roadmapCourses";
import { generateRoadCurve } from "@/components/roadmap/curve";
import Scene from "@/components/roadmap/Scene";
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
      <p className="mt-2 text-xs font-mono uppercase tracking-widest text-[#1AAB95]">
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
  const course = ROADMAP_COURSES[courseId] || ROADMAP_COURSES["python"] || ROADMAP_COURSES["mern"];

  useEffect(() => {
    setActiveNode(-1);
  }, [courseId, setActiveNode]);

  // Lock document scroll so 3D ScrollControls owns the wheel interaction
  useEffect(() => {
    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const getScrollEl = (): HTMLDivElement | null => {
      return (
        document.querySelector<HTMLDivElement>("div[style*='overflow: hidden auto']") ||
        document.querySelector<HTMLDivElement>("div[style*='overflow-y: auto']") ||
        Array.from(document.querySelectorAll<HTMLDivElement>("div")).find(
          (d) => d.scrollHeight > d.clientHeight + 10
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
      scrollEl.scrollTop += diffY * 1.5;
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
  }, []);

  const numSteps = course.steps.length;
  const totalPages = numSteps + 2;
  const roadCurve = useMemo(() => generateRoadCurve(numSteps), [numSteps]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-white select-none">
      {/* 1. Top Navigation Bar: Back to All Courses & Full Course Page */}
      <div className="absolute inset-x-0 top-4 md:top-6 z-50 px-4 md:px-6 flex items-center justify-between gap-3 pointer-events-none">
        <Link
          href="/courses"
          className="px-4 py-2 md:px-6 md:py-2.5 bg-zinc-900/10 hover:bg-zinc-900/20 text-zinc-900 rounded-full font-semibold text-xs md:text-sm backdrop-blur-md transition-colors flex items-center gap-2 pointer-events-auto shadow-sm"
        >
          <span>←</span> All Courses
        </Link>

        <div className="flex items-center gap-2 pointer-events-auto">
          <Link
            href={course.seoHref || "/courses"}
            className="px-4 py-2 md:px-5 md:py-2.5 bg-white/90 hover:bg-white text-zinc-900 border border-zinc-200/80 rounded-full font-semibold text-xs md:text-sm backdrop-blur-md transition-colors shadow-sm"
          >
            Full Syllabus Page →
          </Link>
          <a
            href={`https://wa.me/919479611441?text=${encodeURIComponent(`Hi The Prime Step! I just explored the ${course.title} 3D Roadmap and want to book a free demo class.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-4 py-2 md:px-5 md:py-2.5 bg-[#1e9c99] hover:bg-[#156b69] text-white rounded-full font-semibold text-xs md:text-sm transition-colors shadow-sm"
          >
            Talk to Counselor
          </a>
        </div>
      </div>

      {/* 2. Loading Screen */}
      <LoadingScreen />

      {/* 3. 3D Driveable Roadmap Canvas with Synchronised HTML Overlay */}
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        dpr={[1, 2]}
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
