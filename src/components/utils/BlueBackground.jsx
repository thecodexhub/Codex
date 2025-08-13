import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uOpacity;

out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  // Create aspect ratio correction
  float aspect = uResolution.x / uResolution.y;
  vec2 centeredUv = uv - 0.5;
  centeredUv.x *= aspect;
  
  // Animation offset for the balls meeting - increased movement
  float offset = sin(uTime * 1.2) * 0.25;
  
  // Define two ball centers - wider spread for more dramatic movement
  vec2 ball1Center = vec2(-0.35 + offset, 0.0);
  vec2 ball2Center = vec2(0.35 - offset, 0.0);
  
  // Calculate distances from each ball center
  float dist1 = length(centeredUv - ball1Center);
  float dist2 = length(centeredUv - ball2Center);
  
  // Create circular gradients for each ball - bigger and softer
  float radius = 0.6;
  float softness = 0.4;
  
  float ball1Intensity = 1.0 - smoothstep(radius - softness, radius + softness, dist1);
  float ball2Intensity = 1.0 - smoothstep(radius - softness, radius + softness, dist2);
  
  // Blend the two balls together
  float combinedIntensity = max(ball1Intensity, ball2Intensity);
  
  // Create color mixing based on which ball is dominant
  vec3 ball1Color = uColorStops[0]; // First color (blue)
  vec3 ball2Color = uColorStops[2]; // Third color (light blue)
  vec3 blendColor = uColorStops[1]; // Middle color (purple)
  
  // Determine color based on ball influence
  float colorMix = ball1Intensity / (ball1Intensity + ball2Intensity + 0.001);
  vec3 ballColor = mix(ball2Color, ball1Color, colorMix);
  
  // Add purple blend in the intersection area
  float intersection = min(ball1Intensity, ball2Intensity) * 2.0;
  ballColor = mix(ballColor, blendColor, intersection);
  
  // Apply stronger pulsing effect for more visibility
  float pulse = sin(uTime * 2.0) * 0.2 + 0.8;
  combinedIntensity *= pulse;
  
  // Apply opacity
  float finalAlpha = combinedIntensity * uOpacity;
  
  vec3 finalColor = combinedIntensity * ballColor;
  
  // Premultiplied alpha output
  fragColor = vec4(finalColor * finalAlpha, finalAlpha);
}
`;

export default function AuroraBackground(props) {
  const {
    colorStops = ["#1e40af", "#7c3aed", "#3b82f6"], // Blue and purple combination
    blend = 0.5,
    opacity = 0.6, // Increased opacity for better visibility
    speed = 1.0,
    className = ""
  } = props;
  const propsRef = useRef(props);
  propsRef.current = props;

  const ctnDom = useRef(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    let program;

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener("resize", resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = colorStops.map((hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
        uOpacity: { value: opacity }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const update = (t) => {
      animateId = requestAnimationFrame(update);
      const currentTime = (propsRef.current.time ?? t * 0.001);
      const currentSpeed = propsRef.current.speed ?? speed;
      program.uniforms.uTime.value = currentTime * currentSpeed;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
      program.uniforms.uOpacity.value = propsRef.current.opacity ?? opacity;
      const stops = propsRef.current.colorStops ?? colorStops;
      program.uniforms.uColorStops.value = stops.map((hex) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [blend, opacity, speed]);

  return (
    <div 
      ref={ctnDom} 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}