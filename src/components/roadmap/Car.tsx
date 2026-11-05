"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRoadmapStore, playChime } from "@/lib/roadmapStore";
import type { RoadmapCourse } from "@/lib/roadmapCourses";

export default function Car({
  course,
  roadCurve,
}: {
  course: RoadmapCourse;
  roadCurve: THREE.CatmullRomCurve3;
}) {
  const scroll = useScroll();
  const carRef = useRef<THREE.Group>(null);
  const targetPointRef = useRef(new THREE.Vector3());

  // Load the sports car model
  const { scene } = useGLTF("/cartoon_sports_car.glb");

  // Style the car to match The Prime Step signature brand theme (Teal / Deep Black finish)
  useLayoutEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.geometry.computeBoundingBox();
        const bbox = mesh.geometry.boundingBox;
        if (bbox) {
          const sizeY = bbox.max.y - bbox.min.y;
          if (sizeY < 0.05) {
            mesh.visible = false;
            return;
          }
        }

        const name = mesh.name.toLowerCase();
        if (name.includes("shadow") || name.includes("plane") || name.includes("ground")) {
          mesh.visible = false;
          return;
        }

        const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
        mat.roughness = 0.15;
        mat.metalness = 0.45;

        const hsl = { h: 0, s: 0, l: 0 };
        mat.color.getHSL(hsl);

        if (hsl.l < 0.22 || name.includes("tire") || name.includes("wheel")) {
          mat.color.set("#111215"); // Deep Charcoal / Tire Black
        } else if (mat.transparent || mat.opacity < 1 || name.includes("window") || name.includes("glass")) {
          mat.color.set("#051616");
          mat.transparent = true;
          mat.opacity = 0.85;
        } else {
          mat.color.set("#008080"); // Signature Prime Teal
        }
        mesh.material = mat;
      }
    });
  }, [scene]);

  const numSteps = course.steps.length;

  useFrame(() => {
    if (!carRef.current) return;

    const rawOffset = scroll.offset;
    if (isNaN(rawOffset)) return;

    const cameraProgress = rawOffset * 0.95;
    const carProgress = Math.min(1, cameraProgress + 0.015);

    // Dynamic Milestone detection
    const currentActiveNode = useRoadmapStore.getState().activeNode;
    const thresholds: number[] = [];
    const stepCount = numSteps + 1;

    for (let i = 1; i <= numSteps; i++) {
      const offset = i / stepCount;
      const camP = offset * 0.95;
      thresholds.push(Math.min(1, camP + 0.04));
    }

    let newActiveNode = -1;
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (carProgress >= thresholds[i] - 0.02) {
        newActiveNode = i;
        break;
      }
    }

    if (newActiveNode > currentActiveNode) {
      useRoadmapStore.getState().setActiveNode(newActiveNode);
      playChime();
    } else if (newActiveNode < currentActiveNode) {
      useRoadmapStore.getState().setActiveNode(newActiveNode);
    }

    // Position car along the 3D road curve
    const currentPoint = roadCurve.getPointAt(carProgress);
    const yOffset = 0.06;

    carRef.current.position.set(currentPoint.x, currentPoint.y + yOffset, currentPoint.z);

    // Orient car facing forward along curve tangent
    const tangent = roadCurve.getTangentAt(carProgress).normalize();
    targetPointRef.current.set(
      currentPoint.x + tangent.x,
      currentPoint.y + tangent.y + yOffset,
      currentPoint.z + tangent.z
    );

    carRef.current.lookAt(targetPointRef.current);
  });

  return (
    <group ref={carRef}>
      <primitive object={scene} scale={1.15} rotation={[0, 4.7, 0]} />
      {/* Cyan underglow */}
      <pointLight color="#1C9794" intensity={2.2} distance={3.5} position={[0, 0.45, 0]} />
    </group>
  );
}

useGLTF.preload("/cartoon_sports_car.glb");

