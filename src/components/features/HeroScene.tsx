"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
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
      globalMouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1; // standard Cartesian Y
    },
    { passive: true }
  );

  window.addEventListener(
    "deviceorientation",
    (e) => {
      if (e.gamma !== null && e.beta !== null) {
        globalMouse.targetX = Math.min(1, Math.max(-1, e.gamma / 28));
        globalMouse.targetY = Math.min(1, Math.max(-1, (e.beta - 40) / 28));
      }
    },
    { passive: true }
  );
}

// Generate high-resolution, vector-crisp 2D canvas textures for orbiting technology icons
function createTechIconTexture(type: "react" | "python" | "java" | "database" | "cloud" | "ai"): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.44;

  // 1. Sleek drop shadow
  ctx.save();
  ctx.shadowColor = "rgba(0, 77, 77, 0.22)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;

  // 2. Pure porcelain ceramic disc face
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.restore();

  // 3. Subtle translucent border
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(31, 157, 154, 0.35)";
  ctx.stroke();

  // 4. Vector Icon Art
  ctx.save();
  ctx.translate(cx, cy);

  if (type === "react") {
    ctx.strokeStyle = "#00D8FF";
    ctx.lineWidth = 6.5;
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 3);
      ctx.beginPath();
      ctx.ellipse(0, 0, 68, 25, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.fillStyle = "#00D8FF";
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "python") {
    ctx.lineWidth = 13;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Blue top serpent
    ctx.strokeStyle = "#387EB8";
    ctx.beginPath();
    ctx.moveTo(10, -42);
    ctx.lineTo(-18, -42);
    ctx.arcTo(-42, -42, -42, -18, 24);
    ctx.lineTo(-42, -2);
    ctx.arcTo(-42, 8, -32, 8, 14);
    ctx.lineTo(8, 8);
    ctx.stroke();

    ctx.fillStyle = "#387EB8";
    ctx.beginPath();
    ctx.arc(-20, -26, 5, 0, Math.PI * 2);
    ctx.fill();

    // Yellow bottom serpent
    ctx.strokeStyle = "#F5B041";
    ctx.beginPath();
    ctx.moveTo(-10, 42);
    ctx.lineTo(18, 42);
    ctx.arcTo(42, 42, 42, 18, 24);
    ctx.lineTo(42, 2);
    ctx.arcTo(42, -8, 32, -8, 14);
    ctx.lineTo(-8, -8);
    ctx.stroke();

    ctx.fillStyle = "#F5B041";
    ctx.beginPath();
    ctx.arc(20, 26, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "java") {
    // Steam plumes
    ctx.strokeStyle = "#E76F00";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(-14, -44);
    ctx.bezierCurveTo(-24, -26, 0, -26, -10, -6);
    ctx.stroke();

    ctx.strokeStyle = "#5382A1";
    ctx.beginPath();
    ctx.moveTo(6, -48);
    ctx.bezierCurveTo(-4, -30, 18, -30, 8, -6);
    ctx.stroke();

    // Cup body
    ctx.fillStyle = "#5382A1";
    ctx.beginPath();
    ctx.moveTo(-34, 4);
    ctx.lineTo(34, 4);
    ctx.lineTo(24, 36);
    ctx.arcTo(24, 46, 14, 46, 10);
    ctx.lineTo(-14, 46);
    ctx.arcTo(-24, 46, -24, 36, 10);
    ctx.closePath();
    ctx.fill();

    // Saucer
    ctx.strokeStyle = "#E76F00";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, 44, 40, 0.2, Math.PI - 0.2);
    ctx.stroke();
  } else if (type === "database") {
    ctx.lineWidth = 6.5;
    ctx.strokeStyle = "#1AAB95";
    ctx.fillStyle = "#E6F7F5";

    // Top ellipse
    ctx.beginPath();
    ctx.ellipse(0, -30, 44, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Middle segment
    ctx.beginPath();
    ctx.ellipse(0, 0, 44, 15, 0, 0, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-44, -30);
    ctx.lineTo(-44, 0);
    ctx.moveTo(44, -30);
    ctx.lineTo(44, 0);
    ctx.stroke();

    // Bottom segment
    ctx.beginPath();
    ctx.ellipse(0, 30, 44, 15, 0, 0, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-44, 0);
    ctx.lineTo(-44, 30);
    ctx.moveTo(44, 0);
    ctx.lineTo(44, 30);
    ctx.stroke();
  } else if (type === "cloud") {
    ctx.fillStyle = "#0284C7";
    ctx.beginPath();
    ctx.arc(-20, 8, 22, 0, Math.PI * 2);
    ctx.arc(8, -6, 30, 0, Math.PI * 2);
    ctx.arc(32, 10, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-20, 12, 52, 16);
  } else if (type === "ai") {
    // 4-point sparkle star
    ctx.fillStyle = "#8B5CF6";
    ctx.beginPath();
    ctx.moveTo(0, -48);
    ctx.quadraticCurveTo(0, 0, 48, 0);
    ctx.quadraticCurveTo(0, 0, 0, 48);
    ctx.quadraticCurveTo(0, 0, -48, 0);
    ctx.quadraticCurveTo(0, 0, 0, -48);
    ctx.fill();

    // Secondary sparkle
    ctx.fillStyle = "#1AAB95";
    ctx.beginPath();
    ctx.arc(30, -28, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

interface OrbitConfig {
  radius: number;
  rotation: [number, number, number];
  speed: number;
  iconA: {
    type: "react" | "python" | "java" | "database" | "cloud" | "ai";
    accent: string;
    offset: number;
  };
  iconB: {
    type: "react" | "python" | "java" | "database" | "cloud" | "ai";
    accent: string;
    offset: number;
  };
}

const ORBITS: OrbitConfig[] = [
  {
    radius: 2.65,
    rotation: [Math.PI * 0.35, Math.PI * 0.12, Math.PI * 0.22],
    speed: 0.85,
    iconA: { type: "react", accent: "#00D8FF", offset: 0 },
    iconB: { type: "cloud", accent: "#0284C7", offset: Math.PI },
  },
  {
    radius: 2.95,
    rotation: [-Math.PI * 0.32, -Math.PI * 0.1, -Math.PI * 0.25],
    speed: 0.72,
    iconA: { type: "python", accent: "#387EB8", offset: 1.2 },
    iconB: { type: "ai", accent: "#8B5CF6", offset: 1.2 + Math.PI },
  },
  {
    radius: 2.45,
    rotation: [Math.PI * 0.15, Math.PI * 0.45, -Math.PI * 0.12],
    speed: 0.95,
    iconA: { type: "java", accent: "#E76F00", offset: 2.4 },
    iconB: { type: "database", accent: "#1AAB95", offset: 2.4 + Math.PI },
  },
];

function SingleAtomicOrbit({
  config,
  textures,
}: {
  config: OrbitConfig;
  textures: Record<string, THREE.CanvasTexture>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeARef = useRef<THREE.Group>(null);
  const nodeBRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = sceneState.progress;
    // Slight expansion on scroll
    const expansion = 1 + p * 0.35;
    const currentRadius = config.radius * expansion;

    if (ringRef.current) {
      ringRef.current.scale.set(expansion, expansion, 1);
    }

    // Orbit angle
    const angleA = t * config.speed + config.iconA.offset;
    const angleB = t * config.speed + config.iconB.offset;

    if (nodeARef.current) {
      nodeARef.current.position.set(
        Math.cos(angleA) * currentRadius,
        Math.sin(angleA) * currentRadius,
        0
      );
      nodeARef.current.lookAt(state.camera.position);
    }

    if (nodeBRef.current) {
      nodeBRef.current.position.set(
        Math.cos(angleB) * currentRadius,
        Math.sin(angleB) * currentRadius,
        0
      );
      nodeBRef.current.lookAt(state.camera.position);
    }

    // Gentle gyroscopic precession
    if (groupRef.current) {
      groupRef.current.rotation.z = config.rotation[2] + Math.sin(t * 0.4) * 0.05;
    }
  });

  return (
    <group ref={groupRef} rotation={config.rotation}>
      {/* 1. Glowing Atomic Orbital Track Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[config.radius - 0.007, config.radius + 0.007, 128]} />
        <meshBasicMaterial
          color="#1F9D9A"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. Orbiting Tech Icon A ("Electron 1") */}
      <group ref={nodeARef}>
        {/* Front Icon Disc Face */}
        <mesh>
          <circleGeometry args={[0.26, 32]} />
          <meshBasicMaterial
            map={textures[config.iconA.type]}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Luminous Colored Rim Ring */}
        <mesh position={[0, 0, -0.003]}>
          <ringGeometry args={[0.25, 0.27, 32]} />
          <meshBasicMaterial
            color={config.iconA.accent}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight color={config.iconA.accent} intensity={0.4} distance={1.2} />
      </group>

      {/* 3. Orbiting Tech Icon B ("Electron 2") */}
      <group ref={nodeBRef}>
        {/* Front Icon Disc Face */}
        <mesh>
          <circleGeometry args={[0.26, 32]} />
          <meshBasicMaterial
            map={textures[config.iconB.type]}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Luminous Colored Rim Ring */}
        <mesh position={[0, 0, -0.003]}>
          <ringGeometry args={[0.25, 0.27, 32]} />
          <meshBasicMaterial
            color={config.iconB.accent}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight color={config.iconB.accent} intensity={0.4} distance={1.2} />
      </group>
    </group>
  );
}

function AtomicTechOrbits() {
  const textures = useMemo(() => {
    return {
      react: createTechIconTexture("react"),
      python: createTechIconTexture("python"),
      java: createTechIconTexture("java"),
      database: createTechIconTexture("database"),
      cloud: createTechIconTexture("cloud"),
      ai: createTechIconTexture("ai"),
    };
  }, []);

  return (
    <group position={[0, 0.05, 0]}>
      {ORBITS.map((orbit, index) => (
        <SingleAtomicOrbit key={index} config={orbit} textures={textures} />
      ))}
    </group>
  );
}

/**
 * Hyper-Realistic 3D Prime Step Architectural Monument
 *
 * Exact Brand Vector Colors (matching public/brand/logo-mark.svg):
 * - Roof Canopy: Architectural Graphite Black (#1B1B1B) with physical clearcoat
 * - Vertical Pillar: Official Prime Step Teal (#1F9D9A) with satin metallic depth
 * - Eaves Flap: Vibrant Cyan (#1E9C99) with light transmission
 * - Optical Inner Core: Refractive crystal glass revealed on scroll
 * - Atomic Tech Orbits: Floating technology icons orbiting the nucleus
 *
 * Silky-Smooth Organic Perspective Follow:
 * - Damped, spring-weighted tilt and camera parallax that gently tracks cursor movement.
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

  // Premium diamond-cut chamfer extrusions
  const ribbonExtrude = useMemo(
    () => ({
      depth: 0.72,
      bevelEnabled: true,
      bevelThickness: 0.048,
      bevelSize: 0.036,
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

    // Organic weighted damping for buttery, gentle mouse response
    globalMouse.x = THREE.MathUtils.damp(globalMouse.x, globalMouse.targetX, 2.8, dt);
    globalMouse.y = THREE.MathUtils.damp(globalMouse.y, globalMouse.targetY, 2.8, dt);

    const mx = globalMouse.x;
    const my = globalMouse.y;
    const p = sceneState.progress;
    const t = state.clock.elapsedTime;

    // Subtle breathing float when idle
    const idleFloat = Math.sin(t * 1.3) * 0.035;
    const idleRot = Math.sin(t * 0.5) * 0.02;

    // GENTLE PERSPECTIVE TILT:
    // When the cursor moves, the logo gently rotates to follow the user's line of sight
    const targetRotY = 0.05 + mx * 0.38 + idleRot + p * 0.85;
    const targetRotX = -0.03 - my * 0.28 + p * 0.15;
    const targetRotZ = -mx * 0.035;

    // Subtle lateral and vertical translation
    const targetPosX = mx * 0.18;
    const targetPosY = 0.08 + my * 0.12 + idleFloat - p * 0.18;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 3.0, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX, 3.0, dt);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, targetRotZ, 3.0, dt);
    g.position.x = THREE.MathUtils.damp(g.position.x, targetPosX, 3.0, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetPosY, 3.0, dt);

    // Dynamic specular key light softly sweeping chamfer highlights with cursor
    if (dynamicLightRef.current) {
      dynamicLightRef.current.position.x = 5 + mx * 4;
      dynamicLightRef.current.position.y = 8 + my * 3;
    }

    // Camera perspective tracking for spatial parallax
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, mx * 0.35, 2.4, dt);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, my * 0.25, 2.4, dt);
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
        position={[5, 8, 7]}
        intensity={2.8}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      <group ref={groupRef} position={[0, 0.08, 0]}>
        {/* ========================================================
            PART 01: LOGO BLACK CANOPY ARCH (Exact Vector Black #1B1B1B)
            ======================================================== */}
        <group ref={canopyRef} position={[0, 0, 0.04]}>
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[ribbonShape, ribbonExtrude]} />
            <meshPhysicalMaterial
              color="#1B1B1B"
              roughness={0.12}
              metalness={0.15}
              clearcoat={1.0}
              clearcoatRoughness={0.04}
              reflectivity={0.95}
              envMapIntensity={1.4}
            />
          </mesh>
        </group>

        {/* ========================================================
            PART 02: LOGO VERTICAL PILLAR (Exact Vector Teal #1F9D9A)
            ======================================================== */}
        <group ref={pillarRef} position={[0, 0, -0.02]}>
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[pillarShape, pillarExtrude]} />
            <meshPhysicalMaterial
              color="#1F9D9A"
              emissive="#0C5C5A"
              emissiveIntensity={0.25}
              roughness={0.14}
              metalness={0.45}
              clearcoat={0.95}
              clearcoatRoughness={0.04}
              reflectivity={0.96}
              envMapIntensity={1.5}
            />
          </mesh>
        </group>

        {/* ========================================================
            PART 03: LOGO FRONT EAVES FLAP (Exact Vector Cyan #1E9C99)
            ======================================================== */}
        <group ref={flapRef} position={[0, 0, 0.08]}>
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[flapShape, flapExtrude]} />
            <meshPhysicalMaterial
              color="#1E9C99"
              emissive="#127875"
              emissiveIntensity={0.45}
              roughness={0.08}
              metalness={0.15}
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
              color="#E8FBFB"
              emissive="#1F9D9A"
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

        {/* ========================================================
            PART 05: ATOMIC TECH ORBITS ("Electrons" Orbiting Nucleus)
            ======================================================== */}
        <AtomicTechOrbits />

        {/* SOFT STUDIO GROUND CONTACT SHADOW */}
        <group position={[0, -2.0, 0]}>
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.38}
            scale={7.2}
            blur={2.8}
            far={4.2}
            color="#051515"
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
        <hemisphereLight args={["#FFFFFF", "#0C5C5A", 0.65]} />

        {/* Cool Cyan Rim Light — accentuating the architectural silhouette */}
        <directionalLight position={[-8, 4, 3]} intensity={2.2} color="#1E9C99" />

        {/* Soft Uplight bounce */}
        <directionalLight position={[0, -5, -2]} intensity={0.45} color="#F4F8F8" />

        {/* Float subtly in studio atmosphere */}
        <Float speed={1.3} rotationIntensity={0.06} floatIntensity={0.1}>
          <OfficialLogoMonument />
        </Float>
      </Suspense>
    </Canvas>
  );
}
