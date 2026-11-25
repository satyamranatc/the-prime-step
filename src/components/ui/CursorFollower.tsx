"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Simple, lightweight dual-circle cursor follower:
 * - Crisp 6px teal inner dot tracking the pointer directly
 * - Smooth spring-following 30px outer ring that expands subtly on interactive elements
 * Disabled automatically on touch devices and prefers-reduced-motion.
 */
export default function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 260, damping: 26, mass: 0.45 });
  const ringY = useSpring(mouseY, { stiffness: 260, damping: 26, mass: 0.45 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const timer = window.setTimeout(() => setEnabled(true), 0);

    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest?.("a, button, input, select, textarea, [role='button'], [role='tab']"),
      );
      setHovering(interactive);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] hidden overflow-hidden md:block"
    >
      {/* Smooth spring-following outer circle */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovering ? 44 : 30,
          height: hovering ? 44 : 30,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={`fixed top-0 left-0 rounded-full border transition-colors duration-200 ${
          hovering
            ? "border-brand bg-brand/[0.08]"
            : "border-brand/55 bg-transparent"
        }`}
      />

      {/* Crisp inner circle dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.7 : hovering ? 1.25 : 1,
        }}
        transition={{ duration: 0.12 }}
        className="fixed top-0 left-0 size-1.5 rounded-full bg-brand"
      />
    </div>
  );
}
