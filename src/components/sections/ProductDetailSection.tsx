"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const TECH_POINTS = [
  {
    id: "upper",
    title: "AERO-KNIT UPPER",
    description: "Engineered high-tensile yarn woven into a single-piece seamless upper. Dynamic stretch zones map perfectly to the natural movement of the foot, delivering lightweight breathability.",
    progressRange: [0.15, 0.45]
  },
  {
    id: "shank",
    title: "REACT-CARBON SHANK",
    description: "An aerospace-grade carbon fiber plate running through the midfoot. Structurally tuned to prevent torque twisting while snap-back energy return drives every stride forward.",
    progressRange: [0.45, 0.75]
  },
  {
    id: "cushion",
    title: "LIQUID-GEL CUSHIONING",
    description: "Viscoelastic gel pockets embedded directly within the responsive foam core. Absorbs 98% of heel-strike shock impacts and disperses energy evenly across the sole platform.",
    progressRange: [0.75, 1.0]
  }
];

export default function ProductDetailSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePoint, setActivePoint] = useState<typeof TECH_POINTS[0] | null>(null);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth transforms based on scroll progress
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.85, 1], [1, 1.4, 1.8, 1.6, 1.1]);
  const x = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.85, 1], ["0%", "-20%", "15%", "25%", "0%"]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.85, 1], ["0%", "10%", "-15%", "-5%", "0%"]);
  const rotate = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.85, 1], [0, -10, 15, -5, 0]);

  // Update active tech point descriptions based on scroll progress
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const found = TECH_POINTS.find(point => 
        latest >= point.progressRange[0] && latest < point.progressRange[1]
      );
      setActivePoint(found || null);
    });
  }, [scrollYProgress]);

  return (
    <section 
      ref={containerRef} 
      id="details" 
      className="h-[200vh] w-full bg-[#111] text-white relative"
    >
      {/* Sticky Inner viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-between">
        
        {/* Floating Shoe Image (Zooming and Panning on scroll) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none p-12">
          {/* Ambient Background Circle */}
          <div className="absolute w-[45vw] h-[45vw] rounded-full bg-white/[0.02] border border-white/[0.04] blur-sm" />
          
          <motion.div
            style={{
              scale,
              x,
              y,
              rotate
            }}
            className="relative w-full max-w-2xl aspect-[4/3] flex items-center justify-center"
          >
            {/* Soft floor shadow */}
            <div className="absolute bottom-4 w-[85%] h-8 bg-black/40 rounded-full blur-2xl" />

            <div className="relative w-full h-full">
              <Image
                src="/shoe1.png"
                alt="Sneaker Close-up Detail"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </motion.div>
        </div>

        {/* Dark Ambient Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-10" />

        {/* Left fixed storytelling tag */}
        <div className="absolute top-12 left-8 md:left-24 z-20 pointer-events-none">
          <span className="text-xs font-black tracking-widest text-white/40 block">CLOSE-UP SHOWROOM</span>
          <h3 className="text-3xl font-black tracking-tighter uppercase mt-1">ENGINEERING DETAILS</h3>
        </div>

        {/* Interactive spec description panels */}
        <div className="absolute bottom-12 left-8 md:left-24 right-8 md:right-auto z-20 pointer-events-none w-full max-w-lg">
          <div className="h-60 flex flex-col justify-end">
            <AnimatePresence mode="wait">
              {activePoint ? (
                <motion.div
                  key={activePoint.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
                >
                  <span className="text-[10px] font-black tracking-widest text-white/50 block mb-2">// PATENT PENDING</span>
                  <h4 className="text-2xl font-black tracking-tight text-white uppercase mb-3">{activePoint.title}</h4>
                  <p className="text-sm text-white/70 font-medium leading-relaxed">
                    {activePoint.description}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-black/20 backdrop-blur-md p-8 rounded-3xl border border-white/5"
                >
                  <h4 className="text-2xl font-black tracking-tight text-white uppercase mb-2">SCROLL TO EXAMINE</h4>
                  <p className="text-sm text-white/40 font-bold tracking-widest">
                    EXPLORE THE HIGH-PERFORMANCE MATERIAL BLUEPRINTS DOWNWARD ↓
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right floating progress indicators */}
        <div className="absolute right-8 md:right-24 z-20 flex flex-col gap-8 text-right pointer-events-none hidden md:flex">
          {TECH_POINTS.map((point) => {
            const isCurrent = activePoint?.id === point.id;
            return (
              <div key={point.id} className="transition-all duration-300">
                <span className={`text-[10px] font-black tracking-widest block transition-colors ${isCurrent ? "text-white" : "text-white/20"}`}>
                  {point.title}
                </span>
                <div className={`h-[1px] w-24 ml-auto mt-2 transition-all ${isCurrent ? "bg-white w-36" : "bg-white/20"}`} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
