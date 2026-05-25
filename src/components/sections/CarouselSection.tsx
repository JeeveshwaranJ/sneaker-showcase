"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export const products = [
  { 
    id: 1, 
    name: "NEO VAPOR", 
    collection: "SERIES 01", 
    price: "$249", 
    color: "#8E9297",
    textColor: "text-slate-800",
    bgColor: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)",
    image: "/shoe1.png",
    accent: "text-slate-500",
    specs: "AERO-WEAVE KNIT • CHROMIUM SHANK"
  },
  { 
    id: 2, 
    name: "CITRUS VOLT", 
    collection: "SERIES 01", 
    price: "$269", 
    color: "#FF9900",
    textColor: "text-amber-900",
    bgColor: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)",
    image: "/shoe2.png",
    accent: "text-amber-600",
    specs: "MAGNETIC LACES • DUAL-DENSITY BOOST"
  },
  { 
    id: 3, 
    name: "AURA MINT", 
    collection: "SERIES 02", 
    price: "$289", 
    color: "#00E676",
    textColor: "text-emerald-950",
    bgColor: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
    image: "/shoe3.png",
    accent: "text-emerald-600",
    specs: "LIQUID-FOAM CORE • BIOPOLYMER KNIT"
  },
  { 
    id: 4, 
    name: "KINETIC COBALT", 
    collection: "LIMITED EDITION", 
    price: "$349", 
    color: "#2962FF",
    textColor: "text-blue-950",
    bgColor: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)",
    image: "/shoe4.png",
    accent: "text-blue-600",
    specs: "CARBON HEEL CUP • SHOCK-TUBES MIDSOLE"
  },
];

export default function CarouselSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCartOpen, cartCount } = useCart();

  // Mouse motion values for 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt
  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), springConfig);

  const nextProduct = () => setActiveIndex((p) => (p + 1) % products.length);
  const prevProduct = () => setActiveIndex((p) => (p - 1 + products.length) % products.length);

  const activeProduct = products[activeIndex];

  // Track mouse movements to update motion values
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1; // normalize -1 to 1
      const y = -(e.clientY / innerHeight) * 2 + 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden text-black flex flex-col justify-between"
    >
      {/* Background Gradient Layers for hardware-accelerated smooth transitions */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {products.map((product, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={product.id}
              style={{ background: product.bgColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            />
          );
        })}
      </div>

      {/* Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.h1
            key={activeProduct.id}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 0.08, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[20vw] font-black tracking-tighter text-black whitespace-nowrap uppercase select-none"
          >
            {activeProduct.name}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* 3D CSS Parallax Sneaker Slider */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none [perspective:1200px]">
        <div className="relative w-full max-w-[1200px] h-[50vh] flex items-center justify-center">
          
          {products.map((product, i) => {
            const isActive = i === activeIndex;
            const isLeft = i === (activeIndex - 1 + products.length) % products.length;
            const isRight = i === (activeIndex + 1) % products.length;

            // Compute positions
            let xOffset = 0;
            let scale = 0.4;
            let opacity = 0;
            let zIndex = 0;
            let rotateYOffset = 0;

            if (isActive) {
              xOffset = 0;
              scale = 1.0;
              opacity = 1;
              zIndex = 20;
              rotateYOffset = 0;
            } else if (isLeft) {
              xOffset = -380;
              scale = 0.55;
              opacity = 0.4;
              zIndex = 10;
              rotateYOffset = 35; // facing inwards
            } else if (isRight) {
              xOffset = 380;
              scale = 0.55;
              opacity = 0.4;
              zIndex = 10;
              rotateYOffset = -35; // facing inwards
            }

            // Don't render details that aren't adjacent
            const isVisible = isActive || isLeft || isRight;
            if (!isVisible) return null;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ 
                  x: xOffset,
                  scale: scale,
                  opacity: opacity,
                  z: isActive ? 50 : -200,
                  rotateY: isActive ? 0 : rotateYOffset,
                }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  rotateX: isActive ? rotateX : 0,
                  rotateY: isActive ? rotateY : rotateYOffset,
                  transformStyle: "preserve-3d"
                }}
                className="absolute w-[450px] h-[300px] md:w-[600px] md:h-[400px] flex items-center justify-center pointer-events-none"
              >
                {/* Active Shoe Shadow */}
                {isActive && (
                  <motion.div 
                    layoutId="shadow"
                    className="absolute -bottom-4 w-[70%] h-8 bg-black/10 rounded-full blur-2xl z-0"
                    animate={{
                      scale: [1, 0.93, 1],
                      opacity: [0.8, 0.6, 0.8]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Floating Sneaker Image */}
                <motion.div
                  animate={isActive ? {
                    y: [0, -16, 0],
                    rotate: [0, -2, 0]
                  } : { y: 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut"
                  }}
                  className="relative w-full h-full z-10 flex items-center justify-center"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 350px, 600px"
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Side Faded Previews Overlay */}
      <div className="absolute inset-y-0 left-0 w-[10vw] z-15 pointer-events-none bg-gradient-to-r from-white/10 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[10vw] z-15 pointer-events-none bg-gradient-to-l from-white/10 to-transparent" />

      {/* UI Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12 h-full">
        
        {/* Top Header */}
        <header className="flex justify-between items-center pointer-events-auto">
          <div className="text-3xl font-black tracking-tight cursor-pointer hover:opacity-75 transition-opacity">NEO</div>
          <nav className="hidden md:flex gap-12 text-sm font-bold tracking-widest text-black/60">
            <a href="#collection" className="hover:text-black transition-colors">COLLECTION</a>
            <a href="#details" className="hover:text-black transition-colors">DETAILS</a>
            <a href="#technology" className="hover:text-black transition-colors">TECHNOLOGY</a>
            <a href="#campaign" className="hover:text-black transition-colors">CAMPAIGN</a>
          </nav>
          <button 
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 font-bold tracking-widest text-xs hover:opacity-70 transition-opacity bg-black text-white px-5 py-3 rounded-full shadow-lg shadow-black/10"
          >
            <span>BAG ({cartCount})</span>
            <ShoppingBag size={14} />
          </button>
        </header>

        {/* Bottom Panel */}
        <footer className="flex flex-col md:flex-row justify-between items-end md:items-center gap-8 pointer-events-auto mt-auto">
          
          {/* Product Specifications & Branding */}
          <div className="w-full md:w-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={activeProduct.textColor}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-black tracking-widest bg-black/5 px-2.5 py-1 rounded-md uppercase">{activeProduct.collection}</span>
                  <span className="text-xs font-semibold tracking-wider opacity-60">{activeProduct.specs}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-2 uppercase leading-none">{activeProduct.name}</h2>
                <div className="flex items-center gap-6">
                  <p className="text-3xl font-light tracking-tight">{activeProduct.price}</p>
                  <div className="w-12 h-[1px] bg-current opacity-30" />
                  <p className="text-xs font-bold tracking-widest opacity-60 uppercase">EXCLUSIVE LAUNCH</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider & Checkout Controls */}
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
            <div className="flex gap-2">
              <button 
                onClick={prevProduct}
                className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 bg-white/20 backdrop-blur-md"
                aria-label="Previous shoe"
              >
                <ChevronLeft size={22} />
              </button>
              <button 
                onClick={nextProduct}
                className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 bg-white/20 backdrop-blur-md"
                aria-label="Next shoe"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <Link 
              href={`/product/${activeProduct.id}`}
              className="flex items-center gap-3 px-8 py-5 bg-black text-white rounded-full font-bold tracking-wider text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-black/15 group"
            >
              <span>EXPLORE SPECIFICATIONS</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </footer>
      </div>
    </section>
  );
}
