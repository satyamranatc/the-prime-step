"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/lib/scroll";

const STEPS = 9;
const W = 0.58;
const H = 0.34;

const palette = ["#F3F6F6", "#E4EEEE", "#D3E6E6", "#B2D8D8", "#A0CFCF", "#8CC5C5", "#66B2B2", "#33999A", "#008080"];

/** An ascending staircase: the Prime Step. Reacts to pointer and scroll progress. */
function Stairs() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const p = sceneState.progress;
    const { x, y } = state.pointer;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.72 + x * 0.35 + p * 1.5, 3.5, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.08 - y * 0.12 + p * 0.25, 3.5, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, -1.15 + p * 1.6, 3.5, dt);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 10.4 - p * 2.0, 3, dt);
  });

  return (
    <group ref={group} position={[0, -1.15, 0]}>
      {Array.from({ length: STEPS }).map((_, i) => {
        const h = H * (i + 1);
        return (
          <mesh key={i} position={[(i - (STEPS - 1) / 2) * W, h / 2, 0]}>
            <boxGeometry args={[W, h, 1.7]} />
            <meshStandardMaterial color={palette[i]} roughness={0.85} metalness={0} />
            <Edges threshold={15} color={i === STEPS - 1 ? "#006666" : "#66B2B2"} />
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
      camera={{ position: [0, 1.4, 10.4], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <hemisphereLight args={["#FFFFFF", "#B2D8D8", 1.15]} />
      <directionalLight position={[4, 7, 5]} intensity={2.1} color="#FFFFFF" />
      <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#66B2B2" />
      <Stairs />
    </Canvas>
  );
}

