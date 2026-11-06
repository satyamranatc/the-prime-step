"use client";

import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import CameraRig from "./CameraRig";
import RoadPath from "./RoadPath";
import Car from "./Car";
import ParticleBackground from "./ParticleBackground";
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
      {/* 1. Atmospheric Horizon Fog — Gives vast spatial depth so road smoothly recedes */}
      <fog attach="fog" args={["#E4EDEE", 35, 190]} />
      <color attach="background" args={["#E8EFF0"]} />

      {/* 2. Studio Lighting */}
      <ambientLight intensity={0.65} color="#FFFFFF" />

      {/* Main Studio Key Light casting sharp shadows */}
      <directionalLight
        position={[22, 38, 18]}
        intensity={2.4}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* Vibrant Cyan Rim Softbox highlighting ceramic white car edges */}
      <directionalLight position={[-18, 14, -12]} intensity={1.5} color="#1E9C99" />
      <directionalLight position={[0, -10, 0]} intensity={0.4} color="#D8E8E8" />

      {/* 3. Studio Reflections */}
      <Environment preset="city" />

      {/* 4. Ambient Cybernetic Starfield / Particle Horizon */}
      <ParticleBackground />

      {/* 5. Vast Architectural Ground Terrain Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, -100]} receiveShadow>
        <planeGeometry args={[1200, 1200]} />
        <meshStandardMaterial color="#E2ECEE" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* 6. Soft Road Contact Shadow */}
      <ContactShadows
        position={[0, -0.06, 0]}
        resolution={1024}
        scale={260}
        blur={2.8}
        opacity={0.35}
        far={12}
        color="#001C1C"
      />

      {/* 7. Continuous 3D Road Highway */}
      <RoadPath course={course} roadCurve={roadCurve} />

      {/* 8. The Driving Hypercar */}
      <Car course={course} roadCurve={roadCurve} />

      {/* 9. Cinematic Camera Rig Tracking Car */}
      <CameraRig roadCurve={roadCurve} />
    </>
  );
}
