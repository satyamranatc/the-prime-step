"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { Float, MeshReflectorMaterial, Text } from "@react-three/drei";
import { useRoadmapStore } from "@/lib/roadmapStore";
import type { RoadmapCourse } from "@/lib/roadmapCourses";
import type { SceneQualityProfile } from "@/lib/webglPerformance";

function Node({
  position,
  index,
  quality,
}: {
  position: THREE.Vector3;
  index: number;
  quality: SceneQualityProfile;
}) {
  const activeNode = useRoadmapStore((state) => state.activeNode);
  const isReached = index <= activeNode;
  const color = isReached ? "#ff7b00" : "#1AAB95";
  const floatSpeed = quality.reducedMotion ? 0 : isReached ? 5 : 2;
  const radial = quality.radialSegments;

  return (
    <group position={position}>
      {/* Waypoint Base Pedestal */}
      <mesh
        receiveShadow={quality.shadows}
        castShadow={quality.shadows}
        position={[0, 0.25, 0]}
      >
        <cylinderGeometry args={[2.5, 3.0, 0.5, radial]} />
        {quality.useReflector ? (
          <meshPhysicalMaterial
            color={isReached ? "#FFFFFF" : "#E4E4E7"}
            roughness={0.1}
            metalness={0.1}
            clearcoat={1}
          />
        ) : (
          <meshStandardMaterial
            color={isReached ? "#FFFFFF" : "#E4E4E7"}
            roughness={0.18}
            metalness={0.2}
          />
        )}
      </mesh>

      {/* Luminous Waypoint Ring */}
      <mesh position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2.2, radial]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Core Sphere (desktop uses transmission; mobile uses lightweight luminous PBR) */}
      <Float
        floatIntensity={quality.reducedMotion ? 0 : isReached ? 4 : 2}
        speed={floatSpeed}
      >
        <mesh position={[0, 1.8, 0]} castShadow={quality.shadows}>
          <sphereGeometry args={[0.6, radial, radial]} />
          {quality.useTransmission ? (
            <meshPhysicalMaterial
              color="#FFFFFF"
              emissive={color}
              emissiveIntensity={isReached ? 1.5 : 0.5}
              roughness={0.2}
              transmission={0.8}
              thickness={1}
            />
          ) : (
            <meshStandardMaterial
              color="#FFFFFF"
              emissive={color}
              emissiveIntensity={isReached ? 1.35 : 0.55}
              roughness={0.14}
              metalness={0.25}
            />
          )}
        </mesh>
      </Float>
    </group>
  );
}

function createFlatRoadGeometry(
  curve: THREE.CatmullRomCurve3,
  width: number,
  segments: number,
) {
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
  quality,
}: {
  position: THREE.Vector3;
  courseTitle: string;
  numSteps: number;
  quality: SceneQualityProfile;
}) {
  const activeNode = useRoadmapStore((state) => state.activeNode);
  const isReached = activeNode >= numSteps - 1;
  const radial = quality.finaleRadialSegments;

  return (
    <group position={position}>
      <Float
        floatIntensity={quality.reducedMotion ? 0 : 2}
        speed={quality.reducedMotion ? 0 : 2}
      >
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

        <Text
          position={[0, 11, -14]}
          fontSize={2.2}
          color="#1AAB95"
          anchorX="center"
          anchorY="middle"
        >
          {isReached ? "You are Placement Ready!" : "Your Journey Awaits"}
        </Text>
      </Float>

      <mesh
        receiveShadow={quality.shadows}
        castShadow={quality.shadows}
        position={[0, 0.25, 0]}
      >
        <cylinderGeometry args={[7.5, 8.5, 0.5, radial]} />
        {quality.useReflector ? (
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.05}
            metalness={0.1}
            clearcoat={1}
          />
        ) : (
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.18} />
        )}
      </mesh>

      <mesh position={[0, 0.27, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.5, 7.2, radial]} />
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
  quality,
}: {
  course: RoadmapCourse;
  roadCurve: THREE.CatmullRomCurve3;
  quality: SceneQualityProfile;
}) {
  const numSteps = course.steps.length;
  const roadSegments = Math.max(
    quality.minRoadSegments,
    numSteps * quality.roadSegmentMultiplier,
  );

  // 1. Pristine Light Road Geometry (adaptive segment density per device tier)
  const roadGeometry = useMemo(
    () => createFlatRoadGeometry(roadCurve, 8.0, roadSegments),
    [roadCurve, roadSegments],
  );
  // 2. Soft Mint/Teal Road Border
  const borderGeo = useMemo(
    () => createFlatRoadGeometry(roadCurve, 8.4, roadSegments),
    [roadCurve, roadSegments],
  );
  // 3. Center lane dividing line
  const centerLineGeo = useMemo(
    () => createFlatRoadGeometry(roadCurve, 0.22, roadSegments),
    [roadCurve, roadSegments],
  );

  // Explicit GPU BufferGeometry disposal to prevent VRAM leaks across route changes
  useEffect(() => {
    return () => {
      roadGeometry.dispose();
      borderGeo.dispose();
      centerLineGeo.dispose();
    };
  }, [roadGeometry, borderGeo, centerLineGeo]);

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

  const endPoint = useMemo(() => roadCurve.getPointAt(1), [roadCurve]);

  return (
    <group>
      {/* 1. Pristine Highway Surface — Reflector on Desktop/Tablet, Studio Glossy PBR on Mobile */}
      <mesh
        geometry={roadGeometry}
        receiveShadow={quality.shadows}
        castShadow={quality.shadows}
        position={[0, 0, 0]}
      >
        {quality.useReflector ? (
          <MeshReflectorMaterial
            blur={[100, 100]}
            resolution={quality.reflectorResolution}
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
        ) : (
          <meshStandardMaterial
            color="#F1F5F6"
            roughness={0.18}
            metalness={0.28}
            envMapIntensity={1.15}
          />
        )}
      </mesh>

      {/* 2. Soft Mint Teal Curb Glow */}
      <mesh geometry={borderGeo} position={[0, -0.01, 0]}>
        <meshBasicMaterial
          color="#1AAB95"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Luminous Center Dividing Line */}
      <mesh geometry={centerLineGeo} position={[0, 0.01, 0]}>
        <meshBasicMaterial
          color="#1AAB95"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4. Milestones along Highway */}
      {nodePositions.map((pos, index) => (
        <Node key={index} index={index} position={pos} quality={quality} />
      ))}

      {/* 5. Grand Finale Platform */}
      <GrandFinale
        position={endPoint}
        courseTitle={course.title}
        numSteps={numSteps}
        quality={quality}
      />
    </group>
  );
}
