"use client";

import { useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { useRoadmapStore } from "@/lib/roadmapStore";
import type { RoadmapCourse } from "@/lib/roadmapCourses";

// Sleek futuristic dual-chime audio synthesis on milestone arrival
let audioCtx: AudioContext | null = null;
function playMilestoneChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const now = audioCtx.currentTime;
    const playTone = (time: number, freq: number) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, time + 0.04);
      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(time);
      osc.stop(time + 0.06);
    };

    playTone(now, 1200);
    playTone(now + 0.06, 1800);
  } catch {
    // Ignore audio autoplay restrictions
  }
}

export default function Car({
  course,
  roadCurve,
}: {
  course: RoadmapCourse;
  roadCurve: THREE.CatmullRomCurve3;
}) {
  const scroll = useScroll();
  const carGroup = useRef<THREE.Group>(null);
  const targetPoint = useRef(new THREE.Vector3());
  const { scene } = useGLTF("/cartoon_sports_car.glb");

  // Calibrate materials to match reference: Signature Teal Lacquer, Jet-Black Tires, Tinted Obsidian Glass
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.geometry.computeBoundingBox();
        const bbox = mesh.geometry.boundingBox;
        if (bbox && bbox.max.y - bbox.min.y < 0.05) {
          mesh.visible = false;
          return;
        }

        const name = (mesh.name || "").toLowerCase();
        if (name.includes("shadow") || name.includes("plane") || name.includes("ground") || name.includes("tarmac")) {
          mesh.visible = false;
          return;
        }

        const mat = (mesh.material as THREE.Material).clone();
        mesh.material = mat;

        const stdMat = mat as THREE.MeshStandardMaterial;
        stdMat.roughness = 0.15;
        stdMat.metalness = 0.3;

        const hsl = { h: 0, s: 0, l: 0 };
        if (stdMat.color) stdMat.color.getHSL(hsl);

        // Tires / Wheels / Underbody
        if (hsl.l < 0.2 || name.includes("tire") || name.includes("wheel") || name.includes("rim")) {
          stdMat.color = new THREE.Color("#18181b");
          stdMat.roughness = 0.8;
          stdMat.metalness = 0.1;
        }
        // Windows / Windshield / Glass
        else if (stdMat.transparent || stdMat.opacity < 1 || name.includes("window") || name.includes("glass")) {
          stdMat.color = new THREE.Color("#000000");
          stdMat.transparent = true;
          stdMat.opacity = 0.82;
          stdMat.roughness = 0.05;
        }
        // Headlights
        else if (name.includes("light_front") || name.includes("headlight")) {
          mesh.material = new THREE.MeshBasicMaterial({ color: new THREE.Color("#FFFFFF") });
        }
        // Taillights
        else if (name.includes("light_rear") || name.includes("taillight")) {
          mesh.material = new THREE.MeshBasicMaterial({ color: new THREE.Color("#FF1535") });
        }
        // Main Body Panels — The Prime Step Signature Teal Lacquer
        else {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#1AAB95"),
            roughness: 0.15,
            metalness: 0.3,
            clearcoat: 1.0,
            clearcoatRoughness: 0.03,
            reflectivity: 0.95,
          });
        }
      }
    });
  }, [scene]);

  const numSteps = course.steps.length;

  useFrame(() => {
    if (!carGroup.current) return;
    const rawOffset = scroll.offset;
    if (isNaN(rawOffset)) return;

    const curveProgress = rawOffset * 0.95;
    const lookAheadProgress = Math.min(1, curveProgress + 0.015);

    // Active Node sync and audio feedback
    const activeNode = useRoadmapStore.getState().activeNode;
    const stepThresholds: number[] = [];
    const stepCount = numSteps + 1;
    for (let i = 1; i <= numSteps; i++) {
      const offset = (i / stepCount) * 0.95;
      stepThresholds.push(Math.min(1, offset + 0.04));
    }

    let detectedNode = -1;
    for (let i = stepThresholds.length - 1; i >= 0; i--) {
      if (lookAheadProgress >= stepThresholds[i] - 0.02) {
        detectedNode = i;
        break;
      }
    }

    if (detectedNode > activeNode) {
      useRoadmapStore.getState().setActiveNode(detectedNode);
      playMilestoneChime();
    } else if (detectedNode < activeNode) {
      useRoadmapStore.getState().setActiveNode(detectedNode);
    }

    // Car Position & Tangent Heading
    const point = roadCurve.getPointAt(lookAheadProgress);
    const yElevation = 0.05;
    carGroup.current.position.set(point.x, point.y + yElevation, point.z);

    const tangent = roadCurve.getTangentAt(lookAheadProgress).normalize();
    targetPoint.current.set(point.x + tangent.x, point.y + tangent.y + yElevation, point.z + tangent.z);
    carGroup.current.lookAt(targetPoint.current);
  });

  return (
    <group ref={carGroup}>
      {/* 1. Sports Car Body Mesh */}
      <primitive object={scene} scale={1.2} rotation={[0, 4.7, 0]} />

      {/* 2. Soft Circular Ground Shadow Disc (matches reference image) */}
      <mesh position={[0, 0.018, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 36]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.38} />
      </mesh>

      {/* 3. Subtle Underglow Point Light */}
      <pointLight color="#1AAB95" intensity={2.0} distance={3.5} position={[0, 0.5, 0]} />
    </group>
  );
}

useGLTF.preload("/cartoon_sports_car.glb");
