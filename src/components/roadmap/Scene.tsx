"use client";

import { Environment, ContactShadows, Scroll } from "@react-three/drei";
import * as THREE from "three";
import CameraRig from "./CameraRig";
import RoadPath from "./RoadPath";
import Car from "./Car";
import HtmlOverlay from "./HtmlOverlay";
import type { RoadmapCourse } from "@/lib/roadmapCourses";

export default function Scene({
  course,
  roadCurve,
}: {
  course: RoadmapCourse;
  roadCurve: THREE.CatmullRomCurve3;
}) {
  return (
    <>
      {/* 1. Pure White Architectural Horizon Fog */}
      <fog attach="fog" args={["#FFFFFF", 45, 175]} />
      <color attach="background" args={["#FFFFFF"]} />

      {/* 2. Studio Lighting matching Reference */}
      <ambientLight intensity={0.65} color="#FFFFFF" />

      {/* Main Studio Key Light */}
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.5}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* Signature Teal Rim Light */}
      <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#1AAB95" />

      {/* 3. Reflections */}
      <Environment preset="city" />

      {/* 4. Pure White Ground Terrain Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[1200, 1200]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} metalness={0} />
      </mesh>

      {/* 5. Soft Ground Contact Shadows */}
      <ContactShadows
        position={[0, -0.1, 0]}
        resolution={1024}
        scale={200}
        blur={2.2}
        opacity={0.4}
        far={10}
        color="#000000"
      />

      {/* 6. Continuous 3D Road Highway */}
      <RoadPath course={course} roadCurve={roadCurve} />

      {/* 7. The Driving Sports Car */}
      <Car course={course} roadCurve={roadCurve} />

      {/* 8. Cinematic Tracking Camera */}
      <CameraRig roadCurve={roadCurve} />

      {/* 9. HTML Overlay synchronised with Drei Scroll */}
      <Scroll html style={{ width: "100vw" }}>
        <HtmlOverlay course={course} />
      </Scroll>
    </>
  );
}
