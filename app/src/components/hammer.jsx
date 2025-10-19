// LadyJusticeSTL.jsx
"use client"

import React, { Suspense, useRef } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import { MeshStandardMaterial } from "three"

function STLModel({ url }) {
  const geometry = useLoader(STLLoader, url)
  const mesh = useRef()

  return (
    <mesh ref={mesh} geometry={geometry} position={[0, -1, 0]}>
      <meshStandardMaterial color="lightgray" />
    </mesh>
  )
}

export default function LadyJusticeSTLPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#222" }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} />

        <Suspense fallback={null}>
          <STLModel url="/statue2\source\DEWI KEADILAN YUNANI (REXEL ID)\DEWI KEADILAN YUNANI (REXEL ID).stl" />
        </Suspense>

        <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  )
}
