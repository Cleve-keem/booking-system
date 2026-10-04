"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import type { Mesh } from "three";

const MAT = {
  white: { color: "#f4f4f4", roughness: 0.28, metalness: 0.05 },
  black: { color: "#060606", roughness: 0.35, metalness: 0.2 },
  steel: { color: "#d9d9d9", roughness: 0.22, metalness: 1 },
  darkSteel: { color: "#8a8a8a", roughness: 0.3, metalness: 1 },
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const on = () => setReduced(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduced;
}

function Clipper({ animate }: { animate: boolean }) {
  const cutter = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (animate && cutter.current)
      cutter.current.position.x = Math.sin(clock.elapsedTime * 20) * 0.03;
  });
  const teeth = useMemo(
    () => Array.from({ length: 14 }, (_, i) => (i - 6.5) * 0.082),
    [],
  );

  return (
    <group position={[0, -0.55, 0]} rotation={[0.1, 0, -0.1]}>
      {/* Body */}
      <RoundedBox args={[1.1, 3.4, 0.9]} radius={0.38} smoothness={8}>
        <meshStandardMaterial {...MAT.white} />
      </RoundedBox>
      {/* Front face plate and power switch */}
      <RoundedBox
        args={[0.82, 1.5, 0.1]}
        radius={0.06}
        smoothness={4}
        position={[0, -0.25, 0.44]}
      >
        <meshStandardMaterial {...MAT.black} />
      </RoundedBox>
      <RoundedBox
        args={[0.22, 0.5, 0.09]}
        radius={0.06}
        smoothness={4}
        position={[0, 0.2, 0.5]}
      >
        <meshStandardMaterial {...MAT.white} />
      </RoundedBox>
      {/* Grip bands */}
      {[-1.4, -1.25].map((y) => (
        <RoundedBox
          key={y}
          args={[1.14, 0.08, 0.94]}
          radius={0.04}
          smoothness={4}
          position={[0, y, 0]}
        >
          <meshStandardMaterial {...MAT.black} />
        </RoundedBox>
      ))}
      {/* Blade housing */}
      <RoundedBox
        args={[1.2, 0.5, 0.85]}
        radius={0.14}
        smoothness={6}
        position={[0, 1.95, 0]}
      >
        <meshStandardMaterial {...MAT.black} />
      </RoundedBox>
      {/* Fixed blade with comb teeth */}
      <mesh position={[0, 2.32, 0.3]}>
        <boxGeometry args={[1.18, 0.34, 0.07]} />
        <meshStandardMaterial {...MAT.steel} />
      </mesh>
      {teeth.map((x) => (
        <mesh key={x} position={[x, 2.55, 0.3]}>
          <boxGeometry args={[0.06, 0.16, 0.07]} />
          <meshStandardMaterial {...MAT.steel} />
        </mesh>
      ))}
      {/* Moving cutter */}
      <mesh ref={cutter} position={[0, 2.27, 0.36]}>
        <boxGeometry args={[1.06, 0.26, 0.05]} />
        <meshStandardMaterial {...MAT.darkSteel} />
      </mesh>
      {/* Taper lever */}
      <RoundedBox
        args={[0.1, 0.28, 0.2]}
        radius={0.04}
        smoothness={4}
        position={[0.66, 1.9, 0]}
      >
        <meshStandardMaterial {...MAT.white} />
      </RoundedBox>
    </group>
  );
}

function TouchScroll() {
  const el = useThree((s) => s.gl.domElement);
  useEffect(() => {
    el.style.touchAction = "pan-y";
  }, [el]);
  return null;
}

export default function ClipperScene() {
  const reduced = usePrefersReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className="absolute inset-0"
      role="img"
      aria-label="Interactive 3D hair clipper. Drag to rotate it."
    >
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0.3, 11], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={5}
            position={[0, 6, 4]}
            scale={[12, 4, 1]}
          />
          <Lightformer
            form="rect"
            intensity={3}
            position={[-6, 1, 2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[8, 6, 1]}
          />
          <Lightformer
            form="rect"
            intensity={3}
            position={[6, 1, 2]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[8, 6, 1]}
          />
          <Lightformer
            form="ring"
            intensity={2}
            position={[0, 0, -6]}
            scale={6}
          />
        </Environment>
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 5, 6]} intensity={1.1} />

        <Float speed={1.4} rotationIntensity={0} floatIntensity={0.5}>
          <Clipper animate={!reduced} />
        </Float>

        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.9}
          autoRotate={!reduced}
          autoRotateSpeed={1.4}
        />
        <TouchScroll />
      </Canvas>
    </div>
  );
}
