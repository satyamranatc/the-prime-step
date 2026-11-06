"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Float, MeshReflectorMaterial, Text } from "@react-three/drei";
import { useRoadmapStore } from "@/lib/roadmapStore";
import type { RoadmapCourse } from "@/lib/roadmapCourses";

function Node({ position, index }: { position: THREE.Vector3; index: number }) {
  const activeNode = useRoadmapStore((state) => state.activeNode);
  const isReached = index <= activeNode;
  const color = isReached ? "#00E5D8" : "#66B2B2";
  const floatSpeed = isReached ? 5 : 2;

  return (
    <group position={position}>
      {/* Waypoint Base Pedestal */}
      <mesh receiveShadow castShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[2.5, 3.0, 0.4, 32]} />
        <meshStandardMaterial
          color={isReached ? "#FFFFFF" : "#DDE6E6"}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Luminous Waypoint Ring */}
      <mesh position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2.2, 32]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Holographic Crystal Core */}
      <Float floatIntensity={isReached ? 3 : 1.5} speed={floatSpeed}>
        <mesh position={[0, 1.8, 0]} castShadow>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            emissive={color}
            emissiveIntensity={isReached ? 2.0 : 0.6}
            roughness={0.1}
            transmission={0.85}
            thickness={1}
          />
        </mesh>

        <Text
          position={[0, 3.2, 0]}
          fontSize={1.2}
          color={isReached ? "#008080" : "#66B2B2"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#FFFFFF"
        >
          {String(index + 1).padStart(2, "0")}
        </Text>
      </Float>
    </group>
  );
}

function createFlatRoadGeometry(curve: THREE.CatmullRomCurve3, width: number, segments: number) {
  const points = curve.getPoints(segments);
  const positions: number[] = [];
  const indices: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const up = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i <= segments; i++) {
    const p = points[i];
    let t: THREE.Vector3;
    if (i === segments) t = p.clone().sub(points[i - 1]).normalize();
    else if (i === 0) t = points[1].clone().sub(p).normalize();
    else t = points[i + 1].clone().sub(points[i - 1]).normalize();

    const right = new THREE.Vector3().crossVectors(t, up).normalize();
    const leftPoint = p.clone().add(right.clone().multiplyScalar(-width / 2));
    const rightPoint = p.clone().add(right.clone().multiplyScalar(width / 2));

    positions.push(leftPoint.x, leftPoint.y, leftPoint.z);
    positions.push(rightPoint.x, rightPoint.y, rightPoint.z);
    normals.push(0, 1, 0, 0, 1, 0);
    uvs.push(0, i / segments, 1, i / segments);
  }

  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = i * 2 + 1;
    const c = i * 2 + 2;
    const d = i * 2 + 3;
    indices.push(a, c, b, b, c, d);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
}

function GrandFinale({
  position,
  courseTitle,
  numSteps,
}: {
  position: THREE.Vector3;
  courseTitle: string;
  numSteps: number;
}) {
  const activeNode = useRoadmapStore((state) => state.activeNode);
  const isReached = activeNode >= numSteps - 1;

  return (
    <group position={position}>
      <Float floatIntensity={2} speed={2}>
        <Text
          position={[0, 16, -14]}
          fontSize={7}
          color={isReached ? "#008080" : "#80A8A8"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.06}
          outlineColor="#FFFFFF"
        >
          {courseTitle.toUpperCase()}
        </Text>

        <Text position={[0, 11, -14]} fontSize={2.2} color="#008080" anchorX="center" anchorY="middle">
          {isReached ? "You are Placement Ready!" : "Your Journey Awaits"}
        </Text>
      </Float>

      <mesh receiveShadow castShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[7.5, 8.5, 0.45, 64]} />
        <meshPhysicalMaterial color="#FFFFFF" roughness={0.05} metalness={0.2} clearcoat={1} />
      </mesh>

      <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.5, 7.2, 64]} />
        <meshBasicMaterial
          color="#008080"
          transparent
          opacity={isReached ? 0.9 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function RoadPath({
  course,
  roadCurve,
}: {
  course: RoadmapCourse;
  roadCurve: THREE.CatmullRomCurve3;
}) {
  const numSteps = course.steps.length;

  // Realistic highway width
  const roadGeometry = useMemo(
    () => createFlatRoadGeometry(roadCurve, 7.4, Math.max(300, numSteps * 40)),
    [roadCurve, numSteps]
  );
  // Outer road curb edge
  const borderGeo = useMemo(
    () => createFlatRoadGeometry(roadCurve, 7.8, Math.max(300, numSteps * 40)),
    [roadCurve, numSteps]
  );
  // Center lane marking
  const centerLineGeo = useMemo(
    () => createFlatRoadGeometry(roadCurve, 0.24, Math.max(300, numSteps * 40)),
    [roadCurve, numSteps]
  );

  const nodePositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const stepCount = numSteps + 1;
    for (let i = 1; i <= numSteps; i++) {
      const offset = i / stepCount;
      const cameraProgress = offset * 0.95;
      const nodeProgress = Math.min(1, cameraProgress + 0.04);
      positions.push(roadCurve.getPointAt(nodeProgress));
    }
    return positions;
  }, [numSteps, roadCurve]);

  const endPoint = roadCurve.getPointAt(1);

  return (
    <group>
      {/* 1. Outer Road Curb Strip */}
      <mesh geometry={borderGeo} position={[0, -0.015, 0]}>
        <meshStandardMaterial color="#005A5A" roughness={0.4} />
      </mesh>

      {/* 2. Main Highway Surface — Reflective Asphalt with Studio Sheen */}
      <mesh geometry={roadGeometry} receiveShadow castShadow position={[0, 0, 0]}>
        <MeshReflectorMaterial
          blur={[60, 60]}
          resolution={512}
          mixBlur={0.8}
          mixStrength={14}
          roughness={0.25}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
          color="#182226"
          metalness={0.2}
          mirror={0.65}
        />
      </mesh>

      {/* 3. Glowing Neon Center Lane Line */}
      <mesh geometry={centerLineGeo} position={[0, 0.012, 0]}>
        <meshBasicMaterial color="#00E5D8" transparent opacity={0.95} side={THREE.DoubleSide} />
      </mesh>

      {/* 4. Milestones along Highway */}
      {nodePositions.map((pos, index) => (
        <Node key={index} index={index} position={pos} />
      ))}

      {/* 5. Grand Finale Platform */}
      <GrandFinale position={endPoint} courseTitle={course.title} numSteps={numSteps} />
    </group>
  );
}
