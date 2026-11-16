"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Float, ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/lib/scroll";

/**
 * Generates a tileable 512x512 brushed micro-grain bump texture for physical metal & anodized surfaces.
 * Gives the 3D "P" monument tactile, Apple-Pro-grade machined aluminum realism under studio specular light.
 */
function createMicroBrushedBumpTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const img = ctx.createImageData(size, size);
  const data = img.data;
  for (let y = 0; y < size; y++) {
    // Subtle horizontal brushed grain + fine isotropic micro-speckle
    const rowWave = Math.sin(y * 0.85) * 10 + Math.cos(y * 2.3) * 6;
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const hash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      const grain = (hash - Math.floor(hash) - 0.5) * 22;
      const streak = Math.sin((x + y * 0.25) * 0.35) * 7;
      const v = Math.max(0, Math.min(255, Math.round(128 + rowWave + grain + streak)));
      data[idx] = v;
      data[idx + 1] = v;
      data[idx + 2] = v;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3.5, 3.5);
  tex.needsUpdate = true;
  return tex;
}

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

  // High-resolution 16-segment bevels for smooth, machined-metal specular edge highlights
  const uniformBevel = useMemo(
    () => ({
      bevelEnabled: true,
      bevelThickness: 0.042,
      bevelSize: 0.030,
      bevelSegments: 16,
      curveSegments: 24,
    }),
    []
  );

  const microBumpMap = useMemo(() => createMicroBrushedBumpTexture(), []);

  // Balanced extrusions: Pillar sits proudly in front, canopy arch frames it with deep relief
  const pillarExtrude = useMemo(
    () => ({
      depth: 0.56,
      ...uniformBevel,
    }),
    [uniformBevel]
  );

  const ribbonExtrude = useMemo(
    () => ({
      depth: 0.44,
      ...uniformBevel,
    }),
    [uniformBevel]
  );

  const flapExtrude = useMemo(
    () => ({
      depth: 0.48,
      ...uniformBevel,
    }),
    [uniformBevel]
  );

  const { pillarGeo, ribbonGeo, flapGeo } = useMemo(() => {
    const pGeo = new THREE.ExtrudeGeometry(pillarShape, pillarExtrude);
    const rGeo = new THREE.ExtrudeGeometry(ribbonShape, ribbonExtrude);
    const fGeo = new THREE.ExtrudeGeometry(flapShape, flapExtrude);
    pGeo.computeVertexNormals();
    rGeo.computeVertexNormals();
    fGeo.computeVertexNormals();
    return { pillarGeo: pGeo, ribbonGeo: rGeo, flapGeo: fGeo };
  }, [pillarShape, ribbonShape, flapShape, pillarExtrude, ribbonExtrude, flapExtrude]);

  useEffect(() => {
    return () => {
      pillarGeo.dispose();
      ribbonGeo.dispose();
      flapGeo.dispose();
      microBumpMap?.dispose();
    };
  }, [pillarGeo, ribbonGeo, flapGeo, microBumpMap]);

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
    const targetPosY = 0.10 + my * 0.10 + idleFloat - p * 0.18;

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
    <group ref={groupRef} position={[0, 0.10, 0]}>
      {/* ========================================================
          PART 01: LOGO BLACK CANOPY ARCH
          Satin Anodized Obsidian Titanium with Restrained Velvet Sheen
          ======================================================== */}
      <group ref={canopyRef} position={[0, 0, -0.25]}>
        <mesh geometry={ribbonGeo} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#0D1317"
            roughness={0.34}
            metalness={0.45}
            bumpMap={microBumpMap}
            bumpScale={0.0012}
            clearcoat={0.35}
            clearcoatRoughness={0.28}
            sheen={0.55}
            sheenColor="#18B8A8"
            sheenRoughness={0.42}
            reflectivity={0.68}
            envMapIntensity={0.85}
          />
        </mesh>

        {/* Subtle Inner Emerald Accent Light in the P crook */}
        <pointLight
          position={[0.38, -0.22, 0.42]}
          color="#1FD4C4"
          intensity={1.35}
          distance={2.2}
          decay={2.0}
        />
      </group>

      {/* ========================================================
          PART 02: LOGO VERTICAL PILLAR
          Satin-Matte Anodized Brand Teal (#148582) — Rich Color, Soft Specular
          ======================================================== */}
      <group ref={pillarRef} position={[0, 0, -0.21]}>
        <mesh geometry={pillarGeo} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#158884"
            emissive="#073836"
            emissiveIntensity={0.10}
            roughness={0.32}
            metalness={0.25}
            bumpMap={microBumpMap}
            bumpScale={0.0010}
            clearcoat={0.38}
            clearcoatRoughness={0.24}
            sheen={0.35}
            sheenColor="#5EEAD4"
            sheenRoughness={0.45}
            ior={1.48}
            reflectivity={0.65}
            envMapIntensity={0.85}
          />
        </mesh>
      </group>

      {/* ========================================================
          PART 03: LOGO FRONT EAVES FLAP
          Satin Frosted Aquamarine Accent (#1E9C99)
          ======================================================== */}
      <group ref={flapRef} position={[0, 0, -0.20]}>
        <mesh geometry={flapGeo} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#1E9E9A"
            emissive="#0B4F4C"
            emissiveIntensity={0.14}
            roughness={0.24}
            metalness={0.18}
            transmission={0.22}
            thickness={0.45}
            attenuationColor="#148582"
            attenuationDistance={0.8}
            clearcoat={0.45}
            clearcoatRoughness={0.20}
            ior={1.48}
            reflectivity={0.7}
            envMapIntensity={0.9}
          />
        </mesh>
      </group>

      {/* ========================================================
          PART 04: ATOMIC TECH ORBITS
          ======================================================== */}
      <AtomicTechOrbits />

      {/* MULTI-LAYER GROUND CONTACT & AMBIENT OCCLUSION SHADOW */}
      <group position={[0, -2.25, 0]}>
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.44}
          scale={8.6}
          blur={2.5}
          far={4.8}
          color="#041818"
        />
      </group>
    </group>
  );
}

/**
 * Diffused Studio Softbox Environment Rig
 * Balanced, gentle studio lighting for realistic satin-anodized surfaces without mirror glare.
 */
function StudioEnvironmentRig() {
  return (
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 6, 0, 0]}>
        {/* Main overhead diffused studio softbox */}
        <Lightformer
          form="rect"
          intensity={1.5}
          color="#FFFFFF"
          position={[0, 6, 3]}
          rotation={[Math.PI / 2.2, 0, 0]}
          scale={[10, 4, 1]}
        />
        {/* Upper-right warm sunlight key reflection */}
        <Lightformer
          form="rect"
          intensity={1.8}
          color="#FFFDF8"
          position={[6, 4, 5]}
          rotation={[0, -Math.PI / 3, 0]}
          scale={[5, 6, 1]}
        />
        {/* Left-side soft teal rim strip for gentle bevel definition */}
        <Lightformer
          form="rect"
          intensity={1.4}
          color="#38D9C8"
          position={[-6, 1.5, 3]}
          rotation={[0, Math.PI / 2.6, 0]}
          scale={[4, 7, 1]}
        />
        {/* Ground bounce card */}
        <Lightformer
          form="rect"
          intensity={0.9}
          color="#E2F4F3"
          position={[0, -6, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[12, 12, 1]}
        />
      </group>
    </Environment>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  const monumentRef = useRef<THREE.Group>(null);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 10.6], fov: 38 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.02,
      }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <StudioEnvironmentRig />

        {/* Soft studio ambient & sky-ground hemisphere fill */}
        <ambientLight intensity={0.55} color="#FFFFFF" />
        <hemisphereLight args={["#F4FBFF", "#0A4240", 0.55]} />

        {/* Architectural Key Light from Upper Right [4.5, 7.5, 6.0] */}
        <directionalLight
          position={[4.5, 7.5, 6.0]}
          intensity={1.85}
          color="#FFFDF9"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Soft Front Fill Light */}
        <directionalLight position={[0.8, 2.8, 7.5]} intensity={0.85} color="#FFFFFF" />

        {/* Gentle Teal Rim Light for bevel contour separation */}
        <directionalLight
          position={[-5.5, -1.8, 4.5]}
          intensity={1.35}
          color="#2AD9C8"
        />

        {/* Subtle back-top rim light */}
        <directionalLight
          position={[1.5, 6.5, -5.0]}
          intensity={1.0}
          color="#D4F6FF"
        />

        {/* Float subtly in studio atmosphere */}
        <Float speed={1.3} rotationIntensity={0.06} floatIntensity={0.1}>
          <OfficialLogoMonument monumentRef={monumentRef} />
        </Float>
      </Suspense>
    </Canvas>
  );
}
