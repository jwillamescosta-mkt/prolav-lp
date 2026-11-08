import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { PROBLEM } from "@/data/content";

type Props = { progress?: MotionValue<number> | undefined; stage?: number | undefined; lite?: boolean };

// Trama procedural: fios cruzados, sem imagem externa nem textura pesada.
const fragmentShader = `
uniform vec3 fabricColor;
varying vec2 vUv;
void main() {
  vec2 grid = vUv * 160.0;
  float warp = pow(abs(sin(grid.x * 3.14159)), 0.6);
  float weft = pow(abs(sin(grid.y * 3.14159)), 0.6);
  float crossing = mod(floor(grid.x) + floor(grid.y), 2.0);
  float weave = mix(warp, weft, crossing);
  float grain = sin(grid.x * 26.0) * sin(grid.y * 22.0) * 0.025;
  gl_FragColor = vec4(fabricColor * (0.66 + weave * 0.34 + grain), 1.0);
}`;
const vertexShader = `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;

function Interior({ progress, stage = 0, lite }: Props) {
  const cloth = useRef<THREE.Mesh>(null);
  const particles = useRef<THREE.InstancedMesh>(null);
  const labels = useRef<THREE.Group>(null);
  const object = useMemo(() => new THREE.Object3D(), []);
  const colors = useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    // Three.js recebe valores sRGB convertidos dos tokens sem duplicar a paleta.
    const resolve = (name: string) => {
      const element = document.createElement("span");
      element.style.color = css.getPropertyValue(name); document.body.appendChild(element);
      const color = getComputedStyle(element).color; element.remove();
      // Canvas 2D converte oklch em sRGB para a biblioteca de cena.
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return new THREE.Color();
      ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1);
      const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 0, 1, 1).data;
      return new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
    };
    return { cloth: resolve("--fabric"), dust: resolve("--dust"), fiber: resolve("--fiber") };
  }, []);
  const data = useMemo(() => Array.from({ length: lite ? 35 : 100 }, (_, i) => ({ x: Math.sin(i * 127.1) * 3.7, y: Math.cos(i * 43.7) * 2.6, z: -0.8 - (i % 7) * 0.45, scale: 0.018 + (i % 5) * 0.008 })), [lite]);
  useFrame(({ camera, clock, pointer }) => {
    const p = progress?.get() ?? (stage === 0 ? 0.1 : 0.5);
    const penetration = THREE.MathUtils.smoothstep(p, 0.18, 0.54);
    camera.position.z = 4.2 - penetration * 5.2;
    camera.position.x += (pointer.x * 0.15 - camera.position.x) * 0.04;
    if (cloth.current) { cloth.current.visible = p < 0.41; cloth.current.scale.setScalar(1 + penetration * 0.3); }
    if (labels.current) labels.current.visible = p >= 0.33 && p < 0.67;
    const mesh = particles.current;
    if (!mesh) return;
    data.forEach((d, index) => {
      object.position.set(d.x + Math.sin(clock.elapsedTime * 0.3 + index) * 0.09, d.y + Math.cos(clock.elapsedTime * 0.2 + index) * 0.06, d.z);
      object.scale.setScalar(d.scale); object.rotation.set(index, clock.elapsedTime * 0.1, index * 0.3); object.updateMatrix(); mesh.setMatrixAt(index, object.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });
  return <>
    <ambientLight intensity={1.5} />
    <mesh ref={cloth} position={[0, 0, 0]} rotation={[0, 0, -0.12]}><planeGeometry args={[14, 11]} /><shaderMaterial uniforms={{ fabricColor: { value: colors.cloth } }} vertexShader={vertexShader} fragmentShader={fragmentShader} side={THREE.DoubleSide} /></mesh>
    {/* Fibras abstratas: nunca representam insetos. */}
    {Array.from({ length: lite ? 12 : 30 }, (_, i) => <mesh key={i} position={[Math.sin(i * 3.1) * 4, Math.cos(i * 5.7) * 3, -1.1 - (i % 6) * 0.42]} rotation={[0, 0, i * 1.7]}><cylinderGeometry args={[0.013, 0.025, 2.6, 5]} /><meshStandardMaterial color={colors.fiber} transparent opacity={0.28} /></mesh>)}
    <instancedMesh ref={particles} args={[undefined, undefined, data.length]}><icosahedronGeometry args={[1, 0]} /><meshStandardMaterial color={colors.dust} roughness={1} /></instancedMesh>
    <group ref={labels}>{stage === 1 && PROBLEM.contaminants.map((label, i) => <group key={label} position={[[0.4, 0.66, 0.45, 0.72, 0.65][i] ?? 0, [0.5, 0.22, -0.27, -0.5, 0][i] ?? 0, -3.8]}><mesh><icosahedronGeometry args={[0.02, 0]} /><meshStandardMaterial color={colors.dust} /></mesh><Html center distanceFactor={3} zIndexRange={[1, 0]}><span className="xray-label">{label}</span></Html></group>)}</group>
  </>;
}

export default function SofaXrayScene(props: Props) {
  return <Canvas dpr={props.lite ? 1 : [1, 1.5]} camera={{ position: [0, 0, 4.2], fov: 50 }} gl={{ alpha: true, antialias: !props.lite, powerPreference: "low-power" }}><Interior {...props} /></Canvas>;
}