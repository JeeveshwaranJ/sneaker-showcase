"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const collection = [
  { 
    id: 1, 
    name: "NEO VAPOR", 
    category: "AERO PERFORMANCE", 
    price: "$249", 
    image: "/shoe1.png",
    accentBg: "from-[#ebebeb] to-[#dcdcdc]",
    borderColor: "border-slate-300/20",
    tech: "AERO-WEAVE • CHROME SHANK"
  },
  { 
    id: 2, 
    name: "CITRUS VOLT", 
    category: "STREETWEAR S01", 
    price: "$269", 
    image: "/shoe2.png",
    accentBg: "from-[#fffbeb] to-[#fde68a]",
    borderColor: "border-amber-300/20",
    tech: "MAGNETIC LACE • DUAL BOOST"
  },
  { 
    id: 3, 
    name: "AURA MINT", 
    category: "BIO-TECH RUNNER", 
    price: "$289", 
    image: "/shoe3.png",
    accentBg: "from-[#ecfdf5] to-[#bbf7d0]",
    borderColor: "border-emerald-300/20",
    tech: "LIQUID FOAM • BIOPOLYMER"
  },
  { 
    id: 4, 
    name: "KINETIC COBALT", 
    category: "LIMITED RELEASE", 
    price: "$349", 
    image: "/shoe4.png",
    accentBg: "from-[#eff6ff] to-[#bfdbfe]",
    borderColor: "border-blue-300/20",
    tech: "CARBON HEEL • SHOCK-TUBES"
  },
];

export default function CollectionShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !scrollRef.current) return;
    
    const scrollWidth = scrollRef.current.scrollWidth - window.innerWidth;

    gsap.to(scrollRef.current, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="collection" 
      className="h-screen w-full bg-[#f8f8f8] text-black overflow-hidden relative border-t border-black/5"
    >
      {/* Background Section Header */}
      <div className="absolute top-12 left-8 md:left-24 z-10 pointer-events-none">
        <h2 className="text-sm font-black tracking-widest text-black/40">THE COLLECTION</h2>
        <p className="text-4xl md:text-5xl font-black tracking-tighter mt-1 uppercase">SERIES 01 / 02</p>
      </div>

      <div 
        ref={scrollRef} 
        className="h-full flex items-center pl-[8vw] pr-[20vw] gap-16 md:gap-24"
      >
        {collection.map((item, i) => (
          <Link 
            href={`/product/${item.id}`}
            key={item.id} 
            className="relative w-[340px] md:w-[480px] h-[65vh] shrink-0 group flex flex-col justify-between p-8 md:p-12 rounded-[32px] bg-white shadow-xl shadow-black/[0.02] border border-black/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/[0.05]"
          >
            {/* Subtle Gradient Backglow */}
            <div className={`absolute -right-24 -top-24 w-80 h-80 rounded-full bg-gradient-to-br ${item.accentBg} opacity-30 blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125`} />

            {/* Header part inside card */}
            <div className="z-10 flex justify-between items-start">
              <div>
                <p className="text-xs font-black tracking-widest text-black/40 uppercase">{item.category}</p>
                <p className="text-[10px] font-bold tracking-wider text-black/30 mt-1">{item.tech}</p>
              </div>
              <span className="text-2xl font-light tracking-tight">{item.price}</span>
            </div>
            
            {/* Floating Shoe Image */}
            <div className="relative w-full h-[30vh] z-10 flex items-center justify-center select-none pointer-events-none my-auto">
              {/* Soft Shoe Shadow */}
              <div className="absolute bottom-4 w-4/5 h-6 bg-black/10 rounded-full blur-xl transition-all duration-500 group-hover:scale-x-95 group-hover:opacity-75" />
              
              <div className="relative w-full h-full transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-8 group-hover:scale-105 group-hover:rotate-[-6deg]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 300px, 480px"
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)]"
                  priority={i < 2}
                />
              </div>
            </div>

            {/* Footer / CTA inside card */}
            <div className="z-10 flex justify-between items-end">
              <div>
                <span className="text-xs font-semibold text-black/30 block mb-1">DESIGN CODE // 00{item.id}</span>
                <h3 className="text-3xl font-black tracking-tight uppercase leading-none">{item.name}</h3>
              </div>
              
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:scale-110 active:scale-95 transition-transform duration-300 shadow-lg shadow-black/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
