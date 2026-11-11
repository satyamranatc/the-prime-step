"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/lib/scroll";

// Center of official mark in original vector coordinates
const CX = 396.5;
const CY = 788.5;
// Architectural scale calibrated for clean, balanced heroic presence
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
  clientX: -9999,
  clientY: -9999,
  hasMoved: false,
};

if (typeof window !== "undefined") {
  const onMove = (e: MouseEvent) => {
    globalMouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    globalMouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    globalMouse.clientX = e.clientX;
    globalMouse.clientY = e.clientY;
    globalMouse.hasMoved = true;
  };

  const onLeave = () => {
    globalMouse.hasMoved = false;
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  document.addEventListener("mouseleave", onLeave, { passive: true });
  window.addEventListener("blur", onLeave, { passive: true });
  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget && !(e as unknown as { toElement?: Element }).toElement) {
      globalMouse.hasMoved = false;
    }
  }, { passive: true });

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

// Technology metadata matching official tech logos
interface TechMeta {
  id: "python" | "java" | "react" | "tensorflow" | "aws";
  name: string;
  url: string;
  accent: string;
}

const TECH_ITEMS: Record<string, TechMeta> = {
  python: {
    id: "python",
    name: "Python",
    url: "/tech/python.png",
    accent: "#387EB8",
  },
  java: {
    id: "java",
    name: "Java",
    url: "/tech/java.png",
    accent: "#E76F00",
  },
  react: {
    id: "react",
    name: "React",
    url: "/tech/react.png",
    accent: "#00D8FF",
  },
  tensorflow: {
    id: "tensorflow",
    name: "TensorFlow",
    url: "/tech/tensorflow.png",
    accent: "#FF6F00",
  },
  aws: {
    id: "aws",
    name: "AWS",
    url: "/tech/aws.png",
    accent: "#FF9900",
  },
};

/**
 * Generate uniform, vector-crisp 2D canvas textures for orbiting technology medallions.
 * Enforces uniform circular dimensions, balanced padding, and consistent border aesthetics.
 */
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
  const r = size * 0.42;

  const renderDisc = (img?: HTMLImageElement) => {
    ctx.clearRect(0, 0, size, size);

    // 1. Soft ambient outer shadow for depth
    ctx.save();
    ctx.shadowColor = "rgba(10, 60, 58, 0.26)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;

    // 2. Uniform porcelain ceramic face
    const grad = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, r * 0.1, cx, cy, r);
    grad.addColorStop(0, "#FFFFFF");
    grad.addColorStop(0.82, "#F8FCFC");
    grad.addColorStop(1, "#EDF7F6");

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // 3. Crisp uniform colored accent rim
    ctx.beginPath();
    ctx.arc(cx, cy, r - 3, 0, Math.PI * 2);
    ctx.lineWidth = 8;
    ctx.strokeStyle = meta.accent;
    ctx.stroke();

    // 4. Subtle inner highlight ring
    ctx.beginPath();
    ctx.arc(cx, cy, r - 12, 0, Math.PI * 2);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(20, 122, 119, 0.14)";
    ctx.stroke();

    // 5. Draw tech logo centered with consistent uniform padding
    if (img && img.complete && img.naturalWidth > 0) {
      const maxDim = r * 1.16;
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
  // Orbit 1: Outer Loop with React & AWS (180° balanced spacing)
  {
    radiusX: 2.75,
    radiusY: 2.45,
    rotation: [Math.PI * 0.12, Math.PI * 0.14, Math.PI * 0.18],
    speed: 0.45,
    icons: [
      { tech: TECH_ITEMS.react, offset: 0.85 },
      { tech: TECH_ITEMS.aws, offset: 0.85 + Math.PI },
    ],
  },
  // Orbit 2: Counter-Tilted Outer Loop with Python & TensorFlow (180° balanced spacing)
  {
    radiusX: 2.85,
    radiusY: 2.55,
    rotation: [-Math.PI * 0.14, -Math.PI * 0.12, -Math.PI * 0.22],
    speed: 0.40,
    icons: [
      { tech: TECH_ITEMS.python, offset: 1.85 },
      { tech: TECH_ITEMS.tensorflow, offset: 1.85 + Math.PI },
    ],
  },
  // Orbit 3: Equatorial Loop with Java
  {
    radiusX: 2.65,
    radiusY: 2.40,
    rotation: [Math.PI * 0.08, -Math.PI * 0.15, Math.PI * 0.06],
    speed: 0.50,
    icons: [
      { tech: TECH_ITEMS.java, offset: 3.14 },
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
  const connectorRefs = useRef<(THREE.Group | null)[]>([]);
  const trailRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = sceneState.progress;
    const expansion = 1 + p * 0.08;
    const rx = config.radiusX * expansion;
    const ry = config.radiusY * expansion;

    if (ringRef.current) {
      ringRef.current.scale.set(expansion, expansion * (config.radiusY / config.radiusX), 1);
    }

    config.icons.forEach((item, idx) => {
      const angle = t * config.speed + item.offset;
      const posX = Math.cos(angle) * rx;
      const posY = Math.sin(angle) * ry;

      const node = iconRefs.current[idx];
      if (node) {
        node.position.set(posX, posY, 0);
      }

      const conn = connectorRefs.current[idx];
      if (conn) {
        conn.position.set(posX, posY, 0);
      }

      const trail = trailRefs.current[idx];
      if (trail) {
        const trailAngle = angle - 0.18;
        trail.position.set(
          Math.cos(trailAngle) * rx,
          Math.sin(trailAngle) * ry,
          0
        );
      }
    });

    if (groupRef.current) {
      groupRef.current.rotation.z = config.rotation[2] + Math.sin(t * 0.35) * 0.035;
    }
  });

  return (
    <group ref={groupRef} rotation={config.rotation}>
      {/* 1. True 3D Tubular Orbital Track Ring */}
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

      {/* 2. Trailing Photon Node */}
      {config.icons.map((item, idx) => (
        <mesh
          key={`trail-${item.tech.id}`}
          ref={(el) => {
            trailRefs.current[idx] = el;
          }}
          renderOrder={2}
        >
          <sphereGeometry args={[0.032, 12, 12]} />
          <meshBasicMaterial color={item.tech.accent} transparent opacity={0.7} />
        </mesh>
      ))}

      {/* 3. Physical Clasp / Connector Nodes Anchoring Medallions Directly to Orbital Track */}
      {config.icons.map((item, idx) => (
        <group
          key={`connector-${item.tech.id}`}
          ref={(el) => {
            connectorRefs.current[idx] = el;
          }}
        >
          {/* Orbital Track Clasp Ring */}
          <mesh renderOrder={3}>
            <sphereGeometry args={[0.042, 16, 16]} />
            <meshStandardMaterial
              color="#0C8E8B"
              emissive="#00FFE0"
              emissiveIntensity={0.35}
              metalness={0.65}
              roughness={0.22}
            />
          </mesh>

          {/* Micro-Pin Link to Floating Medallion Backplate */}
          <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]} renderOrder={3}>
            <cylinderGeometry args={[0.012, 0.012, 0.14, 8]} />
            <meshStandardMaterial color="#1E9C99" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* 4. Uniform Circular Camera-Facing Medallions */}
      {config.icons.map((item, idx) => (
        <group
          key={item.tech.id}
          ref={(el) => {
            iconRefs.current[idx] = el;
          }}
        >
          <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
            {/* Uniform Circular Outer Glow Halo */}
            <mesh position={[0, 0, 0.14]} renderOrder={4}>
              <circleGeometry args={[0.265, 48]} />
              <meshBasicMaterial
                color={item.tech.accent}
                transparent
                opacity={0.20}
                depthWrite={false}
              />
            </mesh>

            {/* Uniform Circular Medallion Face */}
            <mesh position={[0, 0, 0.16]} renderOrder={5}>
              <circleGeometry args={[0.24, 48]} />
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
    <group position={[0, 0.06, 0]}>
      {ORBITS.map((orbit, index) => (
        <SingleAtomicOrbit key={index} config={orbit} textures={textures} />
      ))}
    </group>
  );
}

/**
 * Natural Cursor-Follower Lightning & Particle Energy System
 *
 * Sequence Architecture:
 * 1. Clearly Defined Starting Point: Emanates from the logo's apex emitter node.
 * 2. Natural Curvature: Follows cursor with organic inertia via cubic Bezier spline
 *    and harmonic electromagnetic ripples, avoiding sharp random zigzags.
 * 3. Cyan Energy Core with Subtle Outer Glow: Multi-layer luminous filament that tapers
 *    gracefully to avoid pixelated or abrupt endings.
 * 4. Particles Along Trail: Energy motes spawn along the motion arc and fade progressively.
 * 5. Smooth Fade Away: Decays naturally with damped intensity when idle or departing.
 */
// Apex emitter origin placed precisely at the summit apex of the logo monument
const LOGO_EMITTER_LOCAL = new THREE.Vector3(-0.23, 2.05, 0.20);

const SPLINE_SEGMENTS = 30;
const RIBBON_FLOATS = SPLINE_SEGMENTS * 6 * 3; // 540 floats

const BRANCH_SEGMENTS = 12;
const BRANCH_FLOATS = BRANCH_SEGMENTS * 6 * 3; // 216 floats

const SPARK_PARTICLE_COUNT = 32;
const SPARK_FLOATS = SPARK_PARTICLE_COUNT * 6 * 3; // 576 floats (billboard quad per spark)

/**
 * High-Visibility, Photorealistic Cursor-Follower Lightning Arc
 *
 * Engineered with:
 * 1. Double-Layer Camera-Facing Dynamic Ribbon Geometry (Core + Plasma Glow)
 *    - Completely bypasses WebGL 1px linewidth limits
 *    - Intense incandescent white core (#FFFFFF) + vibrant electric cyan halo (#00FFE0)
 *    - Additive Blending (THREE.AdditiveBlending) for pure electrical radiance
 * 2. High-Frequency Harmonic Electric Jitter & Micro-Branching Arcs
 * 3. Clearly Defined Summit Apex Emitter on Monument
 * 4. Progressive Flying Spark Embers spraying along the path
 * 5. Smooth, natural fade-to-zero when cursor departs or rests
 */
function NaturalCursorLightning({
  monumentRef,
}: {
  monumentRef: React.RefObject<THREE.Group | null>;
}) {
  const outerGlowMeshRef = useRef<THREE.Mesh>(null);
  const innerCoreMeshRef = useRef<THREE.Mesh>(null);
  const branchMeshRef = useRef<THREE.Mesh>(null);
  const sparkParticlesRef = useRef<THREE.Mesh>(null);
  const emitterGlowRef = useRef<THREE.Mesh>(null);
  const emitterCoreRef = useRef<THREE.Mesh>(null);
  const cursorFlareRef = useRef<THREE.Mesh>(null);
  const cursorCoreRef = useRef<THREE.Mesh>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  // Pre-allocated typed arrays for zero garbage collection at 60fps
  const outerGlowPositions = useMemo(() => new Float32Array(RIBBON_FLOATS), []);
  const innerCorePositions = useMemo(() => new Float32Array(RIBBON_FLOATS), []);
  const branchPositions = useMemo(() => new Float32Array(BRANCH_FLOATS), []);
  const sparkPositions = useMemo(() => new Float32Array(SPARK_FLOATS), []);

  // Reusable vectors for ribbon math
  const originWorld = useMemo(() => new THREE.Vector3(), []);
  const targetCursor = useMemo(() => new THREE.Vector3(), []);
  const laggedCursor = useMemo(() => new THREE.Vector3(), []);
  const prevCursor = useMemo(() => new THREE.Vector3(), []);
  const unprojectVec = useMemo(() => new THREE.Vector3(), []);
  const dirVec = useMemo(() => new THREE.Vector3(), []);
  const normalVec = useMemo(() => new THREE.Vector3(), []);
  const cp1 = useMemo(() => new THREE.Vector3(), []);
  const cp2 = useMemo(() => new THREE.Vector3(), []);

  const tVec0 = useMemo(() => new THREE.Vector3(), []);
  const tVec1 = useMemo(() => new THREE.Vector3(), []);
  const camVec0 = useMemo(() => new THREE.Vector3(), []);
  const camVec1 = useMemo(() => new THREE.Vector3(), []);
  const sideVec0 = useMemo(() => new THREE.Vector3(), []);
  const sideVec1 = useMemo(() => new THREE.Vector3(), []);

  // Pre-allocated spine nodes
  const curvePts = useMemo(
    () => Array.from({ length: SPLINE_SEGMENTS + 1 }, () => new THREE.Vector3()),
    []
  );
  const branchPts = useMemo(
    () => Array.from({ length: BRANCH_SEGMENTS + 1 }, () => new THREE.Vector3()),
    []
  );

  // Pre-allocated spark particles
  const sparkParticles = useMemo(
    () =>
      Array.from({ length: SPARK_PARTICLE_COUNT }, () => ({
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        life: 0,
        maxLife: 0.4,
        size: 0.035,
      })),
    []
  );

  const stateRef = useRef({
    intensity: 0,
    initialized: false,
    lastMoveTime: 0,
  });

  useFrame((state, dt) => {
    const group = monumentRef.current;
    const outerMesh = outerGlowMeshRef.current;
    const innerMesh = innerCoreMeshRef.current;
    const branchMesh = branchMeshRef.current;
    const sparkMesh = sparkParticlesRef.current;
    const emitGlow = emitterGlowRef.current;
    const emitCore = emitterCoreRef.current;
    const curFlare = cursorFlareRef.current;
    const curCore = cursorCoreRef.current;
    const light = pointLightRef.current;

    if (
      !group ||
      !outerMesh ||
      !innerMesh ||
      !branchMesh ||
      !sparkMesh ||
      !emitGlow ||
      !emitCore ||
      !curFlare ||
      !curCore ||
      !light
    ) {
      return;
    }

    const clampedDt = Math.min(0.04, Math.max(0.001, dt));
    const s = stateRef.current;
    const now = state.clock.elapsedTime;

    // 1. Calculate clearly defined starting point on monument apex in world coordinates
    originWorld.copy(LOGO_EMITTER_LOCAL).applyMatrix4(group.matrixWorld);

    // 2. Unproject cursor position in world space at z = 0.25
    unprojectVec.set(state.pointer.x, state.pointer.y, 0.5);
    unprojectVec.unproject(state.camera);
    dirVec.subVectors(unprojectVec, state.camera.position).normalize();
    const planeDist = (0.25 - state.camera.position.z) / dirVec.z;
    targetCursor.copy(state.camera.position).addScaledVector(dirVec, planeDist);

    if (!s.initialized) {
      laggedCursor.copy(targetCursor);
      prevCursor.copy(targetCursor);
      s.lastMoveTime = now;
      s.initialized = true;
    }

    // 3. Natural follow lag: spring-damp lagged cursor towards real cursor
    laggedCursor.x = THREE.MathUtils.damp(laggedCursor.x, targetCursor.x, 9.5, clampedDt);
    laggedCursor.y = THREE.MathUtils.damp(laggedCursor.y, targetCursor.y, 9.5, clampedDt);
    laggedCursor.z = THREE.MathUtils.damp(laggedCursor.z, targetCursor.z, 9.5, clampedDt);

    // Motion detection
    const moveDist = targetCursor.distanceTo(prevCursor);
    if (moveDist > 0.004) {
      s.lastMoveTime = now;
    }
    const cursorSpeed = moveDist / clampedDt;
    prevCursor.copy(targetCursor);

    // 4. Proximity & Activity Evaluation
    const distFromApex = originWorld.distanceTo(targetCursor);
    const maxInteractiveDist = 7.5;
    const idleSeconds = now - s.lastMoveTime;
    const isInsideWindow =
      globalMouse.hasMoved &&
      Math.abs(state.pointer.x) <= 1.05 &&
      Math.abs(state.pointer.y) <= 1.05;

    // High energy when active and nearby, gracefully decays when idle (> 2.0s) or far
    let targetIntensity = 0;
    if (isInsideWindow && distFromApex < maxInteractiveDist) {
      const distFactor = Math.max(0, 1 - distFromApex / maxInteractiveDist);
      const activityFactor = Math.max(0, 1 - idleSeconds / 2.2);
      const speedBoost = Math.min(0.35, cursorSpeed * 0.06);
      targetIntensity = Math.min(1.0, (distFactor * 0.8 + 0.2) * (0.65 + speedBoost) * activityFactor);
    }

    // Silky progressive ramp and smooth decay to zero
    s.intensity = THREE.MathUtils.damp(
      s.intensity,
      targetIntensity,
      targetIntensity > s.intensity ? 7.0 : 3.2,
      clampedDt
    );

    const energy = s.intensity;

    if (energy < 0.01) {
      outerMesh.visible = false;
      innerMesh.visible = false;
      branchMesh.visible = false;
      sparkMesh.visible = false;
      emitGlow.visible = false;
      emitCore.visible = false;
      curFlare.visible = false;
      curCore.visible = false;
      light.intensity = 0;
      return;
    }

    outerMesh.visible = true;
    innerMesh.visible = true;
    branchMesh.visible = true;
    sparkMesh.visible = true;
    emitGlow.visible = true;
    emitCore.visible = true;
    curFlare.visible = true;
    curCore.visible = true;

    // 5. Build Natural Aerodynamic Spline with High-Voltage Jitter
    dirVec.subVectors(targetCursor, originWorld);
    const chordLen = dirVec.length();
    dirVec.normalize();

    // Perpendicular plane for whip curve
    normalVec.set(-dirVec.y, dirVec.x, 0.35).normalize();

    // Cubic Bezier Control Points
    cp1.copy(originWorld).addScaledVector(dirVec, chordLen * 0.32);
    cp1.y += chordLen * 0.15;

    cp2.copy(laggedCursor).addScaledVector(dirVec, -chordLen * 0.28);
    cp2.y -= chordLen * 0.08;

    // Sample Bezier curve + High-Frequency Electric Crackle
    for (let i = 0; i <= SPLINE_SEGMENTS; i++) {
      const u = i / SPLINE_SEGMENTS;
      const invU = 1 - u;

      // Base Bezier
      const b0 = invU * invU * invU;
      const b1 = 3 * invU * invU * u;
      const b2 = 3 * invU * u * u;
      const b3 = u * u * u;

      const px = b0 * originWorld.x + b1 * cp1.x + b2 * cp2.x + b3 * targetCursor.x;
      const py = b0 * originWorld.y + b1 * cp1.y + b2 * cp2.y + b3 * targetCursor.y;
      const pz = b0 * originWorld.z + b1 * cp1.z + b2 * cp2.z + b3 * targetCursor.z;

      // Envelope anchors firmly at both endpoints (0 at u=0 and u=1)
      const env = Math.sin(u * Math.PI);

      // Authentic electric crackle: multi-frequency harmonic turbulence
      const crackle1 = Math.sin(u * 28.0 - now * 32.0) * 0.055;
      const crackle2 = Math.cos(u * 52.0 + now * 48.0) * 0.028;
      const crackle3 = Math.sin(u * 94.0 - now * 80.0) * 0.015;
      const totalJitter = (crackle1 + crackle2 + crackle3) * env * (0.4 + energy * 0.6);

      curvePts[i].set(
        px + normalVec.x * totalJitter,
        py + normalVec.y * totalJitter,
        pz + normalVec.z * totalJitter
      );
    }

    // 6. Camera-Facing Ribbon Generation (Pure WebGL Triangles, Bold & Thick)
    const camPos = state.camera.position;
    const baseCoreWidth = 0.042 * (0.6 + energy * 0.4);
    const baseGlowWidth = 0.24 * (0.5 + energy * 0.5);

    let vIdx = 0;
    for (let i = 0; i < SPLINE_SEGMENTS; i++) {
      const p0 = curvePts[i];
      const p1 = curvePts[i + 1];

      // Tangents
      if (i === 0) tVec0.subVectors(p1, p0).normalize();
      else tVec0.subVectors(p1, curvePts[i - 1]).normalize();

      if (i + 1 === SPLINE_SEGMENTS) tVec1.subVectors(p1, p0).normalize();
      else tVec1.subVectors(curvePts[i + 2], p0).normalize();

      // Camera-perpendicular side vectors
      camVec0.subVectors(camPos, p0).normalize();
      sideVec0.crossVectors(tVec0, camVec0).normalize();

      camVec1.subVectors(camPos, p1).normalize();
      sideVec1.crossVectors(tVec1, camVec1).normalize();

      // Envelope width taper: elegant taper at endpoints, thick plasma in body
      const u0 = i / SPLINE_SEGMENTS;
      const u1 = (i + 1) / SPLINE_SEGMENTS;
      const env0 = 0.45 + Math.sin(u0 * Math.PI) * 0.55;
      const env1 = 0.45 + Math.sin(u1 * Math.PI) * 0.55;

      const cw0 = baseCoreWidth * env0 * 0.5;
      const cw1 = baseCoreWidth * env1 * 0.5;
      const gw0 = baseGlowWidth * env0 * 0.5;
      const gw1 = baseGlowWidth * env1 * 0.5;

      // --- INNER CORE QUAD (2 Triangles = 6 Vertices) ---
      // V0: L0, V1: R0, V2: L1
      innerCorePositions[vIdx] = p0.x - sideVec0.x * cw0;
      innerCorePositions[vIdx + 1] = p0.y - sideVec0.y * cw0;
      innerCorePositions[vIdx + 2] = p0.z - sideVec0.z * cw0 + 0.005;

      innerCorePositions[vIdx + 3] = p0.x + sideVec0.x * cw0;
      innerCorePositions[vIdx + 4] = p0.y + sideVec0.y * cw0;
      innerCorePositions[vIdx + 5] = p0.z + sideVec0.z * cw0 + 0.005;

      innerCorePositions[vIdx + 6] = p1.x - sideVec1.x * cw1;
      innerCorePositions[vIdx + 7] = p1.y - sideVec1.y * cw1;
      innerCorePositions[vIdx + 8] = p1.z - sideVec1.z * cw1 + 0.005;

      // V3: R0, V4: R1, V5: L1
      innerCorePositions[vIdx + 9] = p0.x + sideVec0.x * cw0;
      innerCorePositions[vIdx + 10] = p0.y + sideVec0.y * cw0;
      innerCorePositions[vIdx + 11] = p0.z + sideVec0.z * cw0 + 0.005;

      innerCorePositions[vIdx + 12] = p1.x + sideVec1.x * cw1;
      innerCorePositions[vIdx + 13] = p1.y + sideVec1.y * cw1;
      innerCorePositions[vIdx + 14] = p1.z + sideVec1.z * cw1 + 0.005;

      innerCorePositions[vIdx + 15] = p1.x - sideVec1.x * cw1;
      innerCorePositions[vIdx + 16] = p1.y - sideVec1.y * cw1;
      innerCorePositions[vIdx + 17] = p1.z - sideVec1.z * cw1 + 0.005;

      // --- OUTER GLOW QUAD ---
      outerGlowPositions[vIdx] = p0.x - sideVec0.x * gw0;
      outerGlowPositions[vIdx + 1] = p0.y - sideVec0.y * gw0;
      outerGlowPositions[vIdx + 2] = p0.z - sideVec0.z * gw0;

      outerGlowPositions[vIdx + 3] = p0.x + sideVec0.x * gw0;
      outerGlowPositions[vIdx + 4] = p0.y + sideVec0.y * gw0;
      outerGlowPositions[vIdx + 5] = p0.z + sideVec0.z * gw0;

      outerGlowPositions[vIdx + 6] = p1.x - sideVec1.x * gw1;
      outerGlowPositions[vIdx + 7] = p1.y - sideVec1.y * gw1;
      outerGlowPositions[vIdx + 8] = p1.z - sideVec1.z * gw1;

      outerGlowPositions[vIdx + 9] = p0.x + sideVec0.x * gw0;
      outerGlowPositions[vIdx + 10] = p0.y + sideVec0.y * gw0;
      outerGlowPositions[vIdx + 11] = p0.z + sideVec0.z * gw0;

      outerGlowPositions[vIdx + 12] = p1.x + sideVec1.x * gw1;
      outerGlowPositions[vIdx + 13] = p1.y + sideVec1.y * gw1;
      outerGlowPositions[vIdx + 14] = p1.z + sideVec1.z * gw1;

      outerGlowPositions[vIdx + 15] = p1.x - sideVec1.x * gw1;
      outerGlowPositions[vIdx + 16] = p1.y - sideVec1.y * gw1;
      outerGlowPositions[vIdx + 17] = p1.z - sideVec1.z * gw1;

      vIdx += 18;
    }

    // 7. Secondary Fork Branch Arc
    const forkRootIdx = Math.floor(SPLINE_SEGMENTS * 0.38);
    const forkRoot = curvePts[forkRootIdx];
    const branchOut = normalVec.clone().multiplyScalar(0.45);
    branchOut.y += 0.2;

    for (let i = 0; i <= BRANCH_SEGMENTS; i++) {
      const bu = i / BRANCH_SEGMENTS;
      const bpx = forkRoot.x + dirVec.x * bu * chordLen * 0.28 + branchOut.x * bu;
      const bpy = forkRoot.y + dirVec.y * bu * chordLen * 0.28 + branchOut.y * bu;
      const bpz = forkRoot.z + branchOut.z * bu;

      const benv = Math.sin(bu * Math.PI);
      const bcrackle = Math.sin(bu * 36.0 + now * 40.0) * 0.04 * benv;

      branchPts[i].set(bpx + normalVec.x * bcrackle, bpy + normalVec.y * bcrackle, bpz);
    }

    let bIdx = 0;
    const branchWidth = 0.06 * energy;
    for (let i = 0; i < BRANCH_SEGMENTS; i++) {
      const bp0 = branchPts[i];
      const bp1 = branchPts[i + 1];

      tVec0.subVectors(bp1, bp0).normalize();
      camVec0.subVectors(camPos, bp0).normalize();
      sideVec0.crossVectors(tVec0, camVec0).normalize();

      const bw = branchWidth * (1 - i / BRANCH_SEGMENTS) * 0.5;

      branchPositions[bIdx] = bp0.x - sideVec0.x * bw;
      branchPositions[bIdx + 1] = bp0.y - sideVec0.y * bw;
      branchPositions[bIdx + 2] = bp0.z - sideVec0.z * bw;

      branchPositions[bIdx + 3] = bp0.x + sideVec0.x * bw;
      branchPositions[bIdx + 4] = bp0.y + sideVec0.y * bw;
      branchPositions[bIdx + 5] = bp0.z + sideVec0.z * bw;

      branchPositions[bIdx + 6] = bp1.x - sideVec0.x * bw * 0.7;
      branchPositions[bIdx + 7] = bp1.y - sideVec0.y * bw * 0.7;
      branchPositions[bIdx + 8] = bp1.z - sideVec0.z * bw * 0.7;

      branchPositions[bIdx + 9] = bp0.x + sideVec0.x * bw;
      branchPositions[bIdx + 10] = bp0.y + sideVec0.y * bw;
      branchPositions[bIdx + 11] = bp0.z + sideVec0.z * bw;

      branchPositions[bIdx + 12] = bp1.x + sideVec0.x * bw * 0.7;
      branchPositions[bIdx + 13] = bp1.y + sideVec0.y * bw * 0.7;
      branchPositions[bIdx + 14] = bp1.z + sideVec0.z * bw * 0.7;

      branchPositions[bIdx + 15] = bp1.x - sideVec0.x * bw * 0.7;
      branchPositions[bIdx + 16] = bp1.y - sideVec0.y * bw * 0.7;
      branchPositions[bIdx + 17] = bp1.z - sideVec0.z * bw * 0.7;

      bIdx += 18;
    }

    // 8. Dynamic Flying Spark Embers
    let sIdx = 0;
    for (let i = 0; i < SPARK_PARTICLE_COUNT; i++) {
      const p = sparkParticles[i];
      p.life -= clampedDt;

      if (p.life <= 0) {
        if (energy > 0.15 && Math.random() < 0.65) {
          const sampleU = 0.1 + Math.random() * 0.85;
          const segFloat = sampleU * SPLINE_SEGMENTS;
          const sIndex = Math.min(SPLINE_SEGMENTS - 1, Math.floor(segFloat));
          const frac = segFloat - sIndex;

          const ptA = curvePts[sIndex];
          const ptB = curvePts[sIndex + 1];

          p.x = ptA.x + (ptB.x - ptA.x) * frac;
          p.y = ptA.y + (ptB.y - ptA.y) * frac;
          p.z = ptA.z + (ptB.z - ptA.z) * frac;

          const sprayAngle = Math.random() * Math.PI * 2;
          const spraySpeed = 0.6 + Math.random() * 1.4;
          p.vx = Math.cos(sprayAngle) * spraySpeed;
          p.vy = Math.sin(sprayAngle) * spraySpeed + 0.35; // gentle upward buoyancy
          p.vz = (Math.random() - 0.5) * 0.4;
          p.maxLife = 0.25 + Math.random() * 0.25;
          p.life = p.maxLife;
          p.size = 0.038 + Math.random() * 0.032;
        }
      } else {
        p.x += p.vx * clampedDt;
        p.y += p.vy * clampedDt;
        p.z += p.vz * clampedDt;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.vz *= 0.92;
      }

      if (p.life > 0) {
        const lifeFrac = p.life / p.maxLife;
        const pSize = p.size * lifeFrac * energy;

        // Billboard diamond quad
        sparkPositions[sIdx] = p.x - pSize;
        sparkPositions[sIdx + 1] = p.y;
        sparkPositions[sIdx + 2] = p.z;

        sparkPositions[sIdx + 3] = p.x;
        sparkPositions[sIdx + 4] = p.y + pSize;
        sparkPositions[sIdx + 5] = p.z;

        sparkPositions[sIdx + 6] = p.x;
        sparkPositions[sIdx + 7] = p.y - pSize;
        sparkPositions[sIdx + 8] = p.z;

        sparkPositions[sIdx + 9] = p.x;
        sparkPositions[sIdx + 10] = p.y + pSize;
        sparkPositions[sIdx + 11] = p.z;

        sparkPositions[sIdx + 12] = p.x + pSize;
        sparkPositions[sIdx + 13] = p.y;
        sparkPositions[sIdx + 14] = p.z;

        sparkPositions[sIdx + 15] = p.x;
        sparkPositions[sIdx + 16] = p.y - pSize;
        sparkPositions[sIdx + 17] = p.z;
      } else {
        for (let k = 0; k < 18; k++) sparkPositions[sIdx + k] = 0;
      }
      sIdx += 18;
    }

    // 9. Update GPU Attributes
    innerMesh.geometry.attributes.position.needsUpdate = true;
    outerMesh.geometry.attributes.position.needsUpdate = true;
    branchMesh.geometry.attributes.position.needsUpdate = true;
    sparkMesh.geometry.attributes.position.needsUpdate = true;

    // 10. Terminal Halos (Apex Emitter + Cursor Flare)
    const apexPulse = 1 + Math.sin(now * 18.0) * 0.18;
    emitGlow.position.copy(originWorld);
    emitGlow.scale.setScalar((0.26 + energy * 0.14) * apexPulse);

    emitCore.position.copy(originWorld);
    emitCore.scale.setScalar(0.09 * apexPulse);

    const cursorPulse = 1 + Math.sin(now * 24.0) * 0.22;
    curFlare.position.copy(targetCursor);
    curFlare.scale.setScalar((0.32 + energy * 0.18) * cursorPulse);

    curCore.position.copy(targetCursor);
    curCore.scale.setScalar(0.11 * cursorPulse);

    // 11. Opacity Updates with Additive Radiance
    (innerMesh.material as THREE.MeshBasicMaterial).opacity = Math.min(1.0, energy * 1.1);
    (outerMesh.material as THREE.MeshBasicMaterial).opacity = Math.min(0.88, energy * 0.85);
    (branchMesh.material as THREE.MeshBasicMaterial).opacity = Math.min(0.85, energy * 0.8);
    (sparkMesh.material as THREE.MeshBasicMaterial).opacity = Math.min(0.95, energy * 0.95);
    (emitGlow.material as THREE.MeshBasicMaterial).opacity = Math.min(0.85, energy * 0.85);
    (emitCore.material as THREE.MeshBasicMaterial).opacity = Math.min(1.0, energy);
    (curFlare.material as THREE.MeshBasicMaterial).opacity = Math.min(0.9, energy * 0.9);
    (curCore.material as THREE.MeshBasicMaterial).opacity = Math.min(1.0, energy);

    // 12. Dynamic Point Light casting realistic cyan specular reflections
    light.position.set(
      targetCursor.x * 0.55 + originWorld.x * 0.45,
      targetCursor.y * 0.55 + originWorld.y * 0.45,
      0.85
    );
    light.intensity = energy * 14.0;
  });

  return (
    <group>
      {/* Dynamic Specular Point Light casting cyan reflections on monument facets */}
      <pointLight ref={pointLightRef} color="#00FFE0" distance={8.0} decay={2.0} intensity={0} />

      {/* --- APEX EMITTER TERMINAL --- */}
      {/* Outer Cyan Corona */}
      <mesh ref={emitterGlowRef} renderOrder={51}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial
          color="#00FFE0"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Inner White-Hot Core */}
      <mesh ref={emitterCoreRef} renderOrder={52}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* --- CURSOR CONTACT FLARE --- */}
      {/* Outer Cyan Plasma Flare */}
      <mesh ref={cursorFlareRef} renderOrder={53}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial
          color="#00FFE0"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Inner White-Hot Core */}
      <mesh ref={cursorCoreRef} renderOrder={54}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* --- VOLUMETRIC BILLBOARD LIGHTNING RIBBONS (PURE WEBGL GEOMETRY) --- */}
      {/* Layer 1: Wide Plasma Glow Sheath (#00FFE0 / #00FFFF) */}
      <mesh ref={outerGlowMeshRef} renderOrder={45}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[outerGlowPositions, 3]}
            count={RIBBON_FLOATS / 3}
          />
        </bufferGeometry>
        <meshBasicMaterial
          color="#00FFE0"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Layer 2: Ultra-Bright Incandescent White-Hot Core (#FFFFFF) */}
      <mesh ref={innerCoreMeshRef} renderOrder={46}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[innerCorePositions, 3]}
            count={RIBBON_FLOATS / 3}
          />
        </bufferGeometry>
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Layer 3: Secondary Crackling Fork Arc */}
      <mesh ref={branchMeshRef} renderOrder={47}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[branchPositions, 3]}
            count={BRANCH_FLOATS / 3}
          />
        </bufferGeometry>
        <meshBasicMaterial
          color="#00FFE0"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Layer 4: Flying Electric Spark Embers */}
      <mesh ref={sparkParticlesRef} renderOrder={48}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparkPositions, 3]}
            count={SPARK_FLOATS / 3}
          />
        </bufferGeometry>
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * 3D Prime Step Monument
 *
 * Geometric Refinement:
 * - Proportional Extrusions: Teal pillar sits proudly in the foreground (`depth: 0.54`),
 *   while the black canopy arch (`depth: 0.42`) is recessed so the "P" form is recognized immediately.
 * - Consistent 3D Bevels: Uniform bevel size and segments across all pieces (`0.034` thickness, `0.026` size).
 * - Reduced Black Surface & Cyan Sheen: Black canopy is finished in graphite charcoal (`#1E2328`)
 *   with iridescent teal/cyan sheen (`sheenColor="#00E6D2"`) reflecting light on the bevels.
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

  const { pillarShape, flapShape, ribbonShape } = useMemo(() => {
    return {
      pillarShape: makeShape(PILLAR_POINTS),
      flapShape: makeShape(FLAP_POINTS),
      ribbonShape: makeShape(BLACK_RIBBON_POINTS),
    };
  }, []);

  // Consistent, uniform bevel parameters across all architectural components
  const uniformBevel = useMemo(
    () => ({
      bevelEnabled: true,
      bevelThickness: 0.034,
      bevelSize: 0.026,
      bevelSegments: 8,
    }),
    []
  );

  // Balanced extrusions: Pillar is prominent, canopy is balanced and never overwhelms
  const pillarExtrude = useMemo(
    () => ({
      depth: 0.54,
      ...uniformBevel,
    }),
    [uniformBevel]
  );

  const ribbonExtrude = useMemo(
    () => ({
      depth: 0.42,
      ...uniformBevel,
    }),
    [uniformBevel]
  );

  const flapExtrude = useMemo(
    () => ({
      depth: 0.46,
      ...uniformBevel,
    }),
    [uniformBevel]
  );

  useFrame((state, dt) => {
    const g = groupRef.current;
    if (!g) return;

    // Organic weighted damping for silky-smooth cursor follow
    globalMouse.x = THREE.MathUtils.damp(globalMouse.x, globalMouse.targetX, 2.8, dt);
    globalMouse.y = THREE.MathUtils.damp(globalMouse.y, globalMouse.targetY, 2.8, dt);

    const mx = globalMouse.x;
    const my = globalMouse.y;
    const p = sceneState.progress;
    const t = state.clock.elapsedTime;

    const idleFloat = Math.sin(t * 1.3) * 0.035;
    const idleRot = Math.sin(t * 0.5) * 0.02;

    // Perspective tracking
    const targetRotY = 0.05 + mx * 0.36 + idleRot + p * 0.85;
    const targetRotX = -0.03 - my * 0.26 + p * 0.15;
    const targetRotZ = -mx * 0.03;

    const targetPosX = mx * 0.16;
    const targetPosY = 0.08 + my * 0.10 + idleFloat - p * 0.18;

    const minViewportDim = Math.min(state.viewport.width, state.viewport.height);
    const fitScale = Math.min(1, Math.max(0.72, minViewportDim / 6.3));
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, fitScale, 4.0, dt));

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 3.0, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX, 3.0, dt);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, targetRotZ, 3.0, dt);
    g.position.x = THREE.MathUtils.damp(g.position.x, targetPosX, 3.0, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetPosY, 3.0, dt);

    // Camera perspective tracking for spatial parallax
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, mx * 0.35, 2.4, dt);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, my * 0.25, 2.4, dt);
    state.camera.lookAt(0, 0, 0);

    // Scroll-activated architectural exploded deconstruction
    const explode = Math.pow(Math.min(1, Math.max(0, p * 2.0)), 1.2);

    if (canopyRef.current) {
      canopyRef.current.position.x = THREE.MathUtils.damp(canopyRef.current.position.x, explode * 0.45, 4.0, dt);
      canopyRef.current.position.y = THREE.MathUtils.damp(canopyRef.current.position.y, explode * 0.95, 4.0, dt);
      canopyRef.current.position.z = THREE.MathUtils.damp(canopyRef.current.position.z, -0.24 + explode * 0.65, 4.0, dt);
      canopyRef.current.rotation.x = THREE.MathUtils.damp(canopyRef.current.rotation.x, explode * 0.15, 4.0, dt);
    }

    if (flapRef.current) {
      flapRef.current.position.x = THREE.MathUtils.damp(flapRef.current.position.x, -explode * 0.7, 4.0, dt);
      flapRef.current.position.y = THREE.MathUtils.damp(flapRef.current.position.y, explode * 0.4, 4.0, dt);
      flapRef.current.position.z = THREE.MathUtils.damp(flapRef.current.position.z, -0.22 + explode * 0.85, 4.0, dt);
    }

    if (pillarRef.current) {
      pillarRef.current.position.x = THREE.MathUtils.damp(pillarRef.current.position.x, -explode * 0.4, 4.0, dt);
      pillarRef.current.position.y = THREE.MathUtils.damp(pillarRef.current.position.y, -explode * 0.8, 4.0, dt);
      pillarRef.current.position.z = THREE.MathUtils.damp(pillarRef.current.position.z, -0.22 - explode * 0.3, 4.0, dt);
      pillarRef.current.rotation.y = THREE.MathUtils.damp(pillarRef.current.rotation.y, explode * 0.14, 4.0, dt);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.08, 0]}>
      {/* ========================================================
          PART 01: LOGO BLACK CANOPY ARCH (Graphite Charcoal with Cyan Sheen)
          ======================================================== */}
      <group ref={canopyRef} position={[0, 0, -0.24]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[ribbonShape, ribbonExtrude]} />
          <meshPhysicalMaterial
            color="#141B20"
            roughness={0.15}
            metalness={0.55}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
            sheen={1.0}
            sheenColor="#00FFE0"
            sheenRoughness={0.18}
            reflectivity={0.98}
            envMapIntensity={1.8}
          />
        </mesh>
      </group>

      {/* ========================================================
          PART 02: LOGO VERTICAL PILLAR (Prominent Official TPS Teal #1F9D9A)
          ======================================================== */}
      <group ref={pillarRef} position={[0, 0, -0.22]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[pillarShape, pillarExtrude]} />
          <meshPhysicalMaterial
            color="#1F9D9A"
            emissive="#0C5C5A"
            emissiveIntensity={0.24}
            roughness={0.15}
            metalness={0.38}
            clearcoat={0.95}
            clearcoatRoughness={0.05}
            reflectivity={0.96}
            envMapIntensity={1.5}
          />
        </mesh>
      </group>

      {/* ========================================================
          PART 03: LOGO FRONT EAVES FLAP (Vibrant Cyan #1E9C99)
          ======================================================== */}
      <group ref={flapRef} position={[0, 0, -0.22]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[flapShape, flapExtrude]} />
          <meshPhysicalMaterial
            color="#1E9C99"
            emissive="#127875"
            emissiveIntensity={0.42}
            roughness={0.08}
            metalness={0.18}
            transmission={0.42}
            thickness={0.55}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            ior={1.52}
          />
        </mesh>
      </group>

      {/* ========================================================
          PART 04: ATOMIC TECH ORBITS
          ======================================================== */}
      <AtomicTechOrbits />

      {/* SOFT STUDIO GROUND CONTACT SHADOW */}
      <group position={[0, -2.25, 0]}>
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.44}
          scale={8.4}
          blur={2.6}
          far={4.6}
          color="#041616"
        />
      </group>
    </group>
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
        {/* Soft studio ambient fill */}
        <ambientLight intensity={0.65} color="#FFFFFF" />
        <hemisphereLight args={["#FFFFFF", "#0A4846", 0.55]} />

        {/* Consistent Architectural Key Light from Upper Right [4.5, 7.5, 6.0] */}
        <directionalLight
          position={[4.5, 7.5, 6.0]}
          intensity={2.6}
          color="#FFFFFF"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Crisp Front Fill Light to sculpt 3D chamfers and bevels */}
        <directionalLight position={[0.5, 3.0, 7.5]} intensity={1.4} color="#FFFFFF" />

        {/* Dedicated Teal/Cyan Rim Light producing cyan reflections on black surfaces */}
        <directionalLight
          position={[-5.5, -1.8, 4.5]}
          intensity={2.8}
          color="#00FFE0"
        />

        {/* Soft Uplight bounce */}
        <directionalLight position={[0, -5, -2]} intensity={0.45} color="#F4F8F8" />

        {/* Float subtly in studio atmosphere */}
        <Float speed={1.3} rotationIntensity={0.06} floatIntensity={0.1}>
          <OfficialLogoMonument monumentRef={monumentRef} />
        </Float>

        {/* Natural Cursor-Following Lightning with Particle Trail */}
        <NaturalCursorLightning monumentRef={monumentRef} />
      </Suspense>
    </Canvas>
  );
}
