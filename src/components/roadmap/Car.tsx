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

  // Realistic material separation — distinct tires, tinted glass, red taillights & metallic teal body
  useLayoutEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = (mesh.name || "").toLowerCase();
        const origMat = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as THREE.Material;
        const matName = (origMat?.name || "").toUpperCase();

        // 1. COMPLETELY HIDE the flat black tarmac shadow disc (Object_63 / TARMAC)
        if (
          mesh.name === "Object_63" ||
          mesh.name === "Object_29" ||
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

        // 2. Headlights: Radiant Xenon LED
        if (matName.includes("HEADLIGHTS") || name.includes("headlight")) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#E8FFFF"),
            emissive: new THREE.Color("#00E5FF"),
            emissiveIntensity: 3.5,
            roughness: 0.08,
            metalness: 0.1,
          });
        }
        // 3. Taillights: Brilliant Crimson LED Strip (clearly visible from rear chase camera)
        else if (
          matName.includes("LAMPS") ||
          name.includes("taillight") ||
          name.includes("lamp") ||
          mesh.name === "Object_21"
        ) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#FF1035"),
            emissive: new THREE.Color("#FF0828"),
            emissiveIntensity: 5.5,
            roughness: 0.1,
            metalness: 0.05,
          });
        }
        // 4. Windows & Windshield: Tinted Obsidian Aerodynamic Glass
        else if (
          matName.includes("GLASS") ||
          name.includes("glass") ||
          name.includes("window") ||
          mesh.name === "Object_16" ||
          mesh.name === "Object_24" ||
          mesh.name === "Object_28"
        ) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#061012"),
            roughness: 0.04,
            metalness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.03,
            transparent: true,
            opacity: 0.88,
          });
        }
        // 5. Tires, Rims, Diffuser, Spoiler Brackets & Matte Lower Trim
        else if (
          matName.includes("MATTE") ||
          name.includes("tyre") ||
          name.includes("tire") ||
          name.includes("wheel") ||
          name.includes("rim") ||
          name.includes("brake") ||
          name.includes("diffuser") ||
          name.includes("steering") ||
          mesh.name === "Object_3" ||
          mesh.name === "Object_6" ||
          mesh.name === "Object_9" ||
          mesh.name === "Object_12" ||
          mesh.name === "Object_15" ||
          mesh.name === "Object_18" ||
          mesh.name === "Object_20" ||
          mesh.name === "Object_23" ||
          mesh.name === "Object_27"
        ) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#16171B"),
            roughness: 0.55,
            metalness: 0.25,
          });
        }
        // 6. Side Mirrors — Pure White Housing
        else if (matName.includes("MIRRORS") || name.includes("mirror")) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#FFFFFF"),
            roughness: 0.1,
            metalness: 0.1,
          });
        }
        // 7. Sports Car Main Body Panels — PURE PORCELAIN CERAMIC WHITE LACQUER
        else {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#FFFFFF"),
            emissive: new THREE.Color("#000000"),
            emissiveIntensity: 0,
            roughness: 0.06,
            metalness: 0.08,
            clearcoat: 1.0,
            clearcoatRoughness: 0.02,
            reflectivity: 1.0,
            envMapIntensity: 1.5,
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

    // Smooth progress mapping
    const cameraProgress = Math.min(1, Math.max(0, rawOffset * 0.95));
    const carProgress = Math.min(1, Math.max(0, cameraProgress + 0.015));

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
        if (carProgress >= thresholds[i] - 0.035) {
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

      {/* Rear illumination so the metallic curves and taillights gleam in the camera */}
      <directionalLight position={[0, 4, 7]} intensity={2.4} color="#FFFFFF" />

      {/* Cyan neon road underglow */}
      <pointLight color="#00E5D8" intensity={2.8} distance={4.0} position={[0, 0.45, 0]} />
    </group>
  );
}

useGLTF.preload("/cartoon_sports_car.glb");
