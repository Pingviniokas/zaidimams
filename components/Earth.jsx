"use client";
import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useTransform, animate } from "framer-motion";

const MODEL_PATH = "images/modelisnamukas.glb";
useGLTF.preload(MODEL_PATH);

function OfficeModel({ progress }) {
  const { scene } = useGLTF(MODEL_PATH);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const meshRef = useRef();

  // Starting position and rotation
  const startPosition = { x: -0.419, y: -0.17024, z: 1 };
  const startRotation = { x: -0.25, y: 0, z: 0 };

  // Restrict rotation to a small range
  const rotationProgress = useTransform(progress, [0, 1], [-0.3, 0.3]); // Limited rotation range
  const scaleProgress = useTransform(progress, [0, 1], [1, 1.5]); // Subtle zoom

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(startPosition.x, startPosition.y, startPosition.z);

      // Apply limited Y-axis rotation
      meshRef.current.rotation.set(
        startRotation.x,
        rotationProgress.get(), // Small rotation effect
        startRotation.z
      );

      // Apply zoom effect
      const scale = scaleProgress.get();
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return <primitive ref={meshRef} object={clonedScene} dispose={null} />;
}

export default function Earth({ progress }) {
  return (
    <Canvas
      style={{ position: "absolute", width: "50%", height: "100%", left: 0 }}
      camera={{ position: [0, 2, 5] }}
    >
      <Environment preset="city" />
      <ambientLight intensity={0.8} />
      <directionalLight position={[-5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <OfficeModel progress={progress} />
      </Suspense>
    </Canvas>
  );
}
