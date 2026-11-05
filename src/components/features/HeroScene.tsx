"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/lib/scroll";

// Center of official mark in original vector coordinates
const CX = 396.5;
const CY = 788.5;
// Architectural scale calibrated for centered heroic presence
const SCALE = 0.0056;

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

const CORE_POINTS: [number, number][] = [
  [260, 600],
  [360, 520],
  [480, 590],
  [480, 720],
  [380, 790],
  [380, 670],
];

function makeShape(pts: [number, number][]): THREE.Shape {
  const shape = new THREE.Shape();
  pts.forEach(([x, y], i) => {
    const px = (x - CX) * SCALE;
    const py = -(y - CY) * SCALE;
    if (i === 0) shape.moveTo(px, py);
    else shape.lineTo(px, py);
  });
  shape.closePath();
  return shape;
}

/**
 * Apple-Calibrated Hyper-Realistic 3D Architectural Monument
 *
 * Materials:
 * - Shell: High-gloss Obsidian Deep Teal Titanium with crystal clearcoat
 * - Pillar: Precision Satin Jewel Anodized Teal
 * - Eaves: Luminous Frosted Cyan Glass with light transmission
 * - Core: Optical Precision Glass Prism
 *
 * Scroll Motion:
 * - Fluid, cinematic rotation and assembly as the user traverses the narrative.
 */
function AppleArchitecturalMonument() {
  const groupRef = useRef<THREE.Group>(null);
  const canopyRef = useRef<THREE.Group>(null);
  const pillarRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);

  const { pillarShape, flapShape, ribbonShape, coreShape } = useMemo(() => {
    return {
      pillarShape: makeShape(PILLAR_POINTS),
      flapShape: makeShape(FLAP_POINTS),
      ribbonShape: makeShape(BLACK_RIBBON_POINTS),
      coreShape: makeShape(CORE_POINTS),
    };
  }, []);

  // Premium CNC diamond-cut chamfer bevel configurations
  const ribbonExtrude = useMemo(
    () => ({
      depth: 0.7,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 12,
    }),
    []
  );

  const pillarExtrude = useMemo(
    () => ({
      depth: 0.65,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.035,
      bevelSegments: 12,
    }),
    []
  );

  const flapExtrude = useMemo(
    () => ({
      depth: 0.6,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.025,
      bevelSegments: 8,
    }),
    []
  );

  const coreExtrude = useMemo(
    () => ({
      depth: 0.45,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 8,
    }),
    []
  );

  useFrame((state, dt) => {
    const g = groupRef.current;
    if (!g) return;

    const p = sceneState.progress;
    const { x, y } = state.pointer;

    // Smooth cinematic studio orbit responding subtly to cursor & scroll
    const targetRotY = 0.05 + x * 0.18 + p * 0.75;
    const targetRotX = -0.04 - y * 0.12 + p * 0.12;
    const targetPosY = 0.08 - p * 0.18;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 3.5, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX, 3.5, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetPosY, 3.5, dt);

    // ELEGANT ARCHITECTURAL EXPANSION ON SCROLL
    const explode = Math.pow(Math.min(1, Math.max(0, p * 2.0)), 1.2);

    if (canopyRef.current) {
      canopyRef.current.position.x = THREE.MathUtils.damp(canopyRef.current.position.x, explode * 0.42, 4.0, dt);
      canopyRef.current.position.y = THREE.MathUtils.damp(canopyRef.current.position.y, explode * 0.85, 4.0, dt);
      canopyRef.current.position.z = THREE.MathUtils.damp(canopyRef.current.position.z, 0.04 + explode * 0.6, 4.0, dt);
      canopyRef.current.rotation.x = THREE.MathUtils.damp(canopyRef.current.rotation.x, explode * 0.14, 4.0, dt);
    }

    if (flapRef.current) {
      flapRef.current.position.x = THREE.MathUtils.damp(flapRef.current.position.x, -explode * 0.65, 4.0, dt);
      flapRef.current.position.y = THREE.MathUtils.damp(flapRef.current.position.y, explode * 0.35, 4.0, dt);
      flapRef.current.position.z = THREE.MathUtils.damp(flapRef.current.position.z, 0.08 + explode * 0.8, 4.0, dt);
    }

    if (pillarRef.current) {
      pillarRef.current.position.x = THREE.MathUtils.damp(pillarRef.current.position.x, -explode * 0.35, 4.0, dt);
      pillarRef.current.position.y = THREE.MathUtils.damp(pillarRef.current.position.y, -explode * 0.75, 4.0, dt);
      pillarRef.current.position.z = THREE.MathUtils.damp(pillarRef.current.position.z, -0.02 - explode * 0.25, 4.0, dt);
      pillarRef.current.rotation.y = THREE.MathUtils.damp(pillarRef.current.rotation.y, explode * 0.12, 4.0, dt);
    }

    if (coreRef.current) {
      const coreScale = 0.85 + explode * 0.25;
      coreRef.current.scale.setScalar(THREE.MathUtils.damp(coreRef.current.scale.x, coreScale, 4.0, dt));
      coreRef.current.position.z = THREE.MathUtils.damp(coreRef.current.position.z, explode * 0.2, 4.0, dt);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.08, 0]}>
      {/* PART 01: OBSIDIAN DEEP TEAL CANOPY ARCH (Replaces flat black with rich teal-black titanium) */}
      <group ref={canopyRef} position={[0, 0, 0.04]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[ribbonShape, ribbonExtrude]} />
          <meshPhysicalMaterial
            color="#002424"
            roughness={0.06}
            metalness={0.5}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            reflectivity={0.98}
            envMapIntensity={1.6}
          />
        </mesh>
      </group>

      {/* PART 02: PRECISION ANODIZED SATIN TEAL PILLAR */}
      <group ref={pillarRef} position={[0, 0, -0.02]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[pillarShape, pillarExtrude]} />
          <meshPhysicalMaterial
            color="#008080"
            emissive="#003D3D"
            emissiveIntensity={0.22}
            roughness={0.16}
            metalness={0.78}
            clearcoat={0.95}
            clearcoatRoughness={0.04}
            reflectivity={0.94}
            envMapIntensity={1.5}
          />
        </mesh>
      </group>

      {/* PART 03: LUMINOUS FROSTED CYAN GLASS EAVES */}
      <group ref={flapRef} position={[0, 0, 0.08]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[flapShape, flapExtrude]} />
          <meshPhysicalMaterial
            color="#22AAA5"
            emissive="#19928D"
            emissiveIntensity={0.5}
            roughness={0.08}
            metalness={0.15}
            transmission={0.55}
            thickness={0.7}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            ior={1.52}
          />
        </mesh>
      </group>

      {/* PART 04: OPTICAL CRYSTAL GLASS INNER CORE */}
      <group ref={coreRef} position={[-0.1, 0.25, 0.02]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[coreShape, coreExtrude]} />
          <meshPhysicalMaterial
            color="#E6FBFB"
            emissive="#008080"
            emissiveIntensity={0.18}
            roughness={0.03}
            metalness={0.05}
            transmission={0.94}
            thickness={1.1}
            ior={1.54}
            clearcoat={1.0}
            transparent
            opacity={0.88}
          />
        </mesh>
      </group>

      {/* SOFT STUDIO GROUND CONTACT SHADOW */}
      <group position={[0, -2.0, 0]}>
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.38}
          scale={7.0}
          blur={3.0}
          far={4.0}
          color="#002424"
        />
      </group>
    </group>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 8.0], fov: 36 }}
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
        {/* Soft, warm studio fill */}
        <ambientLight intensity={0.75} color="#FFFFFF" />
        <hemisphereLight args={["#FFFFFF", "#003D3D", 0.65]} />

        {/* Primary Key Softbox — crisp chamfer specular highlight */}
        <directionalLight
          position={[6, 10, 7]}
          intensity={2.6}
          color="#FFFFFF"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Cool Cyan Rim Light — accentuating the architectural silhouette */}
        <directionalLight position={[-7, 4, 3]} intensity={2.2} color="#66B2B2" />

        {/* Soft Uplight bounce */}
        <directionalLight position={[0, -5, -2]} intensity={0.45} color="#F4F8F8" />

        {/* Float subtly in studio atmosphere */}
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15}>
          <AppleArchitecturalMonument />
        </Float>
      </Suspense>
    </Canvas>
  );
}
