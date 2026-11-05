"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Text } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/lib/scroll";

// Center of mark in original vector coordinates
const CX = 396.5;
const CY = 788.5;
// Perfectly calibrated scale: 64% of viewport height, zero clipping
const SCALE = 0.0055;

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

function HyperRealisticEmblem() {
  const groupRef = useRef<THREE.Group>(null);

  const { pillarShape, flapShape, ribbonShape } = useMemo(() => {
    return {
      pillarShape: makeShape(PILLAR_POINTS),
      flapShape: makeShape(FLAP_POINTS),
      ribbonShape: makeShape(BLACK_RIBBON_POINTS),
    };
  }, []);

  // Architectural chamfered bevels catching specular light
  const ribbonExtrude = useMemo(
    () => ({
      depth: 0.68,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.025,
      bevelSegments: 8,
    }),
    []
  );

  const pillarExtrude = useMemo(
    () => ({
      depth: 0.62,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.025,
      bevelSegments: 8,
    }),
    []
  );

  const flapExtrude = useMemo(
    () => ({
      depth: 0.58,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.02,
      bevelSegments: 6,
    }),
    []
  );

  useFrame((state, dt) => {
    const g = groupRef.current;
    if (!g) return;

    const p = sceneState.progress;
    const { x, y } = state.pointer;

    // Fluid physics: perfectly facing at rest, smooth glints on mouse move and scroll
    const targetRotY = 0.05 + x * 0.22 + p * 0.95;
    const targetRotX = -0.02 - y * 0.14 + p * 0.16;
    const targetPosY = -0.05 + p * 0.35;
    const targetScale = 1.0 + p * 0.05;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 3.8, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX, 3.8, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetPosY, 3.8, dt);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, targetScale, 3.8, dt));
  });

  return (
    <group ref={groupRef} position={[0, 0.12, 0]}>
      {/* 3D Sculpted Official The Prime Step Emblem */}
      <group position={[0, 0, 0]}>
        {/* Black Chevron Top Canopy (Piano-Black Obsidian Finish with Polished Chamfers) */}
        <mesh position={[0, 0, 0.04]} castShadow receiveShadow>
          <extrudeGeometry args={[ribbonShape, ribbonExtrude]} />
          <meshPhysicalMaterial
            color="#0C0E11"
            roughness={0.06}
            metalness={0.32}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
            reflectivity={0.98}
          />
        </mesh>

        {/* Upward Architectural Teal Pillar (Anodized Jewel Teal Surface) */}
        <mesh position={[0, 0, -0.02]} castShadow receiveShadow>
          <extrudeGeometry args={[pillarShape, pillarExtrude]} />
          <meshPhysicalMaterial
            color="#008080"
            emissive="#004444"
            emissiveIntensity={0.18}
            roughness={0.11}
            metalness={0.5}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
            reflectivity={0.98}
          />
        </mesh>

        {/* Top-Left Cyan Eaves Flap */}
        <mesh position={[0, 0, 0.08]} castShadow receiveShadow>
          <extrudeGeometry args={[flapShape, flapExtrude]} />
          <meshPhysicalMaterial
            color="#22AAA5"
            emissive="#19928D"
            emissiveIntensity={0.45}
            roughness={0.09}
            metalness={0.2}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
          />
        </mesh>

        {/* Official "THE" Lettering along the Roof Slant */}
        <Text
          position={[-0.62, 1.72, 0.74]}
          rotation={[0, 0, 0.56]}
          fontSize={0.16}
          letterSpacing={0.2}
          color="#22AAA5"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.012}
          outlineColor="#004D4D"
        >
          THE
        </Text>
      </group>

      {/* Realistic Ground Contact Shadow */}
      <ContactShadows
        position={[0, -1.95, 0]}
        opacity={0.34}
        scale={6.8}
        blur={2.4}
        far={4.5}
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
      camera={{ position: [0, 0, 8.0], fov: 38 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} color="#FFFFFF" />
        <hemisphereLight args={["#FFFFFF", "#008080", 0.65]} />

        {/* Key Studio Light for Crisp Bevel Edge Highlights */}
        <directionalLight
          position={[7, 10, 8]}
          intensity={2.8}
          color="#FFFFFF"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Teal Silhouette Rim Light */}
        <directionalLight position={[-8, 5, 3]} intensity={2.2} color="#66B2B2" />

        {/* Soft Ground Bounce Fill Light */}
        <directionalLight position={[0, -5, -2]} intensity={0.5} color="#FAFCFC" />

        {/* Floating Physics Wrapper */}
        <Float speed={1.8} rotationIntensity={0.14} floatIntensity={0.22}>
          <HyperRealisticEmblem />
        </Float>
      </Suspense>
    </Canvas>
  );
}
