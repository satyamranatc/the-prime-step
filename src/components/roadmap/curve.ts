import * as THREE from "three";

// Generate an organic, winding 3D road path based on the number of steps in the course
export function generateRoadCurve(numSteps: number) {
  const points: THREE.Vector3[] = [];
  points.push(new THREE.Vector3(0, 0, 10)); // Origin start
  points.push(new THREE.Vector3(0, 0, -10)); // Hero section

  let z = -40;

  for (let i = 0; i < numSteps; i++) {
    const naturalSway = Math.sin(i * 1.5) * 20;
    const randomWobble = Math.cos(i * 0.9) * 10;
    const x = naturalSway + randomWobble;

    points.push(new THREE.Vector3(x, 0, z));
    z -= 48; // Consistent spacing prevents self-intersection & crease
  }

  // Smooth final straight approach for grand finale
  points.push(new THREE.Vector3(0, 0, z - 20));
  points.push(new THREE.Vector3(0, 0, z - 45));

  return new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5);
}
