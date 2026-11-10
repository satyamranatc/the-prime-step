"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/lib/scroll";

// Center of official mark in original vector coordinates
const CX = 396.5;
const CY = 788.5;
// Architectural scale calibrated for bold heroic presence
const SCALE = 0.0063;

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

// Global window mouse coordinates normalized from -1 to +1 + raw screen coordinates for proximity lightning
const globalMouse = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  clientX: -9999,
  clientY: -9999,
  hasMoved: false,
};

if (typeof window !== "undefined") {
  window.addEventListener(
    "mousemove",
    (e) => {
      globalMouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1; // standard Cartesian Y
      globalMouse.clientX = e.clientX;
      globalMouse.clientY = e.clientY;
      globalMouse.hasMoved = true;
    },
    { passive: true }
  );

  window.addEventListener(
    "pointerleave",
    () => {
      globalMouse.hasMoved = false;
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

// Technology metadata matching the requested official tech logos
interface TechMeta {
  id: "python" | "java" | "react" | "tensorflow" | "aws";
  name: string;
  url: string;
  accent: string;
  multiplier: number;
}

const TECH_ITEMS: Record<string, TechMeta> = {
  python: {
    id: "python",
    name: "Python",
    url: "/tech/python.png",
    accent: "#387EB8",
    multiplier: 1.35,
  },
  java: {
    id: "java",
    name: "Java",
    url: "/tech/java.png",
    accent: "#E76F00",
    multiplier: 1.6,
  },
  react: {
    id: "react",
    name: "React",
    url: "/tech/react.png",
    accent: "#00D8FF",
    multiplier: 1.35,
  },
  tensorflow: {
    id: "tensorflow",
    name: "TensorFlow",
    url: "/tech/tensorflow.png",
    accent: "#FF6F00",
    multiplier: 1.35,
  },
  aws: {
    id: "aws",
    name: "AWS",
    url: "/tech/aws.png",
    accent: "#FF9900",
    multiplier: 1.45,
  },
};

// Generate high-resolution, vector-crisp 2D canvas textures for orbiting technology icons
function createTechCanvasTexture(meta: TechMeta): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.43;

  const renderDisc = (img?: HTMLImageElement) => {
    ctx.clearRect(0, 0, size, size);

    // 1. Soft ambient outer glow
    ctx.save();
    ctx.shadowColor = "rgba(15, 82, 80, 0.24)";
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 10;

    // 2. Pure porcelain ceramic disc face with subtle radial gradient
    const grad = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, r * 0.1, cx, cy, r);
    grad.addColorStop(0, "#FFFFFF");
    grad.addColorStop(0.85, "#F9FEFE");
    grad.addColorStop(1, "#EDF8F7");

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // 3. Crisp colored accent rim
    ctx.beginPath();
    ctx.arc(cx, cy, r - 4, 0, Math.PI * 2);
    ctx.lineWidth = 10;
    ctx.strokeStyle = meta.accent;
    ctx.stroke();

    // 4. Subtle inner highlight ring
    ctx.beginPath();
    ctx.arc(cx, cy, r - 14, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(20, 122, 119, 0.12)";
    ctx.stroke();

    // 5. Draw official tech logo centered with generous padding
    if (img && img.complete && img.naturalWidth > 0) {
      const maxDim = r * 1.15;
      const scale = Math.min(maxDim / img.naturalWidth, maxDim / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
    }
  };

  renderDisc();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = meta.url;
  img.onload = () => {
    renderDisc(img);
    texture.needsUpdate = true;
  };

  return texture;
}

interface OrbitItem {
  tech: TechMeta;
  offset: number;
}

interface OrbitConfig {
  radiusX: number;
  radiusY: number;
  rotation: [number, number, number];
  speed: number;
  icons: OrbitItem[];
}

const ORBITS: OrbitConfig[] = [
  // Orbit 1: Outer Perimeter Loop with React & AWS (clears monument silhouette completely)
  {
    radiusX: 2.44,
    radiusY: 2.26,
    rotation: [Math.PI * 0.11, Math.PI * 0.12, Math.PI * 0.18],
    speed: 0.52,
    icons: [
      { tech: TECH_ITEMS.react, offset: 0.35 },
      { tech: TECH_ITEMS.aws, offset: 0.35 + Math.PI },
    ],
  },
  // Orbit 2: Counter-Tilted Outer Loop with Python & TensorFlow
  {
    radiusX: 2.56,
    radiusY: 2.36,
    rotation: [-Math.PI * 0.12, -Math.PI * 0.11, -Math.PI * 0.2],
    speed: 0.44,
    icons: [
      { tech: TECH_ITEMS.python, offset: 1.45 },
      { tech: TECH_ITEMS.tensorflow, offset: 1.45 + Math.PI },
    ],
  },
  // Orbit 3: Equatorial Halo Loop with Java (never intersects central teal pillar)
  {
    radiusX: 2.36,
    radiusY: 2.22,
    rotation: [Math.PI * 0.09, -Math.PI * 0.12, Math.PI * 0.05],
    speed: 0.58,
    icons: [
      { tech: TECH_ITEMS.java, offset: 2.65 },
    ],
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
  const ringRef = useRef<THREE.Mesh>(null);
  const iconRefs = useRef<(THREE.Group | null)[]>([]);
  const trailRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = sceneState.progress;
    // Controlled expansion on scroll so orbits never touch canvas edges
    const expansion = 1 + p * 0.08;
    const rx = config.radiusX * expansion;
    const ry = config.radiusY * expansion;

    if (ringRef.current) {
      ringRef.current.scale.set(expansion, expansion * (config.radiusY / config.radiusX), 1);
    }

    config.icons.forEach((item, idx) => {
      const node = iconRefs.current[idx];
      if (node) {
        const angle = t * config.speed + item.offset;
        node.position.set(
          Math.cos(angle) * rx,
          Math.sin(angle) * ry,
          0
        );
      }
      const trail = trailRefs.current[idx];
      if (trail) {
        const trailAngle = t * config.speed + item.offset - 0.18;
        trail.position.set(
          Math.cos(trailAngle) * rx,
          Math.sin(trailAngle) * ry,
          0
        );
      }
    });

    // Gentle gyroscopic precession
    if (groupRef.current) {
      groupRef.current.rotation.z = config.rotation[2] + Math.sin(t * 0.35) * 0.035;
    }
  });

  return (
    <group ref={groupRef} rotation={config.rotation}>
      {/* 1. True 3D Tubular Orbital Track Ring (never vanishes edge-on) */}
      <mesh ref={ringRef} renderOrder={1}>
        <torusGeometry args={[config.radiusX, 0.011, 16, 140]} />
        <meshPhysicalMaterial
          color="#1E9C99"
          emissive="#147A77"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.3}
          transparent
          opacity={0.38}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Subtle Trailing Photon Nodes */}
      {config.icons.map((item, idx) => (
        <mesh
          key={`trail-${item.tech.id}`}
          ref={(el) => {
            trailRefs.current[idx] = el;
          }}
          renderOrder={2}
        >
          <sphereGeometry args={[0.034, 12, 12]} />
          <meshBasicMaterial color={item.tech.accent} transparent opacity={0.7} />
        </mesh>
      ))}

      {/* 3. Upright Camera-Facing Billboard Tech Medallions (offset toward camera so ring never cuts across face) */}
      {config.icons.map((item, idx) => (
        <group
          key={item.tech.id}
          ref={(el) => {
            iconRefs.current[idx] = el;
          }}
        >
          <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
            {/* Soft Backplate Halo */}
            <mesh position={[0, 0, 0.14]} renderOrder={4}>
              <circleGeometry args={[0.27, 48]} />
              <meshBasicMaterial
                color={item.tech.accent}
                transparent
                opacity={0.18}
                depthWrite={false}
              />
            </mesh>

            {/* High-DPI Upright Medallion Face */}
            <mesh position={[0, 0, 0.16]} renderOrder={5}>
              <circleGeometry args={[0.245, 48]} />
              <meshBasicMaterial
                map={textures[item.tech.id]}
                transparent
                toneMapped={false}
              />
            </mesh>
          </Billboard>
        </group>
      ))}
    </group>
  );
}

function AtomicTechOrbits() {
  const textures = useMemo(() => {
    return {
      python: createTechCanvasTexture(TECH_ITEMS.python),
      java: createTechCanvasTexture(TECH_ITEMS.java),
      react: createTechCanvasTexture(TECH_ITEMS.react),
      tensorflow: createTechCanvasTexture(TECH_ITEMS.tensorflow),
      aws: createTechCanvasTexture(TECH_ITEMS.aws),
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
 * Ultra-High-Performance Proximity Electric Arc & Spark Discharge
 *
 * Designed for High-Contrast Visibility on Light/White Backgrounds:
 * - Uses Normal Blending so rich TPS Teal (#008080) and Deep Obsidian Teal (#003838)
 *   never wash out against the white background.
 * - Tri-layer braided plasma bolt:
 *   1. Deep Obsidian Teal (#003838) edge/halo for maximum visual contrast on white
 *   2. Official TPS Brand Teal (#008080) main electric arc
 *   3. Vivid Electric Cyan (#00E5D0) high-voltage inner core
 *   4. Branching arcs in saturated teal (#0C8E8B)
 *   5. Concentric multi-tier spark points (#003838 + #008080 + #00FFE0) locked to cursor
 * - Computed in WORLD space: 100% exact alignment directly under the mouse cursor.
 * - ZERO runtime memory allocation: pre-allocated static Float32Array buffers.
 * - Dynamic sleep: 100% idle when cursor is outside proximity radius or offscreen (0 draw calls).
 */
const BOLT_SEGMENTS = 16;
const BRANCH_SEGMENTS = 7;
const BOLT_FLOATS = BOLT_SEGMENTS * 6; // 96
const BRANCH_FLOATS = BRANCH_SEGMENTS * 2 * 6; // 84
const SPARK_COUNT = 12;

// Monument emission anchor points in monument local coordinates
const LOCAL_ANCHORS = [
  new THREE.Vector3(-0.15, 0.72, 0.1),  // Canopy top edge
  new THREE.Vector3(0.35, 0.42, 0.05),  // Right shoulder
  new THREE.Vector3(-0.62, 0.85, 0.15), // Flap corner
  new THREE.Vector3(-0.32, -0.45, 0.1), // Central pillar flank
  new THREE.Vector3(-0.18, -1.35, 0.05) // Lower pillar tip
];

function ProximityLightning({
  monumentRef,
}: {
  monumentRef: React.RefObject<THREE.Group | null>;
}) {
  const haloLineRef = useRef<THREE.LineSegments>(null);
  const mainLineRef = useRef<THREE.LineSegments>(null);
  const coreLineRef = useRef<THREE.LineSegments>(null);
  const branchLineRef = useRef<THREE.LineSegments>(null);

  const outerSparksRef = useRef<THREE.Points>(null);
  const midSparksRef = useRef<THREE.Points>(null);
  const innerSparksRef = useRef<THREE.Points>(null);

  const lightRef = useRef<THREE.PointLight>(null);

  // Pre-allocated typed arrays (0 GC garbage during animation)
  const haloPositions = useMemo(() => new Float32Array(BOLT_FLOATS), []);
  const mainPositions = useMemo(() => new Float32Array(BOLT_FLOATS), []);
  const corePositions = useMemo(() => new Float32Array(BOLT_FLOATS), []);
  const branchPositions = useMemo(() => new Float32Array(BRANCH_FLOATS), []);

  const outerSparkPositions = useMemo(() => new Float32Array(SPARK_COUNT * 3), []);
  const midSparkPositions = useMemo(() => new Float32Array(SPARK_COUNT * 3), []);
  const innerSparkPositions = useMemo(() => new Float32Array(SPARK_COUNT * 3), []);

  // Pre-allocated reusable vectors and point buffer for bolt vertices
  const sourceVec = useMemo(() => new THREE.Vector3(), []);
  const targetVec = useMemo(() => new THREE.Vector3(), []);
  const dirVec = useMemo(() => new THREE.Vector3(), []);
  const perpVec = useMemo(() => new THREE.Vector3(), []);
  const logoCenterWorld = useMemo(() => new THREE.Vector3(), []);
  const unprojectVec = useMemo(() => new THREE.Vector3(), []);

  const boltPts = useMemo(
    () => Array.from({ length: BOLT_SEGMENTS + 1 }, () => new THREE.Vector3()),
    []
  );

  useFrame((state) => {
    const group = monumentRef.current;
    const haloLine = haloLineRef.current;
    const mainLine = mainLineRef.current;
    const coreLine = coreLineRef.current;
    const branchLine = branchLineRef.current;

    const outerSparks = outerSparksRef.current;
    const midSparks = midSparksRef.current;
    const innerSparks = innerSparksRef.current;

    const light = lightRef.current;

    if (
      !group ||
      !haloLine ||
      !mainLine ||
      !coreLine ||
      !branchLine ||
      !outerSparks ||
      !midSparks ||
      !innerSparks ||
      !light
    ) {
      return;
    }

    const setVisibility = (visible: boolean) => {
      haloLine.visible = visible;
      mainLine.visible = visible;
      coreLine.visible = visible;
      branchLine.visible = visible;
      outerSparks.visible = visible;
      midSparks.visible = visible;
      innerSparks.visible = visible;
      if (!visible) light.intensity = 0;
    };

    // Check if cursor is active and on screen
    if (!globalMouse.hasMoved) {
      if (haloLine.visible) setVisibility(false);
      return;
    }

    // 1. Calculate cursor world position at depth z = 0.25 (flush with logo face)
    unprojectVec.set(state.pointer.x, state.pointer.y, 0.5);
    unprojectVec.unproject(state.camera);
    dirVec.subVectors(unprojectVec, state.camera.position).normalize();
    const planeDistance = (0.25 - state.camera.position.z) / dirVec.z;
    targetVec.copy(state.camera.position).addScaledVector(dirVec, planeDistance);

    // 2. Logo center in world space
    logoCenterWorld.set(0, 0.08, 0).applyMatrix4(group.matrixWorld);
    const dist = logoCenterWorld.distanceTo(targetVec);

    // 3. Proximity check (activates when cursor is within 4.8 world units)
    const activationRadius = 4.8;
    if (dist > activationRadius) {
      if (haloLine.visible) setVisibility(false);
      return;
    }

    // Proximity curve (smooth ease-in as cursor nears the logo)
    const proximity = Math.pow(Math.max(0, 1 - dist / activationRadius), 1.15);

    // Dynamic electrical crackle (keeps it persistently bright while vibrating)
    const crackle = Math.random() > 0.08 ? 0.82 + Math.random() * 0.18 : 0.45;
    const power = proximity * crackle;

    if (power < 0.04) {
      if (haloLine.visible) setVisibility(false);
      return;
    }

    setVisibility(true);

    // 4. Find the closest emission anchor on the 3D logo in WORLD space
    let bestDistSq = Infinity;
    for (let i = 0; i < LOCAL_ANCHORS.length; i++) {
      unprojectVec.copy(LOCAL_ANCHORS[i]).applyMatrix4(group.matrixWorld);
      const dsq = unprojectVec.distanceToSquared(targetVec);
      if (dsq < bestDistSq) {
        bestDistSq = dsq;
        sourceVec.copy(unprojectVec);
      }
    }

    // Direction and perpendicular vector from source to target
    dirVec.subVectors(targetVec, sourceVec);
    const boltLength = dirVec.length();
    if (boltLength < 0.08) return;

    dirVec.normalize();
    perpVec.set(-dirVec.y, dirVec.x, 0).normalize();

    // 5. Generate Primary Jagged Arc Vertices (pin endpoints, max jitter in middle)
    boltPts[0].copy(sourceVec);
    boltPts[BOLT_SEGMENTS].copy(targetVec);

    const jitterScale = Math.min(0.65, boltLength * 0.24) * (0.6 + power * 0.4);

    for (let i = 1; i < BOLT_SEGMENTS; i++) {
      const frac = i / BOLT_SEGMENTS;
      const env = Math.sin(frac * Math.PI); // Envelope: 0 at ends, 1 in middle
      const jMag = (Math.random() - 0.5) * jitterScale * env;
      const zMag = (Math.random() - 0.5) * jitterScale * 0.35 * env;

      boltPts[i].set(
        sourceVec.x + (targetVec.x - sourceVec.x) * frac + perpVec.x * jMag,
        sourceVec.y + (targetVec.y - sourceVec.y) * frac + perpVec.y * jMag,
        sourceVec.z + (targetVec.z - sourceVec.z) * frac + zMag
      );
    }

    // 6. Fill Main Bolt, Dark Contrast Halo, and Inner Cyan Filament
    for (let i = 0; i < BOLT_SEGMENTS; i++) {
      const p1 = boltPts[i];
      const p2 = boltPts[i + 1];
      const idx = i * 6;

      // Main Brand Teal Arc
      mainPositions[idx] = p1.x;
      mainPositions[idx + 1] = p1.y;
      mainPositions[idx + 2] = p1.z;
      mainPositions[idx + 3] = p2.x;
      mainPositions[idx + 4] = p2.y;
      mainPositions[idx + 5] = p2.z;

      // Dark Obsidian Teal Shadow / Contrast Edge (offset for visible width on white)
      const haloOffset = (i % 2 === 0 ? 0.024 : -0.024);
      haloPositions[idx] = p1.x + perpVec.x * haloOffset;
      haloPositions[idx + 1] = p1.y + perpVec.y * haloOffset;
      haloPositions[idx + 2] = p1.z - 0.005;
      haloPositions[idx + 3] = p2.x + perpVec.x * haloOffset;
      haloPositions[idx + 4] = p2.y + perpVec.y * haloOffset;
      haloPositions[idx + 5] = p2.z - 0.005;

      // Vivid Electric Cyan Core Filament (micro jitter)
      const coreOffset = (Math.random() - 0.5) * 0.012;
      corePositions[idx] = p1.x + perpVec.x * coreOffset;
      corePositions[idx + 1] = p1.y + perpVec.y * coreOffset;
      corePositions[idx + 2] = p1.z + 0.008;
      corePositions[idx + 3] = p2.x + perpVec.x * coreOffset;
      corePositions[idx + 4] = p2.y + perpVec.y * coreOffset;
      corePositions[idx + 5] = p2.z + 0.008;
    }

    // 7. Generate Branching Sub-Arcs (Branch 1 from 35% mark, Branch 2 from 65% mark)
    let bOffset = 0;

    // Branch 1
    const b1Start = boltPts[Math.floor(BOLT_SEGMENTS * 0.35)];
    let curB1X = b1Start.x;
    let curB1Y = b1Start.y;
    let curB1Z = b1Start.z;
    const b1DirX = (dirVec.x + perpVec.x * 0.9) * 0.6;
    const b1DirY = (dirVec.y + perpVec.y * 0.9) * 0.6;

    for (let i = 1; i <= BRANCH_SEGMENTS; i++) {
      const stepDist = (boltLength * 0.32) / BRANCH_SEGMENTS;
      const jMag = (Math.random() - 0.5) * jitterScale * 0.6;

      const nextX = curB1X + b1DirX * stepDist + perpVec.x * jMag;
      const nextY = curB1Y + b1DirY * stepDist + perpVec.y * jMag;
      const nextZ = curB1Z + (Math.random() - 0.5) * 0.08;

      branchPositions[bOffset] = curB1X;
      branchPositions[bOffset + 1] = curB1Y;
      branchPositions[bOffset + 2] = curB1Z;
      branchPositions[bOffset + 3] = nextX;
      branchPositions[bOffset + 4] = nextY;
      branchPositions[bOffset + 5] = nextZ;

      bOffset += 6;
      curB1X = nextX;
      curB1Y = nextY;
      curB1Z = nextZ;
    }

    // Branch 2
    const b2Start = boltPts[Math.floor(BOLT_SEGMENTS * 0.65)];
    let curB2X = b2Start.x;
    let curB2Y = b2Start.y;
    let curB2Z = b2Start.z;
    const b2DirX = (dirVec.x - perpVec.x * 0.95) * 0.55;
    const b2DirY = (dirVec.y - perpVec.y * 0.95) * 0.55;

    for (let i = 1; i <= BRANCH_SEGMENTS; i++) {
      const stepDist = (boltLength * 0.28) / BRANCH_SEGMENTS;
      const jMag = (Math.random() - 0.5) * jitterScale * 0.6;

      const nextX = curB2X + b2DirX * stepDist - perpVec.x * jMag;
      const nextY = curB2Y + b2DirY * stepDist - perpVec.y * jMag;
      const nextZ = curB2Z + (Math.random() - 0.5) * 0.08;

      branchPositions[bOffset] = curB2X;
      branchPositions[bOffset + 1] = curB2Y;
      branchPositions[bOffset + 2] = curB2Z;
      branchPositions[bOffset + 3] = nextX;
      branchPositions[bOffset + 4] = nextY;
      branchPositions[bOffset + 5] = nextZ;

      bOffset += 6;
      curB2X = nextX;
      curB2Y = nextY;
      curB2Z = nextZ;
    }

    // 8. Contact Sparks Buzzing Around Cursor
    for (let i = 0; i < SPARK_COUNT; i++) {
      const angle = (i / SPARK_COUNT) * Math.PI * 2 + Math.random() * 0.5;
      const r = 0.06 + Math.random() * 0.28 * power;
      const sx = targetVec.x + Math.cos(angle) * r;
      const sy = targetVec.y + Math.sin(angle) * r;
      const sz = targetVec.z + (Math.random() - 0.5) * 0.12;

      const idx = i * 3;
      outerSparkPositions[idx] = sx;
      outerSparkPositions[idx + 1] = sy;
      outerSparkPositions[idx + 2] = sz;

      midSparkPositions[idx] = sx;
      midSparkPositions[idx + 1] = sy;
      midSparkPositions[idx + 2] = sz;

      innerSparkPositions[idx] = sx;
      innerSparkPositions[idx + 1] = sy;
      innerSparkPositions[idx + 2] = sz;
    }

    // 9. Update GPU Buffers
    haloLine.geometry.attributes.position.needsUpdate = true;
    mainLine.geometry.attributes.position.needsUpdate = true;
    coreLine.geometry.attributes.position.needsUpdate = true;
    branchLine.geometry.attributes.position.needsUpdate = true;

    outerSparks.geometry.attributes.position.needsUpdate = true;
    midSparks.geometry.attributes.position.needsUpdate = true;
    innerSparks.geometry.attributes.position.needsUpdate = true;

    // 10. High-Visibility Opacities (Normal Blending with rich saturation)
    (haloLine.material as THREE.LineBasicMaterial).opacity = Math.min(0.92, 0.5 + power * 0.45);
    (mainLine.material as THREE.LineBasicMaterial).opacity = Math.min(1.0, 0.65 + power * 0.35);
    (coreLine.material as THREE.LineBasicMaterial).opacity = Math.min(0.95, 0.55 + power * 0.4);
    (branchLine.material as THREE.LineBasicMaterial).opacity = Math.min(0.88, 0.4 + power * 0.48);

    (outerSparks.material as THREE.PointsMaterial).opacity = Math.min(0.9, power * 1.1);
    (midSparks.material as THREE.PointsMaterial).opacity = Math.min(1.0, power * 1.2);
    (innerSparks.material as THREE.PointsMaterial).opacity = Math.min(1.0, power * 1.25);

    // 11. Point Light illuminating monument chamfers
    light.position.set(
      targetVec.x * 0.7 + sourceVec.x * 0.3,
      targetVec.y * 0.7 + sourceVec.y * 0.3,
      0.8
    );
    light.intensity = power * 7.5;
  });

  return (
    <group>
      {/* Specular Electric Point Light */}
      <pointLight ref={lightRef} color="#00FFE0" distance={7.0} decay={2.0} intensity={0} />

      {/* Layer 1: Deep Obsidian Teal (#003838) Shadow / Contrast Outline */}
      <lineSegments ref={haloLineRef} renderOrder={40}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[haloPositions, 3]}
            count={BOLT_FLOATS / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#003838"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
          linewidth={3}
        />
      </lineSegments>

      {/* Layer 2: Official TPS Brand Teal (#008080) Main Saturated Plasma Arc */}
      <lineSegments ref={mainLineRef} renderOrder={41}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[mainPositions, 3]}
            count={BOLT_FLOATS / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#008080"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
          linewidth={2}
        />
      </lineSegments>

      {/* Layer 3: Vivid Electric Cyan (#00E5D0) High-Voltage Inner Core */}
      <lineSegments ref={coreLineRef} renderOrder={42}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[corePositions, 3]}
            count={BOLT_FLOATS / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00E5D0"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
          linewidth={1}
        />
      </lineSegments>

      {/* Layer 4: Branching Arcs in Saturated Vibrant Teal (#0C8E8B) */}
      <lineSegments ref={branchLineRef} renderOrder={43}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[branchPositions, 3]}
            count={BRANCH_FLOATS / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0C8E8B"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
          linewidth={2}
        />
      </lineSegments>

      {/* Layer 5: High-Contrast Multi-Tier Sparks Around Cursor */}
      {/* Outer Contrast Teal Rim */}
      <points ref={outerSparksRef} renderOrder={44}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[outerSparkPositions, 3]}
            count={SPARK_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#003838"
          size={0.24}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
          sizeAttenuation
        />
      </points>

      {/* Mid Brand Teal Spark Disc */}
      <points ref={midSparksRef} renderOrder={45}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[midSparkPositions, 3]}
            count={SPARK_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#008080"
          size={0.16}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
          sizeAttenuation
        />
      </points>

      {/* Inner Electric Cyan Spark Core */}
      <points ref={innerSparksRef} renderOrder={46}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[innerSparkPositions, 3]}
            count={SPARK_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00FFE0"
          size={0.08}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
          sizeAttenuation
        />
      </points>
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
function OfficialLogoMonument({
  monumentRef,
}: {
  monumentRef?: React.RefObject<THREE.Group | null>;
}) {
  const innerGroupRef = useRef<THREE.Group>(null);
  const groupRef = monumentRef || innerGroupRef;
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

    // Responsive viewport fit scale so monument + orbits never clip on narrow or square viewports
    const minViewportDim = Math.min(state.viewport.width, state.viewport.height);
    const fitScale = Math.min(1, Math.max(0.72, minViewportDim / 6.3));
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, fitScale, 4.0, dt));

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

    // SCROLL-ACTIVATED ARCHITECTURAL EXPLODED DECONSTRUCTION (centered around z = 0)
    const explode = Math.pow(Math.min(1, Math.max(0, p * 2.0)), 1.2);

    if (canopyRef.current) {
      canopyRef.current.position.x = THREE.MathUtils.damp(canopyRef.current.position.x, explode * 0.45, 4.0, dt);
      canopyRef.current.position.y = THREE.MathUtils.damp(canopyRef.current.position.y, explode * 0.95, 4.0, dt);
      canopyRef.current.position.z = THREE.MathUtils.damp(canopyRef.current.position.z, -0.32 + explode * 0.65, 4.0, dt);
      canopyRef.current.rotation.x = THREE.MathUtils.damp(canopyRef.current.rotation.x, explode * 0.15, 4.0, dt);
    }

    if (flapRef.current) {
      flapRef.current.position.x = THREE.MathUtils.damp(flapRef.current.position.x, -explode * 0.7, 4.0, dt);
      flapRef.current.position.y = THREE.MathUtils.damp(flapRef.current.position.y, explode * 0.4, 4.0, dt);
      flapRef.current.position.z = THREE.MathUtils.damp(flapRef.current.position.z, -0.26 + explode * 0.85, 4.0, dt);
    }

    if (pillarRef.current) {
      pillarRef.current.position.x = THREE.MathUtils.damp(pillarRef.current.position.x, -explode * 0.4, 4.0, dt);
      pillarRef.current.position.y = THREE.MathUtils.damp(pillarRef.current.position.y, -explode * 0.8, 4.0, dt);
      pillarRef.current.position.z = THREE.MathUtils.damp(pillarRef.current.position.z, -0.36 - explode * 0.3, 4.0, dt);
      pillarRef.current.rotation.y = THREE.MathUtils.damp(pillarRef.current.rotation.y, explode * 0.14, 4.0, dt);
    }

    if (coreRef.current) {
      const coreScale = 0.85 + explode * 0.28;
      coreRef.current.scale.setScalar(THREE.MathUtils.damp(coreRef.current.scale.x, coreScale, 4.0, dt));
      coreRef.current.position.z = THREE.MathUtils.damp(coreRef.current.position.z, -0.22 + explode * 0.22, 4.0, dt);
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
        <group ref={canopyRef} position={[0, 0, -0.32]}>
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
        <group ref={pillarRef} position={[0, 0, -0.36]}>
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
        <group ref={flapRef} position={[0, 0, -0.26]}>
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
        <group ref={coreRef} position={[-0.1, 0.25, -0.22]}>
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
        <group position={[0, -2.28, 0]}>
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.38}
            scale={7.8}
            blur={2.8}
            far={4.5}
            color="#051515"
          />
        </group>
      </group>
    </>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  const monumentRef = useRef<THREE.Group>(null);

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 10.6], fov: 38 }}
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
          <OfficialLogoMonument monumentRef={monumentRef} />
        </Float>

        {/* High-Contrast Proximity Lightning Arc (renders in true TPS Teal & Cyan on white) */}
        <ProximityLightning monumentRef={monumentRef} />
      </Suspense>
    </Canvas>
  );
}
