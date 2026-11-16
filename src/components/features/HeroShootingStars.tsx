"use client";

import { useEffect, useRef } from "react";

/**
 * Real-Time WebGL Atmospheric Sky, Sculpted Volumetric White Cumulus Clouds &
 * Curling Vapor Smoke Shader for the Hero Section.
 */

const VERTEX_SHADER = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;

// Hash & 2D Quintic-Interpolated Value Noise
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  // Quintic Hermite curve for C2-continuous organic cloud gradients
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Rotation matrix between FBM octaves to eliminate grid artifacts
const mat2 m2 = mat2(0.80, -0.60, 0.60, 0.80);

// 6-Octave Fractional Brownian Motion for cumulus cloud structure
float fbm(vec2 p) {
  float f = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 6; i++) {
    f += amp * noise(p);
    p = m2 * p * 2.03 + vec2(7.13, 3.71);
    amp *= 0.5;
  }
  return f;
}

// Billowed ridge turbulence for puffy sunlit cumulus tops
float billowFbm(vec2 p) {
  float f = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    float n = noise(p);
    float b = 1.0 - abs(n * 2.0 - 1.0);
    b = pow(max(0.0, b), 1.35);
    f += amp * mix(n, b, 0.45);
    p = m2 * p * 2.05 + vec2(11.4, 5.2);
    amp *= 0.5;
  }
  return f;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

  // Subtle parallax response to cursor
  vec2 parallax = (u_mouse - 0.5) * vec2(0.035, 0.02);

  // ==========================================================
  // 1. SOFT DAYLIGHT SKY BACKDROP (SUBTLE CONTRAST SO WHITE CLOUDS STAND OUT)
  // ==========================================================
  vec3 skyZenith  = vec3(0.75, 0.87, 0.93); // #BFDEE8 soft daylight sky mist at top
  vec3 skyUpper   = vec3(0.84, 0.92, 0.96); // #D6EBF5 airy sky canvas behind clouds
  vec3 skyMid     = vec3(0.91, 0.96, 0.98); // #E8F5FA luminous pale sky
  vec3 skyHorizon = vec3(0.99, 1.00, 1.00); // #FCFFFF horizon

  float h1 = smoothstep(0.10, 0.65, uv.y);
  float h2 = smoothstep(0.45, 1.0, uv.y);
  vec3 sky = mix(skyHorizon, skyMid, smoothstep(0.0, 0.28, uv.y));
  sky = mix(sky, skyUpper, h1);
  sky = mix(sky, skyZenith, h2 * 0.90);

  // Sun position in upper-right sky
  vec2 sunPos = vec2(0.32 * aspect, 0.34) + parallax * 0.4;
  float sunDist = length(p - sunPos);

  // Warm solar aureole
  float sunBloom = exp(-sunDist * 2.4) * 0.36 + exp(-sunDist * 6.0) * 0.24;
  sky = mix(sky, vec3(1.0, 1.0, 0.99), clamp(sunBloom, 0.0, 1.0));

  // ==========================================================
  // 2. LAYER A: HIGH-ALTITUDE WISPY CIRRUS STREAKS (DRIFTING)
  // ==========================================================
  vec2 cirrusUV = vec2(uv.x * aspect * 1.35, uv.y * 2.2) + parallax * 0.25;
  cirrusUV.x -= u_time * 0.025;
  float cirrusWarp = fbm(cirrusUV * 1.6 + vec2(0.0, u_time * 0.012));
  float cirrus = fbm(cirrusUV * 2.1 + vec2(cirrusWarp * 1.4, -cirrusWarp * 0.6));
  cirrus = smoothstep(0.46, 0.76, cirrus) * smoothstep(0.22, 0.92, uv.y);
  sky = mix(sky, vec3(1.0, 1.0, 1.0), cirrus * 0.72);

  // ==========================================================
  // 3. LAYER B: SCULPTED VOLUMETRIC WHITE CUMULUS CLOUDS (CLEARLY VISIBLE & MOVING)
  // ==========================================================
  vec2 cloudUV = vec2(uv.x * aspect * 1.08, uv.y * 1.45) + parallax * 0.55;
  cloudUV.x -= u_time * 0.048; // Smooth, unmistakable horizontal cloud drift
  cloudUV.y += u_time * 0.008;

  // Domain warping for natural billowing & rolling cloud edges
  vec2 q = vec2(
    fbm(cloudUV + vec2(u_time * 0.018, u_time * 0.014)),
    fbm(cloudUV + vec2(5.2 - u_time * 0.016, 1.3 - u_time * 0.012))
  );
  vec2 warpedCloudUV = cloudUV + 0.62 * q;

  float baseCloud = billowFbm(warpedCloudUV * 1.30);
  float altitudeMask = smoothstep(0.06, 0.26, uv.y);
  // Distinct gaps between clouds (~48% sky / ~52% cloud) so you clearly see individual white cloud banks moving
  float cloudDensity = smoothstep(0.44, 0.68, baseCloud * altitudeMask + 0.05);

  // Directional self-shadowing sample toward the sun so every cloud puff has 3D top-light and underside shadow
  vec2 sunDir = normalize(sunPos - p + vec2(0.0001));
  float shadowSample = billowFbm((warpedCloudUV + sunDir * 0.105) * 1.30);
  float lightSample  = billowFbm((warpedCloudUV - sunDir * 0.065) * 1.30);
  float cloudThickness = clamp((shadowSample - baseCloud) * 3.8 + 0.48, 0.0, 1.0);
  float topHighlight   = clamp((baseCloud - lightSample) * 3.4 + 0.58, 0.0, 1.0);

  // Pure sunlit white cloud crowns + sculpted silver-dove underside shadows for unmistakable 3D volume
  vec3 cloudSunlit  = vec3(1.00, 1.00, 1.00); // #FFFFFF brilliant white sunlit top
  vec3 cloudMidTone = vec3(0.89, 0.94, 0.96); // #E3EFF5 soft sculpted mid-body
  vec3 cloudShadow  = vec3(0.71, 0.81, 0.87); // #B5CFDE realistic cumulus underside shadow

  vec3 cloudColor = mix(cloudSunlit, cloudMidTone, smoothstep(0.18, 0.68, cloudThickness));
  cloudColor = mix(cloudColor, cloudShadow, smoothstep(0.50, 0.92, cloudThickness) * 0.82);
  cloudColor = mix(cloudColor, cloudSunlit, pow(topHighlight, 1.3) * 0.72);

  // Crisp sunlit silver-lining rim around every cloud billow
  float edgeFactor = cloudDensity * (1.0 - cloudDensity) * 4.0;
  cloudColor += vec3(1.0, 1.0, 1.0) * edgeFactor * 0.45;

  vec3 scene = mix(sky, cloudColor, cloudDensity * 0.96);

  // ==========================================================
  // 4. LAYER C: FOREGROUND CURLING VAPOR SMOKE / MIST PLUMES
  // ==========================================================
  vec2 smokeUV1 = vec2(uv.x * aspect * 0.92, uv.y * 1.30) + parallax * 0.9;
  smokeUV1.x -= u_time * 0.065;
  smokeUV1.y += u_time * 0.016;

  vec2 sw1 = vec2(
    fbm(smokeUV1 * 1.45 + vec2(u_time * 0.028, 2.1)),
    fbm(smokeUV1 * 1.45 + vec2(-u_time * 0.024, 8.7))
  );
  float smoke1 = fbm(smokeUV1 * 1.75 + sw1 * 1.25);

  vec2 smokeUV2 = vec2(uv.x * aspect * 1.22, uv.y * 1.45) - parallax * 0.6;
  smokeUV2.x -= u_time * 0.048;
  smokeUV2.y -= u_time * 0.018;
  float smoke2 = fbm(smokeUV2 * 1.85 + sw1.yx * 1.05);

  float combinedSmoke = smoothstep(0.45, 0.78, (smoke1 * 0.58 + smoke2 * 0.42));
  float smokeContour = combinedSmoke * (1.0 - combinedSmoke) * 3.8;
  vec3 smokeBody = mix(vec3(0.84, 0.91, 0.95), vec3(1.0, 1.0, 1.0), combinedSmoke);
  scene = mix(scene, vec3(0.78, 0.87, 0.92), smokeContour * 0.32);
  scene = mix(scene, smokeBody, combinedSmoke * 0.48);

  // ==========================================================
  // 5. READABILITY VEIL FOR LEFT-SIDE TYPOGRAPHY & BOTTOM SEAM
  // ==========================================================
  float leftTextGuard = smoothstep(0.54, 0.05, uv.x) * smoothstep(0.85, 0.22, uv.y);
  scene = mix(scene, vec3(0.99, 0.997, 1.0), leftTextGuard * 0.25);

  // Bottom horizon dissolve into pure #FFFFFF paper so the TrustStrip transition is seamless
  float bottomFade = smoothstep(0.0, 0.13, uv.y);
  scene = mix(vec3(1.0, 1.0, 1.0), scene, bottomFade);

  gl_FragColor = vec4(scene, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function HeroShootingStars({ active = true }: { active?: boolean }) {
  const skyCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const skyCanvas = skyCanvasRef.current;
    if (!skyCanvas || !active) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gl =
      skyCanvas.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false }) ||
      (skyCanvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    let program: WebGLProgram | null = null;
    let posBuffer: WebGLBuffer | null = null;
    let uTimeLoc: WebGLUniformLocation | null = null;
    let uResLoc: WebGLUniformLocation | null = null;
    let uMouseLoc: WebGLUniformLocation | null = null;

    if (gl) {
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      if (vs && fs) {
        program = gl.createProgram();
        if (program) {
          gl.attachShader(program, vs);
          gl.attachShader(program, fs);
          gl.linkProgram(program);
          if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.useProgram(program);
            posBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
              gl.STATIC_DRAW
            );
            const aPos = gl.getAttribLocation(program, "a_pos");
            gl.enableVertexAttribArray(aPos);
            gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

            uTimeLoc = gl.getUniformLocation(program, "u_time");
            uResLoc = gl.getUniformLocation(program, "u_res");
            uMouseLoc = gl.getUniformLocation(program, "u_mouse");
          }
        }
      }
    }

    const skyScale = 0.65;

    const resize = () => {
      const rect = skyCanvas.parentElement?.getBoundingClientRect();
      const width = rect ? rect.width : window.innerWidth;
      const height = rect ? rect.height : window.innerHeight;

      const glW = Math.max(1, Math.floor(width * skyScale));
      const glH = Math.max(1, Math.floor(height * skyScale));
      skyCanvas.width = glW;
      skyCanvas.height = glH;
      if (gl && program) {
        gl.viewport(0, 0, glW, glH);
        if (uResLoc) gl.uniform2f(uResLoc, glW, glH);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / Math.max(1, window.innerWidth);
      pointer.ty = 1.0 - e.clientY / Math.max(1, window.innerHeight);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let rafId = 0;
    const startTime = performance.now();
    let lastTime = startTime;

    const renderFrame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;
      const elapsed = (now - startTime) * 0.001;

      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3.5);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3.5);

      if (gl && program) {
        if (uTimeLoc) gl.uniform1f(uTimeLoc, elapsed);
        if (uMouseLoc) gl.uniform2f(uMouseLoc, pointer.x, pointer.y);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      if (!calm) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame(performance.now());

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      if (gl) {
        if (posBuffer) gl.deleteBuffer(posBuffer);
        if (program) gl.deleteProgram(program);
      }
    };
  }, [active]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
    >
      <canvas ref={skyCanvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
