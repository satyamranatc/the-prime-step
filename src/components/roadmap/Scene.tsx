"use client";

import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import CameraRig from "./CameraRig";
import RoadPath from "./RoadPath";
import HtmlOverlay from "./HtmlOverlay";
import Car from "./Car";
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
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[15, 25, 8]}
        intensity={1.8}
        color="#FFFFFF"
        castShadow
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-12, 8, -6]} intensity={1.0} color="#66B2B2" />

      {/* Realistic reflections on glossy road */}
      <Environment preset="city" />

      {/* Realistic ground shadow */}
      <ContactShadows
        position={[0, -0.08, 0]}
        resolution={1024}
        scale={220}
        blur={2}
        opacity={0.35}
        far={12}
        color="#002B2B"
      />

      <RoadPath course={course} roadCurve={roadCurve} />
      <Car course={course} roadCurve={roadCurve} />
      <CameraRig roadCurve={roadCurve} />
      <HtmlOverlay course={course} />
    </>
  );
}
