"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Text } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/lib/scroll";

// Center of official mark in original vector coordinates
const CX = 396.5;
const CY = 788.5;
// Architectural scale calibrated for maximum impact without clipping
const SCALE = 0.0054;

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

// Inner optical crystal core (sub-volume revealed during exploded view)
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
    const py = -(y - CY) * SCALE; // Flip Y for 3D coordinate space
    if (i === 0) shape.moveTo(px, py);
    else shape.lineTo(px, py);
  });
  shape.closePath();
  return shape;
}

/**
 * Hyper-Realistic Precision Exploded Architectural Logo
 * On scroll: Mechanically deconstructs into precision engineered parts & pieces:
 * - Part 01: Piano-Black Obsidian Cantilever Canopy
 * - Part 02: Anodized Aerospace Jewel Teal Pillar
 * - Part 03: Translucent Refractive Optical Glass Core
 * - Part 04: Luminous Cyan Eaves Accent Fin
 * - Part 05: Floating 3D Engineering Telemetry & Hairline Datum
 */
function ExplodedArchitecturalMonument() {
  const groupRef = useRef<THREE.Group>(null);
  const canopyRef = useRef<THREE.Group>(null);
  const pillarRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const calloutsRef = useRef<THREE.Group>(null);

  const { pillarShape, flapShape, ribbonShape, coreShape } = useMemo(() => {
    return {
      pillarShape: makeShape(PILLAR_POINTS),
      flapShape: makeShape(FLAP_POINTS),
      ribbonShape: makeShape(BLACK_RIBBON_POINTS),
      coreShape: makeShape(CORE_POINTS),
    };
  }, []);

  // Precision CNC-milled extrusion with ultra-smooth diamond-cut chamfers
  const ribbonExtrude = useMemo(
    () => ({
      depth: 0.72,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.035,
      bevelSegments: 10,
    }),
    []
  );

  const pillarExtrude = useMemo(
    () => ({
      depth: 0.66,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.035,
      bevelSegments: 10,
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
      bevelSegments: 6,
    }),
    []
  );

  useFrame((state, dt) => {
    const g = groupRef.current;
    if (!g) return;

    const p = sceneState.progress;
    const { x, y } = state.pointer;

    // Fluid base rotation responding subtly to cursor & scroll
    const baseRotY = 0.04 + x * 0.22 + p * 0.85;
    const baseRotX = -0.02 - y * 0.14 + p * 0.15;
    const basePosY = 0.1 - p * 0.2;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, baseRotY, 3.8, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, baseRotX, 3.8, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, basePosY, 3.8, dt);

    // EXPLODED VIEW MATH (Opening into precision parts & pieces on scroll)
    // Curve begins after a gentle scroll threshold and expands dramatically
    const explode = Math.pow(Math.min(1, Math.max(0, p * 2.2)), 1.15);

    // 1. Canopy lifts upward, back, and tilts along its roof ridge
    if (canopyRef.current) {
      canopyRef.current.position.x = THREE.MathUtils.damp(canopyRef.current.position.x, explode * 0.55, 4.0, dt);
      canopyRef.current.position.y = THREE.MathUtils.damp(canopyRef.current.position.y, explode * 1.15, 4.0, dt);
      canopyRef.current.position.z = THREE.MathUtils.damp(canopyRef.current.position.z, 0.04 + explode * 0.85, 4.0, dt);
      canopyRef.current.rotation.x = THREE.MathUtils.damp(canopyRef.current.rotation.x, explode * 0.18, 4.0, dt);
      canopyRef.current.rotation.z = THREE.MathUtils.damp(canopyRef.current.rotation.z, -explode * 0.12, 4.0, dt);
    }

    // 2. Cyan Eaves Fin glides outward laterally
    if (flapRef.current) {
      flapRef.current.position.x = THREE.MathUtils.damp(flapRef.current.position.x, -explode * 0.85, 4.0, dt);
      flapRef.current.position.y = THREE.MathUtils.damp(flapRef.current.position.y, explode * 0.45, 4.0, dt);
      flapRef.current.position.z = THREE.MathUtils.damp(flapRef.current.position.z, 0.08 + explode * 1.1, 4.0, dt);
    }

    // 3. Teal Pillar steps forward and down, grounding the foundation
    if (pillarRef.current) {
      pillarRef.current.position.x = THREE.MathUtils.damp(pillarRef.current.position.x, -explode * 0.45, 4.0, dt);
      pillarRef.current.position.y = THREE.MathUtils.damp(pillarRef.current.position.y, -explode * 0.95, 4.0, dt);
      pillarRef.current.position.z = THREE.MathUtils.damp(pillarRef.current.position.z, -0.02 - explode * 0.35, 4.0, dt);
      pillarRef.current.rotation.y = THREE.MathUtils.damp(pillarRef.current.rotation.y, explode * 0.15, 4.0, dt);
    }

    // 4. Optical Crystal Core expands from the center
    if (coreRef.current) {
      const coreScale = 0.8 + explode * 0.3;
      coreRef.current.scale.setScalar(THREE.MathUtils.damp(coreRef.current.scale.x, coreScale, 4.0, dt));
      coreRef.current.position.z = THREE.MathUtils.damp(coreRef.current.position.z, explode * 0.25, 4.0, dt);
    }

    // 5. Engineering Callout telemetry fades in during explosion
    if (calloutsRef.current) {
      const targetOpacity = Math.max(0, Math.min(1, (explode - 0.2) / 0.6));
      calloutsRef.current.visible = targetOpacity > 0.01;
      calloutsRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const m = (child as THREE.Mesh).material as THREE.Material;
          m.transparent = true;
          m.opacity = targetOpacity;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* ========================================================
          PART 01: PIANO-BLACK OBSIDIAN CANOPY ARCH (Outer Shell)
          ======================================================== */}
      <group ref={canopyRef} position={[0, 0, 0.04]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[ribbonShape, ribbonExtrude]} />
          <meshPhysicalMaterial
            color="#0A0C0F"
            roughness={0.05}
            metalness={0.4}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            reflectivity={0.98}
            envMapIntensity={1.4}
          />
        </mesh>

        {/* 3D Official "THE" Lettering Perched on Roof Ridge */}
        <Text
          position={[-0.62, 1.72, 0.76]}
          rotation={[0, 0, 0.56]}
          fontSize={0.15}
          letterSpacing={0.22}
          color="#22AAA5"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.012}
          outlineColor="#004D4D"
        >
          THE
        </Text>
      </group>

      {/* ========================================================
          PART 02: ANODIZED AEROSPACE TEAL PILLAR (Left Monolith)
          ======================================================== */}
      <group ref={pillarRef} position={[0, 0, -0.02]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[pillarShape, pillarExtrude]} />
          <meshPhysicalMaterial
            color="#008080"
            emissive="#004444"
            emissiveIntensity={0.2}
            roughness={0.14}
            metalness={0.82}
            clearcoat={0.9}
            clearcoatRoughness={0.05}
            reflectivity={0.96}
            envMapIntensity={1.5}
          />
        </mesh>
      </group>

      {/* ========================================================
          PART 03: LUMINOUS CYAN EAVES ACCENT FIN (Front Flap)
          ======================================================== */}
      <group ref={flapRef} position={[0, 0, 0.08]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[flapShape, flapExtrude]} />
          <meshPhysicalMaterial
            color="#22AAA5"
            emissive="#19928D"
            emissiveIntensity={0.65}
            roughness={0.08}
            metalness={0.2}
            transmission={0.45}
            thickness={0.6}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
          />
        </mesh>
      </group>

      {/* ========================================================
          PART 04: OPTICAL CRYSTAL GLASS CORE (Revealed On Scroll)
          ======================================================== */}
      <group ref={coreRef} position={[-0.1, 0.25, 0.02]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[coreShape, coreExtrude]} />
          <meshPhysicalMaterial
            color="#E8FFFF"
            emissive="#008080"
            emissiveIntensity={0.15}
            roughness={0.04}
            metalness={0.05}
            transmission={0.92}
            thickness={1.1}
            ior={1.54}
            clearcoat={1.0}
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      {/* ========================================================
          PART 05: FLOATING 3D TECHNICAL CALLOUT TELEMETRY (HUD)
          Appears dynamically as the parts explode on scroll
          ======================================================== */}
      <group ref={calloutsRef} visible={false}>
        {/* Callout 01: Canopy Arch */}
        <group position={[1.8, 1.8, 0.6]}>
          <Text
            fontSize={0.11}
            color="#008080"
            anchorX="left"
            anchorY="middle"
          >
            01 // CANTILEVER CANOPY
          </Text>
          <Text
            position={[0, -0.15, 0]}
            fontSize={0.085}
            color="#557777"
            anchorX="left"
            anchorY="middle"
          >
            Piano Obsidian Titanium · 0.72m
          </Text>
          <mesh position={[-0.6, -0.15, -0.2]} rotation={[0, 0, 0.4]}>
            <cylinderGeometry args={[0.006, 0.006, 0.8, 8]} />
            <meshBasicMaterial color="#008080" transparent opacity={0.6} />
          </mesh>
        </group>

        {/* Callout 02: Monolithic Pillar */}
        <group position={[-2.4, -0.8, 0.3]}>
          <Text
            fontSize={0.11}
            color="#008080"
            anchorX="right"
            anchorY="middle"
          >
            02 // MONOLITH PILLAR
          </Text>
          <Text
            position={[0, -0.15, 0]}
            fontSize={0.085}
            color="#557777"
            anchorX="right"
            anchorY="middle"
          >
            Anodized Jewel Teal · 0.66m
          </Text>
          <mesh position={[0.6, -0.1, 0.1]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.006, 0.006, 0.8, 8]} />
            <meshBasicMaterial color="#008080" transparent opacity={0.6} />
          </mesh>
        </group>

        {/* Callout 03: Optical Prism */}
        <group position={[1.6, -0.2, 0.8]}>
          <Text
            fontSize={0.11}
            color="#22AAA5"
            anchorX="left"
            anchorY="middle"
          >
            03 // OPTICAL CORE
          </Text>
          <Text
            position={[0, -0.15, 0]}
            fontSize={0.085}
            color="#557777"
            anchorX="left"
            anchorY="middle"
          >
            Refractive Crystal · IOR 1.54
          </Text>
          <mesh position={[-0.5, 0.1, -0.2]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.006, 0.006, 0.7, 8]} />
            <meshBasicMaterial color="#22AAA5" transparent opacity={0.6} />
          </mesh>
        </group>
      </group>

      {/* Architectural Base Ring Datum */}
      <group position={[0, -2.1, 0]}>
        {/* Concentric Datum Rings */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 1.83, 64]} />
          <meshBasicMaterial color="#008080" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.8, 2.82, 64]} />
          <meshBasicMaterial color="#008080" transparent opacity={0.18} side={THREE.DoubleSide} />
        </mesh>

        {/* Realistic Ground Contact Shadow */}
        <ContactShadows
          position={[0, 0.05, 0]}
          opacity={0.36}
          scale={7.5}
          blur={2.4}
          far={4.5}
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
      camera={{ position: [0, 0, 8.2], fov: 38 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.18,
      }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.65} color="#FFFFFF" />
        <hemisphereLight args={["#FFFFFF", "#004D4D", 0.7]} />

        {/* Key Studio Light for Crisp Diamond-Cut Chamfer Highlights */}
        <directionalLight
          position={[8, 11, 8]}
          intensity={2.9}
          color="#FFFFFF"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Teal Silhouette Rim Light */}
        <directionalLight position={[-8, 5, 3]} intensity={2.4} color="#66B2B2" />

        {/* Soft Ground Bounce Fill Light */}
        <directionalLight position={[0, -5, -2]} intensity={0.55} color="#FAFCFC" />

        {/* Gentle Ambient Float */}
        <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.18}>
          <ExplodedArchitecturalMonument />
        </Float>
      </Suspense>
    </Canvas>
  );
}
