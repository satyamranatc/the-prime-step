"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLES_COUNT = 2800;

function createParticlePositions(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Deterministic pseudo-random distribution (mulberry-style hash) for pure rendering
    const h1 = Math.sin(i * 12.9898 + 1) * 43758.5453;
    const h2 = Math.sin(i * 78.233 + 2) * 43758.5453;
    const h3 = Math.sin(i * 39.425 + 3) * 43758.5453;
    const h4 = Math.sin(i * 93.182 + 4) * 43758.5453;
    const u1 = h1 - Math.floor(h1);
    const u2 = h2 - Math.floor(h2);
    const u3 = h3 - Math.floor(h3);
    const u4 = h4 - Math.floor(h4);

    const r = 18 + u1 * 95;
    const theta = 2 * Math.PI * u2;
    const phi = Math.acos(2 * u3 - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = Math.max(0.5, r * Math.sin(phi) * Math.sin(theta)); // Keep above ground
    const z = -20 - u4 * 260; // Spread along road depth

    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
  }
  return pos;
}

const PARTICLE_POSITIONS = createParticlePositions(PARTICLES_COUNT);

/**
 * Ambient Cybernetic Particle Horizon
 * Creates a vast, cinematic sense of speed and 3D depth.
 */
export default function ParticleBackground() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.35}
        color="#2db6ae"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}
