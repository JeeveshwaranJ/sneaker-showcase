"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, useGLTF, Center, Html, useProgress, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const TECH_SPECS = [
  {
    id: "sole",
    label: "REACT-GRID™ OUTSOLE",
    description: "Computer-generated tread patterns injection-molded from high-durability carbon rubber. Delivers grip across high-wear zones while engineered channels reduce overall shoe weight.",
    highlightPos: [0, -0.7, 0.4]
  },
  {
    id: "cushion",
    label: "VOLT-FOAM™ MIDSOLE",
    description: "Our proprietary compound that blends hyper-expanded foam bead technology with encapsulated viscoelastic gel. Rebounds 88% of impact energy instantly into push-off force.",
    highlightPos: [0.1, -0.3, 0.3]
  },
  {
    id: "fabric",
    label: "LITE-WEAVE™ TEXTILE",
    description: "Woven from continuous monofilament polyester fibers. Incorporates micro-perforations above the toe box for targeted heat venting and denser weaving around the arch for lock-down.",
    highlightPos: [-0.8, 0.2, 0.2]
  },
  {
    id: "shield",
    label: "CHROME-HEEL™ STABILIZER",
    description: "Rigid metallic TPU stabilizer cup wrapping around the rear heel counters. Minimizes lateral ankle rolling during high-speed cuts and locks the foot to the midsole bed.",
    highlightPos: [0.9, -0.1, 0.1]
  }
];

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 bg-white/90 border border-black/5 px-6 py-4 rounded-2xl shadow-xl backdrop-blur-md min-w-[200px] text-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] font-black tracking-widest text-black uppercase block">
          DOWNLOADING 3D MODEL
        </span>
        <span className="text-[11px] font-black text-black/50 block">
          {Math.round(progress)}% COMPLETE
        </span>
      </div>
    </Html>
  );
}

function Sneaker3DModel() {
  const { scene } = useGLTF("/red sneaker 3d model.glb");
  const modelRef = useRef<THREE.Group>(null);

  // Traverse the scene to ensure shadows are enabled on all child meshes
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <group ref={modelRef} dispose={null}>
      <primitive object={scene} scale={2.8} rotation={[0, -Math.PI / 4, 0]} />
    </group>
  );
}

export default function CustomizerSection() {
  const [activeSpecId, setActiveSpecId] = useState("sole");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(sectionRef);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  if (isInView && !hasBeenVisible) {
    setHasBeenVisible(true);
  }

  return (
    <section 
      ref={sectionRef}
      id="technology" 
      className="min-h-screen w-full bg-[#f4f4f4] text-black relative flex flex-col md:flex-row py-24 px-8 md:px-24 justify-center items-center gap-12 border-t border-black/5"
    >
      {/* 3D Diagnostic Canvas Box */}
      <div className="w-full md:w-3/5 h-[50vh] md:h-[70vh] relative bg-white rounded-[32px] shadow-sm border border-black/5 overflow-hidden">
        
        {/* Diagnostic Technical Overlay Lines */}
        <div className="absolute inset-0 pointer-events-none border border-black/[0.02] grid grid-cols-6 grid-rows-6 z-10">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border-r border-b border-black/[0.02] w-full h-full" />
          ))}
        </div>

        <div className="absolute top-8 left-8 z-10 pointer-events-none">
          <p className="text-xs font-black tracking-widest text-black/40">// DIAGNOSTIC PORT</p>
          <h2 className="text-3xl font-black tracking-tight mt-1 uppercase">3D SPECIFICATION</h2>
        </div>
        
        {/* Interactive 3D Orbit Scene */}
        {hasBeenVisible ? (
          <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} shadows frameloop={isInView ? "always" : "demand"}>
            <ambientLight intensity={2.5} />
            <spotLight 
              position={[5, 8, 5]} 
              angle={0.25} 
              penumbra={1} 
              intensity={4.5} 
              castShadow 
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight position={[-5, 5, 2]} intensity={2} />
            <Environment preset="city" />
            
            <Suspense fallback={<CanvasLoader />}>
              <Center>
                <Sneaker3DModel />
                
                {/* Hotspot indicators in R3F */}
                {TECH_SPECS.map((spec) => {
                  const isSelected = spec.id === activeSpecId;
                  const pos = spec.highlightPos;
                  return (
                    <mesh 
                      key={spec.id} 
                      position={[pos[0], pos[1], pos[2]]}
                      onClick={() => setActiveSpecId(spec.id)}
                      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
                      onPointerOut={() => { document.body.style.cursor = "auto"; }}
                    >
                      <sphereGeometry args={[0.07, 16, 16]} />
                      <meshBasicMaterial 
                        color={isSelected ? "#FF3366" : "#111111"} 
                        transparent 
                        opacity={0.8}
                      />
                    </mesh>
                  );
                })}
              </Center>
              <ContactShadows position={[0, -1.0, 0]} opacity={0.3} scale={8} blur={2.0} far={4} />
            </Suspense>
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              minPolarAngle={Math.PI / 2.5} 
              maxPolarAngle={Math.PI / 1.8} 
            />
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin opacity-20" />
              <span className="text-[9px] font-black tracking-widest text-black/30 uppercase">
                LOAD 3D ENVIRONMENT
              </span>
            </div>
          </div>
        )}

        {/* Drag label */}
        <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
          <div className="bg-black/5 px-4 py-2 rounded-full backdrop-blur-md">
            <p className="text-[10px] font-black tracking-widest text-black/60 uppercase">DRAG TO ROTATE 3D MODEL</p>
          </div>
        </div>
      </div>

      {/* Specification Details Column */}
      <div className="w-full md:w-2/5 flex flex-col justify-center gap-10 md:pl-8">
        <div>
          <span className="text-[10px] font-black tracking-widest text-black/40 block mb-2">// INNOVATION OVERVIEW</span>
          <h3 className="text-4xl font-black tracking-tight uppercase leading-none mb-6">MATERIALS & DESIGN</h3>
          <p className="text-black/60 text-sm font-medium leading-relaxed">
            Our shoes are engineered for streetwear style and athletic endurance. Pick a component from the list below or click the 3D hotspots to run diagnostics.
          </p>
        </div>

        {/* Hotspot buttons list */}
        <div className="flex flex-col gap-3">
          {TECH_SPECS.map((spec) => {
            const isSelected = spec.id === activeSpecId;
            return (
              <button
                key={spec.id}
                onClick={() => setActiveSpecId(spec.id)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                  isSelected 
                    ? "bg-black text-white border-black shadow-lg shadow-black/10 translate-x-2" 
                    : "bg-white text-black border-black/5 hover:border-black/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black tracking-widest uppercase">{spec.label}</span>
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: isSelected ? "#FF3366" : "rgba(0,0,0,0.15)" }} 
                  />
                </div>
                {isSelected && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="text-xs text-white/70 leading-relaxed font-medium mt-3"
                  >
                    {spec.description}
                  </motion.p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Pre-preload the model asset for smoother experience
useGLTF.preload("/red sneaker 3d model.glb");
