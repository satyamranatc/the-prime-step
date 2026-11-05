"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/lib/scroll";

const STEPS = 9;
const W = 0.56;
const H = 0.34;

// Rich, saturated teal progression so even the lowest steps have clear presence (never washed-out grey)
const palette = [
  "#B2D8D8",
  "#9ED0D0",
  "#88C6C6",
  "#72BCBC",
  "#5CB2B2",
  "#3FA0A0",
  "#228E8E",
  "#008080",
  "#006666",
];

/** An ascending staircase: the Prime Step. Reacts to pointer and scroll progress. */
function Stairs() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const p = sceneState.progress;
    const { x, y } = state.pointer;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.62 + x * 0.28 + p * 1.35, 3.5, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.12 - y * 0.1 + p * 0.22, 3.5, dt);
    g.position.x = THREE.MathUtils.damp(g.position.x, -0.25, 3.5, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, -1.25 + p * 1.4, 3.5, dt);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 11.8 - p * 1.8, 3, dt);
  });

  return (
    <group ref={group} position={[-0.25, -1.25, 0]}>
      {Array.from({ length: STEPS }).map((_, i) => {
        const h = H * (i + 1);
        return (
          <mesh key={i} position={[(i - (STEPS - 1) / 2) * W, h / 2, 0]}>
            <boxGeometry args={[W, h, 1.65]} />
            <meshStandardMaterial color={palette[i]} roughness={0.65} metalness={0.05} />
            <Edges threshold={15} color="#006666" />
          </mesh>
        );
      })}
    </group>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 1.4, 11.8], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.95} color="#FFFFFF" />
      <hemisphereLight args={["#FFFFFF", "#66B2B2", 1.1]} />
      <directionalLight position={[5, 8, 6]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-6, 3, 4]} intensity={0.9} color="#B2D8D8" />
      <Stairs />
    </Canvas>
  );
}
