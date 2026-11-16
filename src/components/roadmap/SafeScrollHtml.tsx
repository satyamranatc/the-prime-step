"use client";

import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

const roots = new WeakMap<HTMLElement, ReactDOM.Root>();

/**
 * React 19-safe replacement for Drei's `<Scroll html>`.
 * - Caches a single `ReactDOM.createRoot(scroll.fixed)` per DOM element in a WeakMap
 *   (avoiding React 19's duplicate `createRoot()` warning under StrictMode).
 * - Renders inside ReactDOM's reconciler (avoiding R3F's `Span is not part of the THREE namespace` error).
 * - Translates the HTML container on every frame in sync with `scroll.offset`.
 */
export default function SafeScrollHtml({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const scroll = useScroll();
  const groupRef = useRef<HTMLDivElement>(null);
  const { width, height } = useThree((s) => s.size);

  useFrame(() => {
    const g = groupRef.current;
    if (!g || !scroll) return;
    if (scroll.delta > scroll.eps) {
      const x = scroll.horizontal ? -width * (scroll.pages - 1) * scroll.offset : 0;
      const y = scroll.horizontal ? 0 : height * (scroll.pages - 1) * -scroll.offset;
      g.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  });

  useEffect(() => {
    const fixed = scroll?.fixed;
    if (!fixed) return;

    let root = roots.get(fixed);
    if (!root) {
      root = ReactDOM.createRoot(fixed);
      roots.set(fixed, root);
    }

    root.render(
      <div
        ref={groupRef}
        className={className}
        style={{
          ...style,
          position: "absolute",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    );
  }, [scroll?.fixed, children, className, style]);

  return null;
}
