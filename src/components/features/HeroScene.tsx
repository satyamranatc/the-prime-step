"use client";

import { Suspense, useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Text } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/lib/scroll";

// Center of official mark in original vector coordinates
const CX = 396.5;
const CY = 788.5;
// Architectural scale calibrated for heroic presence
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

// Global window mouse coordinates normalized from -1 to +1
const globalMouse = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
};

if (typeof window !== "undefined") {
  window.addEventListener(
    "mousemove",
    (e) => {
      globalMouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );
}

/**
 * Hyper-Realistic 3D Prime Step Architectural Monument
 *
 * Exact Logo Color Scheme:
 * - Roof Canopy: Deep Satin Obsidian Black (#1A1C1E) with diamond-cut chamfer highlights
 * - Eaves Flap: Vibrant Electric Cyan/Teal (#1EA896) matching logo underside
 * - Vertical Pillar: Official Prime Step Teal (#008080) with satin metallic depth
 * - "THE" Lettering: Perched in teal on the roof ridge
 * - Optical Inner Core: Refractive crystal glass revealed on scroll
 *
 * Interactive Mouse & Perspective Tracking:
 * - Fluidly tilts and shifts perspective as the mouse moves anywhere on screen.
 */
function OfficialLogoMonument() {
  const groupRef = useRef<THREE.Group>(null);
  const canopyRef = useRef<THREE.Group>(null);
  const pillarRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const dynamicLightRef = useRef<THREE.DirectionalLight>(null);

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
      bevelSegments: 8,
    }),
    []
  );

  useFrame((state, dt) => {
    const g = groupRef.current;
    if (!g) return;

    // Smoothly interpolate mouse coordinates for buttery motion
    globalMouse.x = THREE.MathUtils.damp(globalMouse.x, globalMouse.targetX, 4.0, dt);
    globalMouse.y = THREE.MathUtils.damp(globalMouse.y, globalMouse.targetY, 4.0, dt);

    const mx = globalMouse.x;
    const my = globalMouse.y;
    const p = sceneState.progress;

    // RESPONSIVE PERSPECTIVE & TILT:
    // Moving the mouse across the screen dynamically changes the 3D perspective angle
    const targetRotY = 0.06 + mx * 0.58 + p * 0.85;
    const targetRotX = -0.04 - my * 0.42 + p * 0.15;
    const targetPosX = mx * 0.32;
    const targetPosY = 0.08 - my * 0.22 - p * 0.18;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 3.8, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX, 3.8, dt);
    g.position.x = THREE.MathUtils.damp(g.position.x, targetPosX, 3.8, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetPosY, 3.8, dt);

    // Dynamic specular light tracking cursor position for tangible physical depth
    if (dynamicLightRef.current) {
      dynamicLightRef.current.position.x = 6 + mx * 5;
      dynamicLightRef.current.position.y = 8 - my * 4;
    }

    // Camera subtle parallax perspective shift
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, mx * 0.45, 3.0, dt);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, -my * 0.35, 3.0, dt);
    state.camera.lookAt(0, 0, 0);

    // SCROLL-ACTIVATED ARCHITECTURAL EXPLODED DECONSTRUCTION
    const explode = Math.pow(Math.min(1, Math.max(0, p * 2.0)), 1.2);

    if (canopyRef.current) {
      canopyRef.current.position.x = THREE.MathUtils.damp(canopyRef.current.position.x, explode * 0.45, 4.0, dt);
      canopyRef.current.position.y = THREE.MathUtils.damp(canopyRef.current.position.y, explode * 0.95, 4.0, dt);
      canopyRef.current.position.z = THREE.MathUtils.damp(canopyRef.current.position.z, 0.04 + explode * 0.65, 4.0, dt);
      canopyRef.current.rotation.x = THREE.MathUtils.damp(canopyRef.current.rotation.x, explode * 0.15, 4.0, dt);
    }

    if (flapRef.current) {
      flapRef.current.position.x = THREE.MathUtils.damp(flapRef.current.position.x, -explode * 0.7, 4.0, dt);
      flapRef.current.position.y = THREE.MathUtils.damp(flapRef.current.position.y, explode * 0.4, 4.0, dt);
      flapRef.current.position.z = THREE.MathUtils.damp(flapRef.current.position.z, 0.08 + explode * 0.85, 4.0, dt);
    }

    if (pillarRef.current) {
      pillarRef.current.position.x = THREE.MathUtils.damp(pillarRef.current.position.x, -explode * 0.4, 4.0, dt);
      pillarRef.current.position.y = THREE.MathUtils.damp(pillarRef.current.position.y, -explode * 0.8, 4.0, dt);
      pillarRef.current.position.z = THREE.MathUtils.damp(pillarRef.current.position.z, -0.02 - explode * 0.3, 4.0, dt);
      pillarRef.current.rotation.y = THREE.MathUtils.damp(pillarRef.current.rotation.y, explode * 0.14, 4.0, dt);
    }

    if (coreRef.current) {
      const coreScale = 0.85 + explode * 0.28;
      coreRef.current.scale.setScalar(THREE.MathUtils.damp(coreRef.current.scale.x, coreScale, 4.0, dt));
      coreRef.current.position.z = THREE.MathUtils.damp(coreRef.current.position.z, explode * 0.22, 4.0, dt);
    }
  });

  return (
    <>
      {/* Specular Key Light following cursor */}
      <directionalLight
        ref={dynamicLightRef}
        position={[6, 9, 7]}
        intensity={2.8}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      <group ref={groupRef} position={[0, 0.08, 0]}>
        {/* ========================================================
            PART 01: LOGO BLACK CANOPY ARCH (Exact Logo Black #1A1C1E)
            ======================================================== */}
        <group ref={canopyRef} position={[0, 0, 0.04]}>
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[ribbonShape, ribbonExtrude]} />
            <meshPhysicalMaterial
              color="#1A1C1E"
              roughness={0.08}
              metalness={0.4}
              clearcoat={1.0}
              clearcoatRoughness={0.03}
              reflectivity={0.95}
              envMapIntensity={1.4}
            />
          </mesh>

          {/* Official "THE" Lettering Perched on Roof Ridge */}
          <Text
            position={[-0.64, 1.74, 0.76]}
            rotation={[0, 0, 0.56]}
            fontSize={0.15}
            letterSpacing={0.22}
            color="#1EA896"
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.012}
            outlineColor="#003D3D"
          >
            THE
          </Text>
        </group>

        {/* ========================================================
            PART 02: LOGO VERTICAL PILLAR (Exact Logo Teal #008080)
            ======================================================== */}
        <group ref={pillarRef} position={[0, 0, -0.02]}>
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[pillarShape, pillarExtrude]} />
            <meshPhysicalMaterial
              color="#008080"
              emissive="#003D3D"
              emissiveIntensity={0.25}
              roughness={0.14}
              metalness={0.76}
              clearcoat={0.95}
              clearcoatRoughness={0.04}
              reflectivity={0.96}
              envMapIntensity={1.5}
            />
          </mesh>
        </group>

        {/* ========================================================
            PART 03: LOGO FRONT EAVES FLAP (Exact Logo Cyan #1EA896)
            ======================================================== */}
        <group ref={flapRef} position={[0, 0, 0.08]}>
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[flapShape, flapExtrude]} />
            <meshPhysicalMaterial
              color="#1EA896"
              emissive="#128A7A"
              emissiveIntensity={0.55}
              roughness={0.06}
              metalness={0.2}
              transmission={0.45}
              thickness={0.65}
              clearcoat={1.0}
              clearcoatRoughness={0.02}
              ior={1.52}
            />
          </mesh>
        </group>

        {/* ========================================================
            PART 04: OPTICAL CRYSTAL GLASS INNER CORE (Revealed On Scroll)
            ======================================================== */}
        <group ref={coreRef} position={[-0.1, 0.25, 0.02]}>
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[coreShape, coreExtrude]} />
            <meshPhysicalMaterial
              color="#E6FBFB"
              emissive="#008080"
              emissiveIntensity={0.16}
              roughness={0.03}
              metalness={0.05}
              transmission={0.95}
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
            scale={7.2}
            blur={2.8}
            far={4.2}
            color="#001C1C"
          />
        </group>
      </group>
    </>
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
        <ambientLight intensity={0.7} color="#FFFFFF" />
        <hemisphereLight args={["#FFFFFF", "#003D3D", 0.65]} />

        {/* Cool Cyan Rim Light — accentuating the architectural silhouette */}
        <directionalLight position={[-8, 4, 3]} intensity={2.2} color="#66B2B2" />

        {/* Soft Uplight bounce */}
        <directionalLight position={[0, -5, -2]} intensity={0.45} color="#F4F8F8" />

        {/* Float subtly in studio atmosphere */}
        <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.12}>
          <OfficialLogoMonument />
        </Float>
      </Suspense>
    </Canvas>
  );
}
