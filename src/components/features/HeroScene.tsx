"use client";

import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, Text } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";
import { easing } from "maath";
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

// Global mouse tracker across window
const mouseState = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
};

if (typeof window !== "undefined") {
  window.addEventListener(
    "mousemove",
    (e) => {
      mouseState.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseState.targetY = -(e.clientY / window.innerHeight) * 2 + 1; // standard OpenGL Y
    },
    { passive: true }
  );

  // Device orientation fallback on mobile
  window.addEventListener(
    "deviceorientation",
    (e) => {
      if (e.gamma !== null && e.beta !== null) {
        mouseState.targetX = Math.min(1, Math.max(-1, e.gamma / 30));
        mouseState.targetY = Math.min(1, Math.max(-1, (e.beta - 45) / 30));
      }
    },
    { passive: true }
  );
}

/**
 * Hyper-Realistic Isometric "P" Monument
 * Materials:
 * - Black Block: Polished Obsidian (#050505), roughness 0.12, metalness 0.1, clearcoat 1.0, clearcoatRoughness 0.05
 * - Teal Block: Deep Teal (#1F5F5F) Glossy Ceramic/Glass, roughness 0.15, clearcoat 1.0, sheen 0.6
 * - Accent Piece: Lighter Teal (#2EC4B6) with subtle transmission
 * - Inner seams: Thin teal emissive edge glow (#2EC4B6)
 */
function LogoModel({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const canopyRef = useRef<THREE.Group>(null);
  const pillarRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const labelRef = useRef<THREE.Group>(null);
  const mouseLightRef = useRef<THREE.PointLight>(null);

  const { pillarShape, flapShape, ribbonShape, coreShape } = useMemo(() => {
    return {
      pillarShape: makeShape(PILLAR_POINTS),
      flapShape: makeShape(FLAP_POINTS),
      ribbonShape: makeShape(BLACK_RIBBON_POINTS),
      coreShape: makeShape(CORE_POINTS),
    };
  }, []);

  // Precision diamond-cut bevel extrusions
  const ribbonExtrude = useMemo(
    () => ({
      depth: 0.72,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.038,
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

    // Smooth damp mouse coordinates with maath damping
    easing.damp(mouseState, "x", mouseState.targetX, 0.22, dt);
    easing.damp(mouseState, "y", mouseState.targetY, 0.22, dt);

    const mx = mouseState.x;
    const my = mouseState.y;
    const p = sceneState.progress;
    const t = state.clock.elapsedTime;

    // 1. Mouse Light smooth tracking across 3D space
    if (mouseLightRef.current) {
      easing.damp3(
        mouseLightRef.current.position,
        [mx * 4.5 + 1.2, my * 4.0 + 2.0, 4.5],
        0.18,
        dt
      );
    }

    // 2. Interactive tilt (clamped to max ~12 degrees = 0.21 rad) & gentle idle floating
    const maxTilt = reducedMotion ? 0 : 0.21;
    const idleFloat = reducedMotion ? 0 : Math.sin(t * 1.2) * 0.08;
    const idleSlowRot = reducedMotion ? 0 : Math.sin(t * 0.4) * 0.04;

    const targetRotX = -my * maxTilt + p * 0.12;
    const targetRotY = mx * maxTilt + idleSlowRot + p * 0.85;
    const targetRotZ = -mx * 0.04;

    easing.dampE(g.rotation, [targetRotX, targetRotY, targetRotZ], 0.24, dt);
    easing.damp(g.position, "y", 0.06 + idleFloat - p * 0.18, 0.24, dt);
    easing.damp(g.position, "x", mx * 0.18, 0.24, dt);

    // 3. Subtle Parallax between label, accent piece and main body
    if (labelRef.current) {
      labelRef.current.position.x = -0.64 + mx * 0.08;
      labelRef.current.position.y = 1.74 + my * 0.06;
    }
    if (flapRef.current) {
      flapRef.current.position.z = 0.08 + mx * 0.05;
    }

    // 4. Scroll Deconstruction animation
    const explode = Math.pow(Math.min(1, Math.max(0, p * 2.0)), 1.2);

    if (canopyRef.current) {
      easing.damp(canopyRef.current.position, "x", explode * 0.45, 0.25, dt);
      easing.damp(canopyRef.current.position, "y", explode * 0.95, 0.25, dt);
      easing.damp(canopyRef.current.position, "z", 0.04 + explode * 0.65, 0.25, dt);
      easing.damp(canopyRef.current.rotation, "x", explode * 0.15, 0.25, dt);
    }

    if (flapRef.current) {
      easing.damp(flapRef.current.position, "x", -explode * 0.7, 0.25, dt);
      easing.damp(flapRef.current.position, "y", explode * 0.4, 0.25, dt);
      easing.damp(flapRef.current.position, "z", 0.08 + explode * 0.85, 0.25, dt);
    }

    if (pillarRef.current) {
      easing.damp(pillarRef.current.position, "x", -explode * 0.4, 0.25, dt);
      easing.damp(pillarRef.current.position, "y", -explode * 0.8, 0.25, dt);
      easing.damp(pillarRef.current.position, "z", -0.02 - explode * 0.3, 0.25, dt);
      easing.damp(pillarRef.current.rotation, "y", explode * 0.14, 0.25, dt);
    }

    if (coreRef.current) {
      const coreScale = 0.85 + explode * 0.28;
      easing.damp(coreRef.current.scale, "x", coreScale, 0.25, dt);
      easing.damp(coreRef.current.scale, "y", coreScale, 0.25, dt);
      easing.damp(coreRef.current.scale, "z", coreScale, 0.25, dt);
      easing.damp(coreRef.current.position, "z", explode * 0.22, 0.25, dt);
    }
  });

  return (
    <>
      {/* Dynamic 3D Point Light that tracks mouse cursor across space */}
      <pointLight
        ref={mouseLightRef}
        position={[2, 3, 5]}
        intensity={3.2}
        distance={12}
        decay={2}
        color="#FFFFFF"
      />

      <group ref={groupRef} position={[0, 0.06, 0]}>
        {/* ========================================================
            PART 01: POLISHED OBSIDIAN BLACK BLOCK (#050505)
            ======================================================== */}
        <group ref={canopyRef} position={[0, 0, 0.04]}>
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[ribbonShape, ribbonExtrude]} />
            <meshPhysicalMaterial
              color="#050505"
              roughness={0.12}
              metalness={0.1}
              clearcoat={1.0}
              clearcoatRoughness={0.05}
              reflectivity={0.96}
              envMapIntensity={1.3}
            />
          </mesh>

          {/* Thin Emissive Inner Seam Glow */}
          <lineSegments position={[0, 0, 0.73]}>
            <edgesGeometry args={[new THREE.ExtrudeGeometry(ribbonShape, { depth: 0.01, bevelEnabled: false })]} />
            <lineBasicMaterial color="#2EC4B6" transparent opacity={0.35} />
          </lineSegments>

          {/* "THE" Label Perched on Roof Ridge with Independent Parallax */}
          <group ref={labelRef} position={[-0.64, 1.74, 0.77]}>
            <Text
              rotation={[0, 0, 0.56]}
              fontSize={0.155}
              letterSpacing={0.22}
              color="#2EC4B6"
              anchorX="center"
              anchorY="bottom"
              outlineWidth={0.012}
              outlineColor="#050505"
            >
              THE
            </Text>
          </group>
        </group>

        {/* ========================================================
            PART 02: GLOSSY DEEP TEAL PILLAR (#1F5F5F)
            ======================================================== */}
        <group ref={pillarRef} position={[0, 0, -0.02]}>
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[pillarShape, pillarExtrude]} />
            <meshPhysicalMaterial
              color="#1F5F5F"
              emissive="#1F5F5F"
              emissiveIntensity={0.2}
              roughness={0.15}
              metalness={0.18}
              clearcoat={1.0}
              clearcoatRoughness={0.06}
              sheen={0.6}
              sheenColor="#2EC4B6"
              reflectivity={0.94}
              envMapIntensity={1.4}
            />
          </mesh>

          {/* Inner seam accent line */}
          <lineSegments position={[0, 0, 0.67]}>
            <edgesGeometry args={[new THREE.ExtrudeGeometry(pillarShape, { depth: 0.01, bevelEnabled: false })]} />
            <lineBasicMaterial color="#2EC4B6" transparent opacity={0.3} />
          </lineSegments>
        </group>

        {/* ========================================================
            PART 03: LIGHTER TEAL ACCENT PIECE (#2EC4B6)
            ======================================================== */}
        <group ref={flapRef} position={[0, 0, 0.08]}>
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[flapShape, flapExtrude]} />
            <meshPhysicalMaterial
              color="#2EC4B6"
              emissive="#1E8E84"
              emissiveIntensity={0.4}
              roughness={0.1}
              metalness={0.1}
              transmission={0.4}
              thickness={0.7}
              clearcoat={1.0}
              clearcoatRoughness={0.03}
              ior={1.52}
            />
          </mesh>
        </group>

        {/* ========================================================
            PART 04: OPTICAL CRYSTAL INNER CORE (Revealed On Scroll)
            ======================================================== */}
        <group ref={coreRef} position={[-0.1, 0.25, 0.02]}>
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[coreShape, coreExtrude]} />
            <meshPhysicalMaterial
              color="#E8FFFF"
              emissive="#1F5F5F"
              emissiveIntensity={0.15}
              roughness={0.04}
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

        {/* SOFT PHYSICAL GROUND CONTACT SHADOWS */}
        <group position={[0, -2.0, 0]}>
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.4}
            scale={7.5}
            blur={2.6}
            far={4.5}
            color="#051212"
          />
        </group>
      </group>
    </>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 8.0], fov: 36 }}
      shadows
      gl={{
        antialias: false, // SMAA pass handles high quality anti-aliasing in post-processing
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        {/* Ambient base */}
        <ambientLight intensity={0.55} color="#FFFFFF" />

        {/* Key Light (Upper Left Softbox) */}
        <directionalLight
          position={[-6, 8, 6]}
          intensity={2.4}
          color="#FFFFFF"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Teal Rim Light (From Right) */}
        <directionalLight position={[7, 4, 3]} intensity={2.6} color="#2EC4B6" />

        {/* Soft Warm Ground Fill */}
        <directionalLight position={[0, -6, -2]} intensity={0.5} color="#F4F8F8" />

        {/* Studio Lightformer Softbox Environment */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            {/* Key Softbox (Upper Left) */}
            <Lightformer
              form="rect"
              intensity={4.5}
              position={[-5, 5, -5]}
              scale={[10, 5, 1]}
              target={[0, 0, 0]}
            />
            {/* Teal Rim Softbox (Right) */}
            <Lightformer
              form="rect"
              intensity={3.8}
              color="#2EC4B6"
              position={[6, 2, -2]}
              scale={[10, 4, 1]}
              target={[0, 0, 0]}
            />
            {/* Overhead Diffuser */}
            <Lightformer
              form="ring"
              intensity={2.2}
              position={[0, 8, 2]}
              scale={8}
              target={[0, 0, 0]}
            />
          </group>
        </Environment>

        {/* Main Logo Monument */}
        <LogoModel reducedMotion={reducedMotion} />

        {/* Subtle Cinematic Post-Processing */}
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.88} luminanceSmoothing={0.2} intensity={0.35} />
          <Vignette eskil={false} offset={0.15} darkness={0.3} />
          <SMAA />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
