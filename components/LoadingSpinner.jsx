"use client";
import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { useTransform } from 'framer-motion';

const MODEL_PATH = '/images/modelisbiuras.glb';
useGLTF.preload(MODEL_PATH);

function RightOfficeModel({ progress }) {
  const { scene } = useGLTF(MODEL_PATH);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const meshRef = useRef();
  
  const modelProgress = useTransform(progress, [0.3, 1], [0, 1]);

  useFrame(() => {
    if (meshRef.current) {
      const currentProgress = modelProgress.get();
      
      // Mirror of left side animation but from right
      const yPosition = 2 - currentProgress * 3;
      const rotationY = -currentProgress * Math.PI * 0.5; // Opposite rotation
      const zPosition = -4 + currentProgress * 2;
      const scale = 1 + (1 - currentProgress) * 0.3;

      meshRef.current.position.y = yPosition;
      meshRef.current.position.z = zPosition;
      meshRef.current.rotation.y = rotationY;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={clonedScene}
      position={[1.5, -1, -2]}
      rotation={[Math.PI / 3, 0, 0]}
      dispose={null}
    />
  );
}

export default function RightEarth({ progress }) {
  return (
    <Canvas 
      style={{ position: 'absolute', width: '50%', height: '100%', right: 0 }}
      camera={{ position: [0, 2, 5] }}
    >
      <Environment preset="city" />
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <directionalLight position={[-5, 5, 5]} intensity={1} color="#fff" />
      <spotLight
        position={[5, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#ffffff"
      />
      <Suspense fallback={null}>
        <RightOfficeModel progress={progress} />
      </Suspense>
    </Canvas>
  );
}
