"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Float, MeshReflectorMaterial, Text } from "@react-three/drei";
import { useRoadmapStore } from "@/lib/roadmapStore";
import type { RoadmapCourse } from "@/lib/roadmapCourses";

function Node({ position, index }: { position: THREE.Vector3; index: number }) {
  const activeNode = useRoadmapStore((state) => state.activeNode);
  const isReached = index <= activeNode;
  const color = isReached ? "#008080" : "#B2D8D8";
  const floatSpeed = isReached ? 5 : 2;

  return (
    <group position={position}>
      <mesh receiveShadow castShadow position={[0, 0.25, 0]}>
        <cylinderGeometry args={[2.4, 2.8, 0.45, 32]} />
        <meshPhysicalMaterial
          color={isReached ? "#FAFCFC" : "#E8EFEF"}
          roughness={0.15}
          metalness={0.1}
          clearcoat={0.8}
        />
      </mesh>

      <mesh position={[0, 0.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 2.0, 32]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      <Float floatIntensity={isReached ? 3 : 1.5} speed={floatSpeed}>
        <mesh position={[0, 1.8, 0]} castShadow>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshPhysicalMaterial
            color="#FAFCFC"
            emissive={color}
            emissiveIntensity={isReached ? 1.6 : 0.4}
            roughness={0.1}
            transmission={0.85}
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
          fontSize={7}
          color={isReached ? "#008080" : "#A0CFCF"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.06}
          outlineColor="#FAFCFC"
        >
          {courseTitle.toUpperCase()}
        </Text>

        <Text position={[0, 11, -14]} fontSize={2.2} color="#66B2B2" anchorX="center" anchorY="middle">
          {isReached ? "You are Placement Ready!" : "Your Journey Awaits"}
        </Text>
      </Float>

      <mesh receiveShadow castShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[7.5, 8.5, 0.45, 64]} />
        <meshPhysicalMaterial color="#FAFCFC" roughness={0.05} metalness={0.2} clearcoat={1} />
      </mesh>

      <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.5, 7.2, 64]} />
        <meshBasicMaterial
          color="#008080"
          transparent
          opacity={isReached ? 0.85 : 0.25}
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

  const roadGeometry = useMemo(
    () => createFlatRoadGeometry(roadCurve, 7.6, Math.max(300, numSteps * 40)),
    [roadCurve, numSteps]
  );
  const borderGeo = useMemo(
    () => createFlatRoadGeometry(roadCurve, 8.0, Math.max(300, numSteps * 40)),
    [roadCurve, numSteps]
  );
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
      <mesh geometry={roadGeometry} receiveShadow castShadow position={[0, 0, 0]}>
        <MeshReflectorMaterial
          blur={[80, 80]}
          resolution={512}
          mixBlur={1}
          mixStrength={16}
          roughness={0.35}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
          color="#F3F6F6"
          metalness={0.1}
          mirror={0.7}
        />
      </mesh>

      <mesh geometry={borderGeo} position={[0, -0.01, 0]}>
        <meshBasicMaterial color="#008080" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      <mesh geometry={centerLineGeo} position={[0, 0.01, 0]}>
        <meshBasicMaterial color="#008080" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {nodePositions.map((pos, index) => (
        <Node key={index} index={index} position={pos} />
      ))}

      <GrandFinale position={endPoint} courseTitle={course.title} numSteps={numSteps} />
    </group>
  );
}
