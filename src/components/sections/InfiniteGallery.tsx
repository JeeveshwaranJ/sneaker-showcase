"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const shoes = ["/shoe1.png", "/shoe2.png", "/shoe3.png", "/shoe4.png"];

export default function InfiniteGallery() {
  return (
    <section className="py-24 bg-black text-white overflow-hidden relative select-none">
      {/* Top Row: Left Moving Marquee */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
          className="flex items-center gap-12 text-[8vw] md:text-[10vw] font-black tracking-tighter uppercase"
        >
          <span>NEO-VAPOR</span>
          <div className="relative w-32 md:w-44 h-24 md:h-32 inline-block hover:scale-110 transition-transform duration-300">
            <Image src="/shoe1.png" alt="shoe" fill className="object-contain" />
          </div>
          <span className="text-white/20">OUT NOW</span>
          <span>CITRUS-VOLT</span>
          <div className="relative w-32 md:w-44 h-24 md:h-32 inline-block hover:scale-110 transition-transform duration-300">
            <Image src="/shoe2.png" alt="shoe" fill className="object-contain" />
          </div>
          <span className="text-white/20">SERIES 01</span>
          
          {/* Repeated set for infinite scroll */}
          <span>NEO-VAPOR</span>
          <div className="relative w-32 md:w-44 h-24 md:h-32 inline-block hover:scale-110 transition-transform duration-300">
            <Image src="/shoe1.png" alt="shoe" fill className="object-contain" />
          </div>
          <span className="text-white/20">OUT NOW</span>
          <span>CITRUS-VOLT</span>
          <div className="relative w-32 md:w-44 h-24 md:h-32 inline-block hover:scale-110 transition-transform duration-300">
            <Image src="/shoe2.png" alt="shoe" fill className="object-contain" />
          </div>
          <span className="text-white/20">SERIES 01</span>
        </motion.div>
      </div>

      {/* Bottom Row: Right Moving Marquee */}
      <div className="flex whitespace-nowrap overflow-hidden mt-6 md:mt-10">
        <motion.div 
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
          className="flex items-center gap-12 text-[8vw] md:text-[10vw] font-black tracking-tighter uppercase"
        >
          <span className="text-white/20">AURA-MINT</span>
          <div className="relative w-32 md:w-44 h-24 md:h-32 inline-block hover:scale-110 transition-transform duration-300">
            <Image src="/shoe3.png" alt="shoe" fill className="object-contain" />
          </div>
          <span>KINETIC</span>
          <span className="text-white/20">COBALT</span>
          <div className="relative w-32 md:w-44 h-24 md:h-32 inline-block hover:scale-110 transition-transform duration-300">
            <Image src="/shoe4.png" alt="shoe" fill className="object-contain" />
          </div>
          <span>LIMITED EDITION</span>
          
          {/* Repeated set for infinite scroll */}
          <span className="text-white/20">AURA-MINT</span>
          <div className="relative w-32 md:w-44 h-24 md:h-32 inline-block hover:scale-110 transition-transform duration-300">
            <Image src="/shoe3.png" alt="shoe" fill className="object-contain" />
          </div>
          <span>KINETIC</span>
          <span className="text-white/20">COBALT</span>
          <div className="relative w-32 md:w-44 h-24 md:h-32 inline-block hover:scale-110 transition-transform duration-300">
            <Image src="/shoe4.png" alt="shoe" fill className="object-contain" />
          </div>
          <span>LIMITED EDITION</span>
        </motion.div>
      </div>
    </section>
  );
}
