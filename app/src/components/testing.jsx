// components/LoaderOverlay.jsx
import React, { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function RotatingBox({ position, speed, color }) {
  const ref = React.useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed;
      ref.current.rotation.y += delta * speed;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export const LoaderOverlay = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Glass background */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* 3D Loader */}
      <div className="w-[200px] h-[200px] relative">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={2} />

          {/* Stacked rotating boxes */}
          <RotatingBox position={[0, 0, 0]} speed={1} color={"#6366F1"} />
          <RotatingBox position={[1.5, 1.5, 0]} speed={-1} color={"#4F46E5"} />
          <RotatingBox position={[-1.5, -1.5, 0]} speed={1.5} color={"#4338CA"} />
        </Canvas>
      </div>
    </div>
  );
};


export default LoaderOverlay;
