"use client";

import { useEffect, useState } from "react";

export type DeviceQualityTier = "desktop" | "tablet" | "mobile" | "low";

export interface SceneQualityProfile {
  tier: DeviceQualityTier;
  dpr: [number, number];
  antialias: boolean;
  shadows: boolean;
  shadowMapSize: number;
  useReflector: boolean;
  reflectorResolution: number;
  useTransmission: boolean;
  contactShadows: boolean;
  contactShadowResolution: number;
  roadSegmentMultiplier: number;
  minRoadSegments: number;
  radialSegments: number;
  finaleRadialSegments: number;
  reducedMotion: boolean;
}

const QUALITY_PROFILES: Record<DeviceQualityTier, Omit<SceneQualityProfile, "reducedMotion">> = {
  desktop: {
    tier: "desktop",
    dpr: [1, 2],
    antialias: true,
    shadows: true,
    shadowMapSize: 2048,
    useReflector: true,
    reflectorResolution: 512,
    useTransmission: true,
    contactShadows: true,
    contactShadowResolution: 512,
    roadSegmentMultiplier: 40,
    minRoadSegments: 280,
    radialSegments: 32,
    finaleRadialSegments: 64,
  },
  tablet: {
    tier: "tablet",
    dpr: [1, 1.5],
    antialias: true,
    shadows: true,
    shadowMapSize: 1024,
    useReflector: true,
    reflectorResolution: 256,
    useTransmission: false,
    contactShadows: true,
    contactShadowResolution: 256,
    roadSegmentMultiplier: 28,
    minRoadSegments: 200,
    radialSegments: 24,
    finaleRadialSegments: 40,
  },
  mobile: {
    tier: "mobile",
    dpr: [1, 1.35],
    antialias: true,
    shadows: true,
    shadowMapSize: 512,
    useReflector: false,
    reflectorResolution: 0,
    useTransmission: false,
    contactShadows: true,
    contactShadowResolution: 256,
    roadSegmentMultiplier: 20,
    minRoadSegments: 140,
    radialSegments: 18,
    finaleRadialSegments: 32,
  },
  low: {
    tier: "low",
    dpr: [1, 1],
    antialias: false,
    shadows: false,
    shadowMapSize: 512,
    useReflector: false,
    reflectorResolution: 0,
    useTransmission: false,
    contactShadows: false,
    contactShadowResolution: 128,
    roadSegmentMultiplier: 14,
    minRoadSegments: 100,
    radialSegments: 12,
    finaleRadialSegments: 24,
  },
};

export function detectWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false });
    if (!gl) return false;
    // Immediately release probe context to avoid exhausting Safari WebGL context limit
    const lose = gl.getExtension("WEBGL_lose_context");
    if (lose) lose.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function detectDeviceQualityProfile(): SceneQualityProfile {
  if (typeof window === "undefined") {
    return { ...QUALITY_PROFILES.mobile, reducedMotion: false };
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const width = window.innerWidth;
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency || 4;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const memory = nav.deviceMemory ?? 4;
  const saveData = Boolean(nav.connection?.saveData);

  let tier: DeviceQualityTier = "desktop";
  if (saveData || cores <= 2 || memory <= 2) {
    tier = "low";
  } else if (width < 768 || (isCoarse && width < 900)) {
    tier = "mobile";
  } else if (width < 1180 || isCoarse) {
    tier = "tablet";
  }

  return { ...QUALITY_PROFILES[tier], reducedMotion };
}

/**
 * Tracks whether the browser tab is visible so WebGL frameloops pause
 * completely in the background, saving GPU and battery on phones & laptops.
 */
export function usePageVisibility(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    const t = window.setTimeout(update, 0);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return visible;
}
