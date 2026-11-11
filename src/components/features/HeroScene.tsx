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
    radiusX: 2.45,
    radiusY: 2.25,
    rotation: [Math.PI * 0.11, Math.PI * 0.12, Math.PI * 0.18],
    speed: 0.50,
    icons: [
      { tech: TECH_ITEMS.react, offset: 0.35 },
      { tech: TECH_ITEMS.aws, offset: 0.35 + Math.PI },
    ],
  },
  // Orbit 2: Counter-Tilted Outer Loop with Python & TensorFlow (180° balanced spacing)
  {
    radiusX: 2.55,
    radiusY: 2.35,
    rotation: [-Math.PI * 0.12, -Math.PI * 0.11, -Math.PI * 0.20],
    speed: 0.44,
    icons: [
      { tech: TECH_ITEMS.python, offset: 1.45 },
      { tech: TECH_ITEMS.tensorflow, offset: 1.45 + Math.PI },
    ],
  },
  // Orbit 3: Equatorial Loop with Java
  {
    radiusX: 2.35,
    radiusY: 2.20,
    rotation: [Math.PI * 0.09, -Math.PI * 0.12, Math.PI * 0.05],
    speed: 0.56,
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
const SPLINE_SEGMENTS = 26;
const SPLINE_FLOATS = SPLINE_SEGMENTS * 2 * 3; // 156 floats for line segments

const PARTICLE_COUNT = 24;
const PARTICLE_FLOATS = PARTICLE_COUNT * 2 * 3; // 144 floats for particle streaks

// Fixed emitter focal origin in logo monument local coordinates (apex of the loop)
const LOGO_EMITTER_LOCAL = new THREE.Vector3(0.06, 0.52, 0.22);

function NaturalCursorLightning({
  monumentRef,
}: {
  monumentRef: React.RefObject<THREE.Group | null>;
}) {
  const outerGlowLineRef = useRef<THREE.LineSegments>(null);
  const innerCoreLineRef = useRef<THREE.LineSegments>(null);
  const particleLineRef = useRef<THREE.LineSegments>(null);
  const contactHaloRef = useRef<THREE.Mesh>(null);
  const emitterBeadRef = useRef<THREE.Mesh>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  // Pre-allocated typed arrays for zero GC allocation at 60fps
  const outerGlowPositions = useMemo(() => new Float32Array(SPLINE_FLOATS), []);
  const innerCorePositions = useMemo(() => new Float32Array(SPLINE_FLOATS), []);
  const particlePositions = useMemo(() => new Float32Array(PARTICLE_FLOATS), []);

  // Reusable vectors
  const originWorld = useMemo(() => new THREE.Vector3(), []);
  const targetCursor = useMemo(() => new THREE.Vector3(), []);
  const laggedCursor = useMemo(() => new THREE.Vector3(), []);
  const prevCursor = useMemo(() => new THREE.Vector3(), []);
  const unprojectVec = useMemo(() => new THREE.Vector3(), []);
  const dirVec = useMemo(() => new THREE.Vector3(), []);
  const normalVec = useMemo(() => new THREE.Vector3(), []);
  const cp1 = useMemo(() => new THREE.Vector3(), []);
  const cp2 = useMemo(() => new THREE.Vector3(), []);

  // Pre-allocated curve samples
  const curvePts = useMemo(
    () => Array.from({ length: SPLINE_SEGMENTS + 1 }, () => new THREE.Vector3()),
    []
  );

  // Pre-allocated particle pool
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, () => ({
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        life: 0,
        decay: 2.2,
        size: 0.024,
      })),
    []
  );

  // Damped state
  const stateRef = useRef({
    energyIntensity: 0,
    initialized: false,
  });

  useFrame((state, dt) => {
    const group = monumentRef.current;
    const outerGlow = outerGlowLineRef.current;
    const innerCore = innerCoreLineRef.current;
    const particleMesh = particleLineRef.current;
    const contactHalo = contactHaloRef.current;
    const emitterBead = emitterBeadRef.current;
    const pointLight = pointLightRef.current;

    if (
      !group ||
      !outerGlow ||
      !innerCore ||
      !particleMesh ||
      !contactHalo ||
      !emitterBead ||
      !pointLight
    ) {
      return;
    }

    const clampedDt = Math.min(0.04, Math.max(0.001, dt));
    const s = stateRef.current;

    // 1. Calculate clearly defined starting point on the logo in world coordinates
    originWorld.copy(LOGO_EMITTER_LOCAL).applyMatrix4(group.matrixWorld);

    // 2. Unproject cursor position in world space at z = 0.25
    unprojectVec.set(state.pointer.x, state.pointer.y, 0.5);
    unprojectVec.unproject(state.camera);
    dirVec.subVectors(unprojectVec, state.camera.position).normalize();
    const planeDistance = (0.25 - state.camera.position.z) / dirVec.z;
    targetCursor.copy(state.camera.position).addScaledVector(dirVec, planeDistance);

    if (!s.initialized) {
      laggedCursor.copy(targetCursor);
      prevCursor.copy(targetCursor);
      s.initialized = true;
    }

    // 3. Natural delay: spring-damp lagged cursor towards real cursor
    laggedCursor.x = THREE.MathUtils.damp(laggedCursor.x, targetCursor.x, 8.5, clampedDt);
    laggedCursor.y = THREE.MathUtils.damp(laggedCursor.y, targetCursor.y, 8.5, clampedDt);
    laggedCursor.z = THREE.MathUtils.damp(laggedCursor.z, targetCursor.z, 8.5, clampedDt);

    // Calculate motion speed
    const cursorSpeed = targetCursor.distanceTo(prevCursor) / clampedDt;
    prevCursor.copy(targetCursor);

    // 4. Proximity & Activity Evaluation
    const distFromOrigin = originWorld.distanceTo(targetCursor);
    const maxRadius = 3.0;
    const inRange = distFromOrigin <= maxRadius && globalMouse.hasMoved;

    // Target intensity: high when moving in proximity, fades progressively when idle or departing
    const proximityRatio = Math.max(0, 1 - distFromOrigin / maxRadius);
    const targetIntensity = inRange
      ? Math.pow(proximityRatio, 1.1) * (0.55 + Math.min(0.45, cursorSpeed * 0.08))
      : 0.0;

    // Smooth progressive fade in and buttery gradual decay
    s.energyIntensity = THREE.MathUtils.damp(
      s.energyIntensity,
      targetIntensity,
      inRange ? 5.5 : 2.6,
      clampedDt
    );

    const energy = s.energyIntensity;

    if (energy < 0.008) {
      outerGlow.visible = false;
      innerCore.visible = false;
      particleMesh.visible = false;
      contactHalo.visible = false;
      emitterBead.visible = false;
      pointLight.intensity = 0;
      return;
    }

    outerGlow.visible = true;
    innerCore.visible = true;
    particleMesh.visible = true;
    contactHalo.visible = true;
    emitterBead.visible = true;

    // 5. Construct Smooth Aerodynamic Spline (Curves naturally instead of random zigzags)
    dirVec.subVectors(targetCursor, originWorld);
    const chordLength = dirVec.length();
    dirVec.normalize();

    // Perpendicular plane normal for aerodynamic whip curve
    normalVec.set(-dirVec.y, dirVec.x, 0.2).normalize();

    // Cubic Bezier Control Points
    // CP1 extends along logo outward tangent
    cp1.copy(originWorld).addScaledVector(dirVec, chordLength * 0.35);
    cp1.y += chordLength * 0.12;

    // CP2 lags behind cursor movement, creating smooth whip inertia
    cp2.copy(laggedCursor).addScaledVector(dirVec, -chordLength * 0.25);

    const time = state.clock.elapsedTime;

    // Evaluate cubic Bezier with gentle electromagnetic harmonic ripples
    for (let i = 0; i <= SPLINE_SEGMENTS; i++) {
      const u = i / SPLINE_SEGMENTS;
      const invU = 1 - u;

      // Cubic Bezier interpolation
      const b0 = invU * invU * invU;
      const b1 = 3 * invU * invU * u;
      const b2 = 3 * invU * u * u;
      const b3 = u * u * u;

      const px = b0 * originWorld.x + b1 * cp1.x + b2 * cp2.x + b3 * targetCursor.x;
      const py = b0 * originWorld.y + b1 * cp1.y + b2 * cp2.y + b3 * targetCursor.y;
      const pz = b0 * originWorld.z + b1 * cp1.z + b2 * cp2.z + b3 * targetCursor.z;

      // Natural harmonic wave envelope (strictly 0 at both endpoints, fluid wave in center)
      const env = Math.sin(u * Math.PI);
      const wave =
        (Math.sin(u * 14.0 - time * 16.0) * 0.045 +
          Math.sin(u * 28.0 - time * 28.0) * 0.018) *
        env *
        (0.5 + energy * 0.5);

      curvePts[i].set(
        px + normalVec.x * wave,
        py + normalVec.y * wave,
        pz + normalVec.z * wave
      );
    }

    // 6. Populate Spline Line Segments: Outer Cyan Glow Sheath & Inner High-Energy Core
    for (let i = 0; i < SPLINE_SEGMENTS; i++) {
      const p1 = curvePts[i];
      const p2 = curvePts[i + 1];
      const idx = i * 6;

      // Outer Cyan Glow Sheath (#00A89F)
      outerGlowPositions[idx] = p1.x;
      outerGlowPositions[idx + 1] = p1.y;
      outerGlowPositions[idx + 2] = p1.z - 0.004;
      outerGlowPositions[idx + 3] = p2.x;
      outerGlowPositions[idx + 4] = p2.y;
      outerGlowPositions[idx + 5] = p2.z - 0.004;

      // Inner Razor Core (#00FFE0)
      innerCorePositions[idx] = p1.x;
      innerCorePositions[idx + 1] = p1.y;
      innerCorePositions[idx + 2] = p1.z + 0.004;
      innerCorePositions[idx + 3] = p2.x;
      innerCorePositions[idx + 4] = p2.y;
      innerCorePositions[idx + 5] = p2.z + 0.004;
    }

    // 7. Small Progressive Particles Along the Trail
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      p.life -= clampedDt * p.decay;

      // Spawn new particles along the curved trail when energy is active
      if (p.life <= 0) {
        if (energy > 0.12 && Math.random() < 0.45) {
          // Sample an interpolated point along the smooth spline
          const sampleU = 0.15 + Math.random() * 0.75;
          const segFloat = sampleU * SPLINE_SEGMENTS;
          const segIdx = Math.min(SPLINE_SEGMENTS - 1, Math.floor(segFloat));
          const frac = segFloat - segIdx;

          const pStart = curvePts[segIdx];
          const pEnd = curvePts[segIdx + 1];

          p.x = pStart.x + (pEnd.x - pStart.x) * frac + (Math.random() - 0.5) * 0.03;
          p.y = pStart.y + (pEnd.y - pStart.y) * frac + (Math.random() - 0.5) * 0.03;
          p.z = pStart.z + (pEnd.z - pStart.z) * frac + (Math.random() - 0.5) * 0.03;

          const driftAngle = Math.random() * Math.PI * 2;
          const driftSpeed = 0.25 + Math.random() * 0.65;
          p.vx = Math.cos(driftAngle) * driftSpeed;
          p.vy = Math.sin(driftAngle) * driftSpeed + 0.15; // subtle upward buoyancy
          p.vz = (Math.random() - 0.5) * 0.2;
          p.life = 1.0;
          p.decay = 1.8 + Math.random() * 1.6; // Progressive fade over ~0.3-0.5s
          p.size = 0.022 + Math.random() * 0.020;
        }
      } else {
        // Integrate position with slight drag
        p.x += p.vx * clampedDt;
        p.y += p.vy * clampedDt;
        p.z += p.vz * clampedDt;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.vz *= 0.94;
      }

      const idx = i * 6;
      if (p.life > 0) {
        const streakTailX = p.x - p.vx * p.size;
        const streakTailY = p.y - p.vy * p.size;
        const streakTailZ = p.z - p.vz * p.size;

        particlePositions[idx] = p.x;
        particlePositions[idx + 1] = p.y;
        particlePositions[idx + 2] = p.z;
        particlePositions[idx + 3] = streakTailX;
        particlePositions[idx + 4] = streakTailY;
        particlePositions[idx + 5] = streakTailZ;
      } else {
        particlePositions[idx] = targetCursor.x;
        particlePositions[idx + 1] = targetCursor.y;
        particlePositions[idx + 2] = targetCursor.z;
        particlePositions[idx + 3] = targetCursor.x;
        particlePositions[idx + 4] = targetCursor.y;
        particlePositions[idx + 5] = targetCursor.z;
      }
    }

    // 8. Tapering Endpoint & Emitter Node
    // Clearly defined logo emitter node
    emitterBead.position.copy(originWorld);
    const emitterScale = 0.7 + energy * 0.5;
    emitterBead.scale.set(emitterScale, emitterScale, emitterScale);

    // Smooth soft contact node at cursor (eliminates abrupt pixelated endings)
    contactHalo.position.copy(targetCursor);
    const haloScale = (0.5 + Math.min(0.8, cursorSpeed * 0.05)) * energy;
    contactHalo.scale.set(haloScale, haloScale, haloScale);

    // 9. Update GPU Buffers
    outerGlow.geometry.attributes.position.needsUpdate = true;
    innerCore.geometry.attributes.position.needsUpdate = true;
    particleMesh.geometry.attributes.position.needsUpdate = true;

    // 10. Update Opacities with Progressive Fade
    (outerGlow.material as THREE.LineBasicMaterial).opacity = Math.min(0.85, energy * 0.9);
    (innerCore.material as THREE.LineBasicMaterial).opacity = Math.min(1.0, energy * 1.15);
    (particleMesh.material as THREE.LineBasicMaterial).opacity = Math.min(0.9, energy * 1.0);
    (contactHalo.material as THREE.MeshBasicMaterial).opacity = Math.min(0.8, energy * 0.95);
    (emitterBead.material as THREE.MeshBasicMaterial).opacity = Math.min(0.9, energy * 1.0);

    // 11. Point Light Illumination
    pointLight.position.set(
      targetCursor.x * 0.65 + originWorld.x * 0.35,
      targetCursor.y * 0.65 + originWorld.y * 0.35,
      0.65
    );
    pointLight.intensity = energy * 6.0;
  });

  return (
    <group>
      {/* Dynamic Specular Point Light casting cyan reflections */}
      <pointLight ref={pointLightRef} color="#00FFE0" distance={6.0} decay={2.0} intensity={0} />

      {/* Clearly Defined Starting Point Emitter Node */}
      <mesh ref={emitterBeadRef} renderOrder={46}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial
          color="#00FFE0"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>

      {/* Outer Cyan Glow Sheath (#00A89F) */}
      <lineSegments ref={outerGlowLineRef} renderOrder={41}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[outerGlowPositions, 3]}
            count={SPLINE_FLOATS / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00A89F"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
          linewidth={3}
        />
      </lineSegments>

      {/* Inner High-Energy Cyan Core (#00FFE0) */}
      <lineSegments ref={innerCoreLineRef} renderOrder={42}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[innerCorePositions, 3]}
            count={SPLINE_FLOATS / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00FFE0"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
          linewidth={1.5}
        />
      </lineSegments>

      {/* Progressively Fading Flying Energy Motes */}
      <lineSegments ref={particleLineRef} renderOrder={43}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
            count={PARTICLE_FLOATS / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00FFE0"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
          linewidth={2}
        />
      </lineSegments>

      {/* Smooth Soft Contact Halo Node (Eliminates Abrupt Pixelated Ending) */}
      <mesh ref={contactHaloRef} renderOrder={44}>
        <circleGeometry args={[0.08, 20]} />
        <meshBasicMaterial
          color="#00FFE0"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.NormalBlending}
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
  const coreRef = useRef<THREE.Group>(null);

  const { pillarShape, flapShape, ribbonShape, coreShape } = useMemo(() => {
    return {
      pillarShape: makeShape(PILLAR_POINTS),
      flapShape: makeShape(FLAP_POINTS),
      ribbonShape: makeShape(BLACK_RIBBON_POINTS),
      coreShape: makeShape(CORE_POINTS),
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

  const coreExtrude = useMemo(
    () => ({
      depth: 0.38,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.018,
      bevelSegments: 8,
    }),
    []
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

    if (coreRef.current) {
      const coreScale = 0.85 + explode * 0.28;
      coreRef.current.scale.setScalar(THREE.MathUtils.damp(coreRef.current.scale.x, coreScale, 4.0, dt));
      coreRef.current.position.z = THREE.MathUtils.damp(coreRef.current.position.z, -0.20 + explode * 0.22, 4.0, dt);
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
            color="#1E2328"
            roughness={0.22}
            metalness={0.35}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            sheen={0.9}
            sheenColor="#00E6D2"
            sheenRoughness={0.25}
            reflectivity={0.94}
            envMapIntensity={1.3}
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
          PART 04: OPTICAL CRYSTAL GLASS INNER CORE (Revealed On Scroll)
          ======================================================== */}
      <group ref={coreRef} position={[-0.1, 0.25, -0.20]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[coreShape, coreExtrude]} />
          <meshPhysicalMaterial
            color="#E8FBFB"
            emissive="#1F9D9A"
            emissiveIntensity={0.15}
            roughness={0.04}
            metalness={0.05}
            transmission={0.94}
            thickness={1.0}
            ior={1.54}
            clearcoat={1.0}
            transparent
            opacity={0.88}
          />
        </mesh>
      </group>

      {/* ========================================================
          PART 05: ATOMIC TECH ORBITS
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

        {/* Dedicated Teal/Cyan Rim Light producing cyan reflections on black surfaces */}
        <directionalLight
          position={[-5.5, -2.2, 4.0]}
          intensity={2.0}
          color="#00D4C4"
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
