// "Teste da gota" em three.js: metade esquerda absorve (mancha), metade direita está blindada (gota perolada).
// Carregado sob demanda e só montado quando visível (ver DropLab.tsx).
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

const W = 12; // largura do tecido (x: -6..6), maior que o enquadramento para preencher a tela
const D = 9; // profundidade (z: -4.5..4.5)
const POOL = 64;

type Drop = { on: boolean; x: number; z: number; y: number; vy: number; s: number; t: number; landed: boolean };
type Stain = { x: number; z: number; r: number; max: number };

/** Textura de trama de linho gerada em canvas (sem imagem externa). */
function makeFabric() {
  const c = document.createElement("canvas");
  c.width = 1024; c.height = 576;
  const g = c.getContext("2d")!;
  g.fillStyle = "#d8cdbb"; g.fillRect(0, 0, c.width, c.height);
  // Trama visível: fios horizontais escuros + verticais claros, com variação de espessura
  for (let y = 0; y < c.height; y += 4) { g.fillStyle = `rgba(110,90,60,${0.1 + Math.random() * 0.12})`; g.fillRect(0, y, c.width, 1 + (Math.random() > 0.8 ? 1 : 0)); }
  for (let x = 0; x < c.width; x += 4) { g.fillStyle = `rgba(255,250,240,${0.08 + Math.random() * 0.1})`; g.fillRect(x, 0, 1 + (Math.random() > 0.8 ? 1 : 0), c.height); }
  for (let i = 0; i < 2500; i++) { g.fillStyle = `rgba(90,70,45,${Math.random() * 0.08})`; g.fillRect(Math.random() * c.width, Math.random() * c.height, 2, 1); }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1.5, 2.6); // trama fina e sem esticar
  return t;
}

type Pour = { side: -1 | 1; n: number };

function Lab({ lite, pour }: { lite: boolean; pour?: Pour | undefined }) {
  const fabric = useMemo(makeFabric, []);
  // Canvas de manchas cobrindo só a metade esquerda
  const stainCanvas = useMemo(() => { const c = document.createElement("canvas"); c.width = 512; c.height = 768; return c; }, []);
  const stainTex = useMemo(() => new THREE.CanvasTexture(stainCanvas), [stainCanvas]);
  const drops = useRef<Drop[]>(Array.from({ length: POOL }, () => ({ on: false, x: 0, z: 0, y: 0, vy: 0, s: 0.1, t: 0, landed: false })));
  const stains = useRef<Stain[]>([]);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const auto = useRef({ timer: 0, side: 1, pausedUntil: 0, now: 0 });

  const spawn = (x: number, z: number, s: number, delay = 0) => {
    const d = drops.current.find((p) => !p.on) ?? drops.current[0]!;
    Object.assign(d, { on: true, x, z, y: 2.6 + delay, vy: 0, s, t: 0, landed: false });
  };
  // Um "respingo": gota principal + gotículas em volta, como nos vídeos reais.
  // As gotículas não cruzam a linha divisória, para cada metade mostrar só o próprio efeito.
  const splash = (x: number, z: number) => {
    const side = Math.sign(x) || 1;
    spawn(x, z, 0.16 + Math.random() * 0.1);
    const n = 2 + Math.floor(Math.random() * 4);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, r = 0.25 + Math.random() * 0.55;
      const sx = x + Math.cos(a) * r;
      spawn(Math.sign(sx) === side ? sx : x, z + Math.sin(a) * r * 0.7, 0.05 + Math.random() * 0.07, 0.3 + Math.random() * 0.6);
    }
  };

  // Botões acessíveis (fora do canvas) pedem um respingo em um dos lados
  useEffect(() => {
    if (!pour || pour.n === 0) return;
    auto.current.pausedUntil = auto.current.now + 8;
    splash(pour.side * (0.5 + Math.random() * (lite ? 1.2 : 2.2)), (Math.random() - 0.5) * 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pour?.n]);

  const drawStains = () => {
    const g = stainCanvas.getContext("2d")!;
    g.clearRect(0, 0, stainCanvas.width, stainCanvas.height);
    for (const s of stains.current) {
      const u = ((s.x + W / 2) / (W / 2)) * stainCanvas.width;
      const v = ((s.z + D / 2) / D) * stainCanvas.height;
      const r = (s.r / (W / 2)) * stainCanvas.width;
      const grd = g.createRadialGradient(u, v, r * 0.2, u, v, r);
      grd.addColorStop(0, "rgba(92,70,42,0.42)"); grd.addColorStop(0.75, "rgba(92,70,42,0.3)"); grd.addColorStop(1, "rgba(92,70,42,0)");
      g.fillStyle = grd; g.beginPath(); g.ellipse(u, v, r, r * 0.92, 0.3, 0, Math.PI * 2); g.fill();
    }
    stainTex.needsUpdate = true;
  };

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const now = state.clock.elapsedTime;
    // Demonstração automática: pinga dos dois lados até a pessoa interagir
    const a = auto.current;
    a.now = now;
    a.timer += dt;
    if (now > a.pausedUntil && a.timer > 0.85) {
      a.timer = 0; a.side *= -1;
      // No celular o enquadramento é estreito: pinga mais perto do centro
      const spread = lite ? 1.3 : 2.6;
      splash(a.side * (0.4 + Math.random() * spread), (Math.random() - 0.5) * 2.4);
    }
    let stainsChanged = false;
    drops.current.forEach((d, i) => {
      const m = meshes.current[i];
      if (!m) return;
      if (!d.on) { m.visible = false; return; }
      m.visible = true;
      d.t += dt;
      if (!d.landed) {
        d.vy -= 14 * dt; d.y += d.vy * dt;
        if (d.y <= d.s * 0.55) {
          d.landed = true; d.t = 0; d.y = d.s * 0.55;
          if (d.x < 0) { stains.current.push({ x: d.x, z: d.z, r: 0.05, max: d.s * 4.2 }); if (stains.current.length > 40) stains.current.shift(); }
        }
        m.position.set(d.x, d.y, d.z); m.scale.set(d.s * 0.85, d.s * 1.25, d.s * 0.85);
        return;
      }
      if (d.x < 0) {
        // Sem blindagem: a gota afunda no tecido em ~0,3 s
        const k = Math.max(0, 1 - d.t / 0.3);
        m.scale.set(d.s * (1 + (1 - k)), d.s * 0.55 * k, d.s * (1 + (1 - k)));
        if (k === 0) d.on = false;
      } else {
        // Com blindagem: gota perolada que balança, escorre devagar e evapora
        const wob = Math.sin(d.t * 18) * Math.exp(-d.t * 4) * 0.25;
        d.z += dt * 0.05;
        const fade = d.t > 12 ? Math.max(0, 1 - (d.t - 12) / 1.5) : 1;
        m.position.set(d.x, d.s * 0.55 * fade, d.z);
        m.scale.set(d.s * (1 + wob) * fade, d.s * 0.55 * (1 - wob) * fade, d.s * (1 + wob) * fade);
        if (fade === 0) d.on = false;
      }
    });
    for (const s of stains.current) if (s.r < s.max) { s.r = Math.min(s.max, s.r + dt * 0.9); stainsChanged = true; }
    if (stainsChanged) drawStains();
    // Leve parallax de câmera com o ponteiro
    const cam = state.camera;
    cam.position.x += (state.pointer.x * 0.5 - cam.position.x) * 0.03;
    cam.lookAt(0, 0, 0.2);
  });

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    auto.current.pausedUntil = auto.current.now + 8; // pausa a demonstração por 8 s após cada toque
    splash(e.point.x, e.point.z);
  };

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 6, 4]} intensity={1.6} />
      <pointLight position={[-3, 2.5, 3]} intensity={6} color="#cfe6ff" />
      {/* Tecido: metade comum + metade blindada (levemente mais acetinada) */}
      <mesh rotation-x={-Math.PI / 2} position={[-W / 4, 0, 0]} onPointerDown={onDown}>
        <planeGeometry args={[W / 2, D]} />
        <meshStandardMaterial map={fabric} roughness={1} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[W / 4, 0, 0]} onPointerDown={onDown}>
        <planeGeometry args={[W / 2, D]} />
        <meshStandardMaterial map={fabric} roughness={0.78} color="#f4efe6" />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[-W / 4, 0.003, 0]}>
        <planeGeometry args={[W / 2, D]} />
        <meshBasicMaterial map={stainTex} transparent depthWrite={false} />
      </mesh>
      {/* Linha divisória */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.005, 0]}>
        <planeGeometry args={[0.015, D]} />
        <meshBasicMaterial color="#0E2F66" />
      </mesh>
      {drops.current.map((_, i) => (
        <mesh key={i} ref={(m) => { meshes.current[i] = m; }} visible={false}>
          <sphereGeometry args={[1, lite ? 16 : 32, lite ? 12 : 24]} />
          {lite ? (
            <meshStandardMaterial color="#7cc0ff" transparent opacity={0.75} roughness={0.05} metalness={0.1} />
          ) : (
            <meshPhysicalMaterial color="#8ccaff" roughness={0.03} clearcoat={1} clearcoatRoughness={0.05} transparent opacity={0.82} ior={1.33} specularIntensity={1} />
          )}
        </mesh>
      ))}
    </>
  );
}

export default function DropLabScene({ lite = false, pour }: { lite?: boolean; pour?: Pour }) {
  return (
    <Canvas dpr={lite ? 1 : [1, 1.75]} camera={{ position: [0, 4.1, 4.3], fov: 40 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} style={{ cursor: "crosshair", touchAction: "pan-y" }}>
      <Lab lite={lite} pour={pour} />
    </Canvas>
  );
}
