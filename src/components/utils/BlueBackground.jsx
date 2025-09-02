import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

function Aurora() {
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          time: { value: 0 },
          resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        }}
        vertexShader={`
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec2 resolution;

          void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            uv -= 0.5;
            uv.x *= resolution.x / resolution.y;

            // Subtle movement
            float movementX = sin(time * 0.05) * 0.1;
            float movementY = cos(time * 0.04) * 0.1;
            uv.x += movementX;
            uv.y += movementY;

            // Distance for radial glow
            float dist = length(uv);
            float glow = smoothstep(0.5, 0.0, dist); // fade out edges

            // Aurora color mix (deep navy -> animated purple glow)
            vec3 baseColor = vec3(0.02, 0.02, 0.05); // dark navy background

            // Purple-only animated glow (no blue shifts)
            vec3 glowColor = vec3(
              0.5 + 0.2 * sin(time * 0.3),  // red channel
              0.2 + 0.1 * cos(time * 0.2),  // green (kept low)
              0.6 + 0.2 * sin(time * 0.25)  // blue channel
            );

            vec3 finalColor = mix(baseColor, glowColor, glow * 0.8);

            gl_FragColor = vec4(finalColor, 1.0);

          }
        `}
      />
    </mesh>
  );
}

export default function AuroraBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      gl={{ antialias: true }}
    >
      <Aurora />
    </Canvas>
  );
}
