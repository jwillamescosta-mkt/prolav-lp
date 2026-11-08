// Cena three.js do hero: bolhas de espuma e gotas em ciano com parallax de mouse e scroll.
// Carregado sob demanda (React.lazy) para não atrasar o LCP.
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = { count: number; lite: boolean };

function Bubbles({ count }: { count: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Posições e velocidades geradas uma única vez
  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 10,
        z: -Math.random() * 12,
        s: 0.05 + Math.random() * 0.28,
        v: 0.15 + Math.random() * 0.35,
        p: Math.random() * Math.PI * 2,
      })),
    [count],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    data.forEach((b, i) => {
      b.y += b.v * dt;
      if (b.y > 6) b.y = -6;
      dummy.position.set(b.x + Math.sin(t * 0.6 + b.p) * 0.3, b.y, b.z);
      dummy.scale.setScalar(b.s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;

    // Parallax suave do mouse + câmera avança com o scroll
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    const cam = state.camera;
    cam.position.x += (state.pointer.x * 0.8 - cam.position.x) * 0.04;
    cam.position.y += (state.pointer.y * 0.5 - cam.position.y) * 0.04;
    cam.position.z += (6 - scroll * 2.5 - cam.position.z) * 0.08;
    cam.lookAt(0, 0, -4);
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshPhysicalMaterial
        color="#7dd3fc"
        emissive="#06b6d4"
        emissiveIntensity={0.25}
        roughness={0.1}
        transmission={0.6}
        transparent
        opacity={0.55}
      />
    </instancedMesh>
  );
}

export default function HeroScene({ count, lite }: Props) {
  return (
    <Canvas
      dpr={lite ? 1 : [1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "low-power" }}
      onCreated={(s) => s.gl.domElement.parentElement?.parentElement?.setAttribute("data-scene-ready", "")}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} color="#e0f2fe" />
      <pointLight position={[-4, -2, 2]} intensity={8} color="#0ea5e9" />
      <Bubbles count={count} />
    </Canvas>
  );
}
