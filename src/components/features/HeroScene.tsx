"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/lib/scroll";

// Center of mark in original SVG coordinates
const CX = 396.5;
const CY = 788.5;
const SCALE = 0.0076;

// Precise coordinates matching The Prime Step official logo vector geometry
const PILLAR_POINTS: [number, number][] = [
  [240, 758],
  [385, 680],
  [390, 1096],
  [360, 1119],
  [222, 1033],
  [218, 1024],
  [238, 1008],
];

const FLAP_POINTS: [number, number][] = [
  [207, 550],
  [250, 575],
  [241, 604],
  [208, 607],
];

const BLACK_RIBBON_POINTS: [number, number][] = [
  [215, 548],
  [360, 458],
  [570, 575],
  [572, 772],
  [586, 779],
  [574, 800],
  [442, 890],
  [418, 884],
  [418, 668],
  [250, 578],
];

function makeShape(pts: [number, number][]): THREE.Shape {
  const shape = new THREE.Shape();
  pts.forEach(([x, y], i) => {
    const px = (x - CX) * SCALE;
    const py = -(y - CY) * SCALE; // Flip Y for 3D coordinate space
    if (i === 0) shape.moveTo(px, py);
    else shape.lineTo(px, py);
  });
  shape.closePath();
  return shape;
}

// 7 Ascending Steps representing the "Step" foundation of the brand
const STEPS = 7;
const STEP_W = 0.44;
const STEP_H = 0.22;
const STEP_D = 1.15;
const STEP_COLORS = [
  "#B2D8D8",
  "#90C8C8",
  "#66B2B2",
  "#449E9E",
  "#268C8C",
  "#008080",
  "#006666",
];

function PrimeStep3DLogo() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const { pillarShape, flapShape, ribbonShape } = useMemo(() => {
    return {
      pillarShape: makeShape(PILLAR_POINTS),
      flapShape: makeShape(FLAP_POINTS),
      ribbonShape: makeShape(BLACK_RIBBON_POINTS),
    };
  }, []);

  const ribbonExtrude = useMemo(
    () => ({
      depth: 0.52,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 5,
    }),
    []
  );

  const pillarExtrude = useMemo(
    () => ({
      depth: 0.58,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 5,
    }),
    []
  );

  const flapExtrude = useMemo(
    () => ({
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 4,
    }),
    []
  );

  useFrame((state, dt) => {
    const g = groupRef.current;
    if (!g) return;

    const p = sceneState.progress;
    const { x, y } = state.pointer;

    // Fluid on-scroll rotation:
    // Starts at a proud 3/4 isometric perspective and smoothly glides & orbits on scroll
    const targetRotY = -0.32 + x * 0.28 + p * 1.5;
    const targetRotX = 0.08 - y * 0.14 + p * 0.22;
    const targetPosY = -0.15 + p * 0.65;
    const targetScale = 0.95 + p * 0.08;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 3.8, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX, 3.8, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetPosY, 3.8, dt);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, targetScale, 3.8, dt));

    if (ringRef.current) {
      ringRef.current.rotation.z += dt * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* Subtle orbital luminous cyan halo */}
      <mesh ref={ringRef} position={[0.2, 0.4, -0.9]} rotation={[-Math.PI / 4, 0.35, 0]}>
        <torusGeometry args={[2.9, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#1C9794"
          emissive="#1C9794"
          emissiveIntensity={0.65}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* The 3D Sculpted Prime Step Official Emblem */}
      <group position={[-0.1, 0.45, 0.1]}>
        {/* Black Chevron Top Ribbon (Piano Black Finish with Beveled Highlights) */}
        <mesh position={[0, 0, 0.04]} castShadow receiveShadow>
          <extrudeGeometry args={[ribbonShape, ribbonExtrude]} />
          <meshPhysicalMaterial
            color="#121316"
            roughness={0.16}
            metalness={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={0.98}
          />
        </mesh>

        {/* Upward Cyan-Teal Pillar (Anodized Jewel Teal Surface) */}
        <mesh position={[0, 0, -0.02]} castShadow receiveShadow>
          <extrudeGeometry args={[pillarShape, pillarExtrude]} />
          <meshPhysicalMaterial
            color="#178F8C"
            emissive="#004D4D"
            emissiveIntensity={0.28}
            roughness={0.15}
            metalness={0.55}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={0.95}
          />
        </mesh>

        {/* Top-Left Cyan Accent Flap */}
        <mesh position={[0, 0, 0.08]} castShadow receiveShadow>
          <extrudeGeometry args={[flapShape, flapExtrude]} />
          <meshPhysicalMaterial
            color="#2DB6AE"
            emissive="#1E9C99"
            emissiveIntensity={0.45}
            roughness={0.12}
            metalness={0.4}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
          />
        </mesh>
      </group>

      {/* Ascending Architectural Pedestal Stairs */}
      <group position={[0.4, -1.9, -0.3]}>
        {Array.from({ length: STEPS }).map((_, i) => {
          const h = STEP_H * (i + 1);
          const x = (i - (STEPS - 1) / 2) * (STEP_W * 0.95);
          return (
            <group key={i} position={[x, h / 2, -i * 0.08]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[STEP_W, h, STEP_D]} />
                <meshPhysicalMaterial
                  color={STEP_COLORS[i]}
                  roughness={0.28}
                  metalness={0.25}
                  clearcoat={0.65}
                  clearcoatRoughness={0.18}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Soft Ground Contact Shadow */}
      <ContactShadows
        position={[0, -2.15, 0]}
        opacity={0.38}
        scale={8.5}
        blur={2.2}
        far={4}
        color="#002424"
      />
    </group>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.45, 10.4], fov: 35 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.75} color="#FFFFFF" />
      <hemisphereLight args={["#FFFFFF", "#1E9C99", 0.85]} />

      {/* Key Directional Light for Crisp Chrome Highlights */}
      <directionalLight
        position={[6, 9, 7]}
        intensity={2.8}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Cyan Rim Light for Accent Silhouette */}
      <directionalLight position={[-7, 4, 3]} intensity={2.2} color="#2DB6AE" />

      {/* Warm Fill Light */}
      <directionalLight position={[2, -4, -4]} intensity={0.7} color="#B2D8D8" />

      {/* Subtle organic floating physics */}
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.35}>
        <PrimeStep3DLogo />
      </Float>
    </Canvas>
  );
}
