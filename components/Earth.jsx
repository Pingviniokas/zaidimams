"use client";
import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { useTransform } from 'framer-motion';

const MODEL_PATH = 'images/modelisbiuras.glb';
useGLTF.preload(MODEL_PATH);

function OfficeModel({ progress }) {
  const { scene } = useGLTF(MODEL_PATH);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const meshRef = useRef();
  
  const modelProgress = useTransform(progress, [0, 0.3], [0, 1]);

  useFrame(() => {
    if (meshRef.current) {
      const currentProgress = modelProgress.get();
      
      // Clean 360-degree rotation around the building
      const rotationY = currentProgress * Math.PI * 2;
      
      // Smooth zoom effect - starts further out, zooms in slightly
      const zPosition = -3 + currentProgress;
      
      // Subtle tilt as it rotates
      const rotationX = Math.PI / 6 + (currentProgress * Math.PI / 12);

      meshRef.current.rotation.x = rotationX;
      meshRef.current.rotation.y = rotationY;
      meshRef.current.position.z = zPosition;
      meshRef.current.scale.setScalar(1 + currentProgress * 0.2);
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={clonedScene}
      position={[-1.5, -1, -2]}
      rotation={[Math.PI / 3, 0, 0]}
      dispose={null}
    />
  );
}

export default function Earth({ progress }) {
  return (
    <Canvas 
      style={{ position: 'absolute', width: '50%', height: '100%', left: 0 }}
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
        <OfficeModel progress={progress} />
      </Suspense>
    </Canvas>
  );
}
