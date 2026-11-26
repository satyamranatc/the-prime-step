"use client";

import { Environment, ContactShadows, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import CameraRig from "./CameraRig";
import RoadPath from "./RoadPath";
import Car from "./Car";
import HtmlOverlay from "./HtmlOverlay";
import SafeScrollHtml from "./SafeScrollHtml";
import type { RoadmapCourse } from "@/lib/roadmapCourses";
import type { SceneQualityProfile } from "@/lib/webglPerformance";

export default function Scene({
  course,
  roadCurve,
  quality,
}: {
  course: RoadmapCourse;
  roadCurve: THREE.CatmullRomCurve3;
  quality: SceneQualityProfile;
}) {
  return (
    <>
      {/* 1. Pure White Architectural Horizon Fog */}
      <fog attach="fog" args={["#FFFFFF", 45, 175]} />
      <color attach="background" args={["#FFFFFF"]} />

      {/* 2. Studio Lighting calibrated per GPU tier */}
      <ambientLight intensity={0.65} color="#FFFFFF" />

      {/* Main Studio Key Light */}
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.5}
        color="#FFFFFF"
        castShadow={quality.shadows}
        shadow-mapSize={[quality.shadowMapSize, quality.shadowMapSize]}
        shadow-bias={-0.0001}
      />

      {/* Signature Teal Rim Light */}
      <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#1AAB95" />

      {/* 3. Zero-Network Procedural Studio Reflections (No external HDR CDN fetch, 100% CSP-safe) */}
      <Environment resolution={quality.tier === "desktop" ? 256 : 128} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#FFFFFF"
          position={[0, 10, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[24, 24, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          color="#E6FAF7"
          position={[12, 5, 8]}
          rotation={[0, -Math.PI / 3, 0]}
          scale={[14, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#1AAB95"
          position={[-12, 4, -6]}
          rotation={[0, Math.PI / 3, 0]}
          scale={[14, 6, 1]}
        />
      </Environment>

      {/* 4. Pure White Ground Terrain Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow={quality.shadows}>
        <planeGeometry args={[1200, 1200]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} metalness={0} />
      </mesh>

      {/* 5. Soft Ground Contact Shadows — baked once (frames={1}) to save ~40% mobile GPU */}
      {quality.contactShadows && (
        <ContactShadows
          position={[0, -0.1, 0]}
          frames={1}
          resolution={quality.contactShadowResolution}
          scale={200}
          blur={2.2}
          opacity={0.38}
          far={10}
          color="#000000"
        />
      )}

      {/* 6. Continuous 3D Road Highway */}
      <RoadPath course={course} roadCurve={roadCurve} quality={quality} />

      {/* 7. The Driving Sports Car */}
      <Car course={course} roadCurve={roadCurve} />

      {/* 8. Cinematic Tracking Camera */}
      <CameraRig roadCurve={roadCurve} />

      {/* 9. HTML Overlay synchronised with Drei Scroll (React 19 Safe Portal) */}
      <SafeScrollHtml style={{ width: "100vw" }}>
        <HtmlOverlay course={course} />
      </SafeScrollHtml>
    </>
  );
}
