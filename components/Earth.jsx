"use client";
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ScrollControls, useScroll, useGLTF } from '@react-three/drei';

function OfficeModel() {
  const { scene } = useGLTF('/images/modelisbiuras.glb');
  const meshRef = useRef();
  const scroll = useScroll();

  useFrame(() => {
    if (meshRef.current) {
      const progress = scroll.offset;
      
      // Complex rotation sequence
      let rotationX = 0;
      let rotationY = 0;
      let positionZ = 0;
      let scale = 1;

      if (progress < 0.25) {
        // Phase 1: Top-down view rotating to front
        rotationX = (Math.PI / 3) * (1 - progress * 4);
        rotationY = progress * 4 * Math.PI;
        positionZ = -2 + (progress * 4);
        scale = 1 + progress;
      } else if (progress < 0.5) {
        // Phase 2: Front to right side
        const p = (progress - 0.25) * 4;
        rotationY = Math.PI + (p * Math.PI/2);
        positionZ = -1 + p;
        scale = 1.25 + (p * 0.25);
      } else if (progress < 0.75) {
        // Phase 3: Right side to back
        const p = (progress - 0.5) * 4;
        rotationY = 1.5 * Math.PI + (p * Math.PI/2);
        positionZ = 0;
        scale = 1.5 + (p * 0.25);
      } else {
        // Phase 4: Back to left side with slight upward tilt
        const p = (progress - 0.75) * 4;
        rotationX = p * (Math.PI / 6);
        rotationY = 2 * Math.PI + (p * Math.PI/2);
        positionZ = -0.5;
        scale = 1.75 + (p * 0.25);
      }

      meshRef.current.rotation.x = rotationX;
      meshRef.current.rotation.y = rotationY;
      meshRef.current.position.z = positionZ;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      position={[-1.5, -1, -2]}
      rotation={[Math.PI / 3, 0, 0]}
    />
  );
}

export default function Earth() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} />
      <Suspense fallback={null}>
        <ScrollControls pages={3}>
          <OfficeModel />
          <OrbitControls enableZoom={false} />
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
}