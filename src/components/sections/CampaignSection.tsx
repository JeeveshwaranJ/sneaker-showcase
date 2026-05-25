"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CampaignSection() {
  return (
    <section 
      id="campaign" 
      className="min-h-screen w-full bg-[#111] text-white relative flex flex-col md:flex-row items-center justify-between py-24 px-8 md:px-24 overflow-hidden"
    >
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 border border-white/[0.03] grid grid-cols-4 z-0">
        <div className="border-r border-white/[0.03] h-full" />
        <div className="border-r border-white/[0.03] h-full" />
        <div className="border-r border-white/[0.03] h-full" />
      </div>

      {/* Left Column: Editorial Headings */}
      <div className="w-full md:w-1/2 z-10 flex flex-col gap-8 md:gap-12 justify-center h-full">
        <div>
          <span className="text-xs font-black tracking-widest text-white/40 block mb-3">// BRAND STATEMENT</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-6">
            REDESIGNING<br/>THE STREETS
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-md leading-relaxed">
            The intersection of raw streetwear fashion and cutting-edge biomechanics. We don&apos;t build shoes for templates; we build them for the vanguard.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 max-w-md">
          <div>
            <span className="text-[10px] font-black tracking-widest text-white/40 block mb-1">01 / CONCEPT</span>
            <p className="text-sm font-bold text-white/80 leading-relaxed">Procedural engineering. Aerodynamic curves modeled on aerospace wind-tunnels.</p>
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest text-white/40 block mb-1">02 / MISSION</span>
            <p className="text-sm font-bold text-white/80 leading-relaxed">Bridging high-performance polymer chemistry with active streetwear aesthetics.</p>
          </div>
        </div>
      </div>

      {/* Right Column: Layered Editorial Visual composition */}
      <div className="w-full md:w-1/2 z-10 flex items-center justify-center mt-16 md:mt-0 relative h-[60vh] md:h-auto">
        {/* Large Faded Year Stamp */}
        <span className="absolute text-[22vw] font-black tracking-tighter text-white/[0.02] select-none pointer-events-none uppercase -bottom-10 right-0 leading-none">
          NEO
        </span>

        {/* Outer Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-lg aspect-[4/5] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 rounded-[40px] flex items-center justify-center p-8 overflow-hidden group shadow-2xl shadow-black/50"
        >
          {/* Floating Product Render */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            {/* Ambient Background Circle */}
            <div className="absolute w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110" />
            
            <div className="relative w-full h-full animate-[bounce_5s_infinite_ease-in-out] select-none pointer-events-none">
              <Image 
                src="/shoe3.png" 
                alt="Campaign product" 
                fill 
                sizes="(max-width: 768px) 300px, 480px"
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] rotate-[-15deg] group-hover:rotate-[-5deg] group-hover:scale-105 transition-all duration-700 ease-out" 
              />
            </div>
          </div>

          {/* Technical annotation labels */}
          <div className="absolute top-8 left-8 border-l border-white/20 pl-4 py-1">
            <span className="text-[10px] font-black tracking-widest text-white/50 block">PROJECT NAME</span>
            <span className="text-sm font-black tracking-tight text-white uppercase mt-0.5">AURA-MINT</span>
          </div>

          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-white/5 pt-6">
            <div>
              <span className="text-[9px] font-bold tracking-widest text-white/40 block">RELEASE SCHED // 02</span>
              <span className="text-xs font-bold text-white/80 uppercase mt-0.5">GLOBAL LAUNCH COMPLETED</span>
            </div>
            <span className="text-sm font-black text-blue-500 uppercase tracking-widest">S02 EXCLUSIVE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
