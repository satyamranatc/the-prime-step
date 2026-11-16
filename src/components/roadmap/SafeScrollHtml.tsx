"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useScroll } from "@react-three/drei";

/**
 * React 19-safe replacement for Drei's `<Scroll html>`
 * Uses React DOM `createPortal` directly into `scroll.fixed` without invoking `ReactDOM.createRoot()`
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
  if (!scroll?.fixed) return null;

  return createPortal(
    <div className={className} style={style}>
      {children}
    </div>,
    scroll.fixed
  );
}
