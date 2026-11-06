"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Float, MeshReflectorMaterial, Text } from "@react-three/drei";
import { useRoadmapStore } from "@/lib/roadmapStore";
import type { RoadmapCourse } from "@/lib/roadmapCourses";

function Node({ position, index }: { position: THREE.Vector3; index: number }) {
  const activeNode = useRoadmapStore((state) => state.activeNode);
  const isReached = index <= activeNode;
  const color = isReached ? "#ff7b00" : "#1AAB95";
  const floatSpeed = isReached ? 5 : 2;

  return (
    <group position={position}>
      {/* Waypoint Base Pedestal */}
      <mesh receiveShadow castShadow position={[0, 0.25, 0]}>
        <cylinderGeometry args={[2.5, 3.0, 0.5, 32]} />
        <meshPhysicalMaterial
          color={isReached ? "#FFFFFF" : "#E4E4E7"}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
        />
      </mesh>

      {/* Luminous Waypoint Ring */}
      <mesh position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2.2, 32]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Core Sphere */}
      <Float floatIntensity={isReached ? 4 : 2} speed={floatSpeed}>
        <mesh position={[0, 1.8, 0]} castShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            emissive={color}
            emissiveIntensity={isReached ? 1.5 : 0.5}
            roughness={0.2}
            transmission={0.8}
            thickness={1}
          />
        </mesh>
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
          fontSize={6}
          color={isReached ? "#1AAB95" : "#A1A1AA"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.06}
          outlineColor="#FFFFFF"
        >
          {courseTitle.toUpperCase()}
        </Text>

        <Text position={[0, 11, -14]} fontSize={2.2} color="#1AAB95" anchorX="center" anchorY="middle">
          {isReached ? "You are Placement Ready!" : "Your Journey Awaits"}
        </Text>
      </Float>

      <mesh receiveShadow castShadow position={[0, 0.25, 0]}>
        <cylinderGeometry args={[7.5, 8.5, 0.5, 64]} />
        <meshPhysicalMaterial color="#FFFFFF" roughness={0.05} metalness={0.1} clearcoat={1} />
      </mesh>

      <mesh position={[0, 0.27, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.5, 7.2, 64]} />
        <meshBasicMaterial
          color="#1AAB95"
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

  // 1. Pristine Light Road Geometry
  const roadGeometry = useMemo(
    () => createFlatRoadGeometry(roadCurve, 8.0, Math.max(300, numSteps * 40)),
    [roadCurve, numSteps]
  );
  // 2. Soft Mint/Teal Road Border
  const borderGeo = useMemo(
    () => createFlatRoadGeometry(roadCurve, 8.4, Math.max(300, numSteps * 40)),
    [roadCurve, numSteps]
  );
  // 3. Center lane dividing line
  const centerLineGeo = useMemo(
    () => createFlatRoadGeometry(roadCurve, 0.22, Math.max(300, numSteps * 40)),
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
      {/* 1. Pristine Highway Surface — Light Reflective Pearl Sheen */}
      <mesh geometry={roadGeometry} receiveShadow castShadow position={[0, 0, 0]}>
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={512}
          mixBlur={1}
          mixStrength={20}
          roughness={0.4}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
          color="#F4F4F5"
          metalness={0.1}
          mirror={0.8}
        />
      </mesh>

      {/* 2. Soft Mint Teal Curb Glow */}
      <mesh geometry={borderGeo} position={[0, -0.01, 0]}>
        <meshBasicMaterial color="#1AAB95" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* 3. Luminous Center Dividing Line */}
      <mesh geometry={centerLineGeo} position={[0, 0.01, 0]}>
        <meshBasicMaterial color="#1AAB95" transparent opacity={0.55} side={THREE.DoubleSide} />
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
