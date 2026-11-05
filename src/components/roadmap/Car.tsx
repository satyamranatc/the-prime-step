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

  // Style the car to match The Prime Step signature brand theme (Vibrant Teal / Charcoal / Glowing LED)
  useLayoutEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = (mesh.name || "").toLowerCase();
        const matName = ((mesh.material as THREE.Material)?.name || "").toUpperCase();

        // 1. COMPLETELY HIDE the embedded tarmac/shadow disc (Object_63 / TARMAC)
        if (
          mesh.name === "Object_63" ||
          matName === "TARMAC" ||
          name.includes("tarmac") ||
          name.includes("shadow") ||
          name.includes("plane") ||
          name.includes("ground")
        ) {
          mesh.visible = false;
          return;
        }

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (matName.includes("HEADLIGHTS") || name.includes("headlight")) {
          // Radiant Xenon Headlights
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#E8FFFF"),
            emissive: new THREE.Color("#38F8F0"),
            emissiveIntensity: 3.5,
            roughness: 0.1,
            metalness: 0.2,
          });
        } else if (matName.includes("LAMPS") || name.includes("taillight") || name.includes("lamp")) {
          // Brilliant Crimson LED Taillight Strip (clearly visible from the rear view!)
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#FF1E40"),
            emissive: new THREE.Color("#FF0828"),
            emissiveIntensity: 5.0,
            roughness: 0.15,
            metalness: 0.1,
          });
        } else if (matName.includes("GLASS") || name.includes("glass") || name.includes("window")) {
          // Tinted Obsidian Aerodynamic Glass
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#081414"),
            roughness: 0.05,
            metalness: 0.15,
            clearcoat: 1.0,
            clearcoatRoughness: 0.04,
            transparent: true,
            opacity: 0.88,
          });
        } else if (
          matName.includes("MATTE") ||
          name.includes("tire") ||
          name.includes("wheel") ||
          name.includes("bumper") ||
          name.includes("diffuser")
        ) {
          // Satin Charcoal trims, tires, spoiler & diffuser
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#18191E"),
            roughness: 0.45,
            metalness: 0.2,
          });
        } else if (matName.includes("MIRROR")) {
          // Glossy Mirror housing
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#008080"),
            roughness: 0.1,
            metalness: 0.5,
          });
        } else {
          // Main Sports Car Body (CARRERA_4096 / Body Panels):
          // VIBRANT, RADIANT SIGNATURE PRIME TEAL LACQUER!
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#00A896"),
            emissive: new THREE.Color("#00403C"),
            emissiveIntensity: 0.25,
            roughness: 0.12,
            metalness: 0.35,
            clearcoat: 1.0,
            clearcoatRoughness: 0.03,
            reflectivity: 0.98,
          });
        }
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
    if (rawOffset >= 0.92) {
      newActiveNode = numSteps; // Grand Finale
    } else {
      for (let i = thresholds.length - 1; i >= 0; i--) {
        if (carProgress >= thresholds[i] - 0.03) {
          newActiveNode = i;
          break;
        }
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

      {/* Rear illumination so the back of the car is brilliantly lit */}
      <directionalLight position={[0, 4, 7]} intensity={2.2} color="#FFFFFF" />

      {/* Cyan neon underglow on the road */}
      <pointLight color="#00E5D8" intensity={3.5} distance={4.5} position={[0, 0.45, 0]} />
    </group>
  );
}

useGLTF.preload("/cartoon_sports_car.glb");
