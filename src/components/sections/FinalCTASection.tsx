"use client";

import { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, useGLTF, Center, Html, useProgress, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 bg-white/90 border border-black/5 px-6 py-4 rounded-2xl shadow-xl backdrop-blur-md min-w-[220px] text-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] font-black tracking-widest text-black uppercase block">
          LOADING FUTURISTIC 3D MODEL
        </span>
        <span className="text-[11px] font-black text-black/50 block">
          {Math.round(progress)}% COMPLETE
        </span>
      </div>
    </Html>
  );
}

function FuturisticSneaker() {
  const { scene } = useGLTF("/futuristic sneaker 3d model.glb");
  const modelRef = useRef<THREE.Group>(null);

  // Traverse the scene to ensure shadows are enabled on all child meshes
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  // Continuous rotation and subtle floating effect on Y-axis
  useFrame((state, delta) => {
    if (modelRef.current) {
      // Adjust rotation speed: delta is time elapsed since last frame
      modelRef.current.rotation.y += delta * 0.25;
      modelRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group ref={modelRef} dispose={null}>
      <primitive object={scene} scale={2.8} />
    </group>
  );
}

export default function FinalCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(containerRef);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  if (isInView && !hasBeenVisible) {
    setHasBeenVisible(true);
  }

  return (
    <section ref={containerRef} className="h-screen w-full bg-[#f8f8f8] text-black relative flex items-center justify-center overflow-hidden border-t border-black/5">
      
      {/* Big typography overlapping (Behind the 3D model) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
        <h2 className="text-[14vw] leading-[0.85] font-black tracking-tighter uppercase text-center select-none text-black/10">
          STEP INTO
        </h2>
        <h2 className="text-[14vw] leading-[0.85] font-black tracking-tighter uppercase text-center select-none text-black">
          THE FUTURE
        </h2>
      </div>

      {/* Interactive 3D Canvas for Futuristic Sneaker (Floating over text) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full">
        {hasBeenVisible ? (
          <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} shadows frameloop={isInView ? "always" : "demand"}>
            <ambientLight intensity={1.8} />
            
            {/* Main Key Lights */}
            <spotLight 
              position={[5, 10, 5]} 
              angle={0.3} 
              penumbra={1} 
              intensity={5.0} 
              castShadow 
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight position={[-5, 5, 2]} intensity={2.5} />
            
            {/* Cinematic Neon Accent Lights for Futuristic Look */}
            <pointLight position={[-4, -2, -2]} intensity={6.0} color="#FF007F" /> {/* Magenta / Pink glow */}
            <pointLight position={[4, 2, -2]} intensity={7.0} color="#00F0FF" />  {/* Cyan / Blue glow */}
            
            <Environment preset="city" />
            
            <Suspense fallback={<CanvasLoader />}>
              <Center>
                <FuturisticSneaker />
              </Center>
              {/* Soft Shadow below model */}
              <ContactShadows position={[0, -1.0, 0]} opacity={0.4} scale={8} blur={2.0} far={4} />
            </Suspense>
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              minPolarAngle={Math.PI / 2.5} 
              maxPolarAngle={Math.PI / 1.8}
            />
          </Canvas>
        ) : (
          <div className="absolute inset-0 bg-transparent flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin opacity-20" />
              <span className="text-[9px] font-black tracking-widest text-black/30 uppercase">
                LOAD 3D ENVIRONMENT
              </span>
            </div>
          </div>
        )}
      </div>

      {/* CTA Button Overlay (Above everything) */}
      <div className="absolute bottom-16 inset-x-0 flex justify-center z-20 pointer-events-auto">
        <button className="px-12 py-5 bg-black text-white text-sm font-bold tracking-widest rounded-full hover:scale-105 active:scale-95 transition-transform duration-300 shadow-2xl shadow-black/20 uppercase cursor-pointer">
          ENTER SHOWROOM
        </button>
      </div>
    </section>
  );
}

// Pre-preload the model asset for smoother experience
useGLTF.preload("/futuristic sneaker 3d model.glb");

