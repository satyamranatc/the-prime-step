"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

export default function CameraRig({
  roadCurve,
}: {
  roadCurve: THREE.CatmullRomCurve3;
}) {
  const scroll = useScroll();
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));
  const tempVec = useRef(new THREE.Vector3());
  const tempLook = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const rawOffset = scroll.offset;
    if (isNaN(rawOffset)) return;

    const curveProgress = rawOffset * 0.95;
    const currentPoint = roadCurve.getPointAt(curveProgress);

    const lookAheadProgress = Math.min(1, curveProgress + 0.05);
    const lookAheadPoint = roadCurve.getPointAt(lookAheadProgress);

    const tangent = roadCurve.getTangentAt(curveProgress).normalize();

    const heightOffset = 5.5;
    const backOffset = 11;

    tempVec.current.set(
      currentPoint.x - tangent.x * backOffset,
      currentPoint.y + heightOffset,
      currentPoint.z - tangent.z * backOffset
    );

    state.camera.position.lerp(tempVec.current, delta * 5);

    tempLook.current.set(lookAheadPoint.x, lookAheadPoint.y + 1, lookAheadPoint.z);

    cameraTarget.current.lerp(tempLook.current, delta * 5);
    state.camera.lookAt(cameraTarget.current);
  });

  return null;
}

