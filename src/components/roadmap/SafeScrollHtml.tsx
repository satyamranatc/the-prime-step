"use client";

import React, { useEffect, useState } from "react";
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
  const [targetEl] = useState<HTMLDivElement | null>(() => {
    if (typeof document === "undefined") return null;
    return document.createElement("div");
  });

  useEffect(() => {
    if (!targetEl || !scroll?.fixed) return;
    if (className) targetEl.className = className;
    if (style) Object.assign(targetEl.style, style);
    scroll.fixed.appendChild(targetEl);
    return () => {
      targetEl.remove();
    };
  }, [scroll?.fixed, targetEl, className, style]);

  if (!targetEl) return null;
  return createPortal(children, targetEl);
}

