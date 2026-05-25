"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { products } from "@/components/sections/CarouselSection";
import { ChevronLeft, ShoppingBag, ShieldCheck, RefreshCw, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const SIZES = ["7", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"];

export default function ProductDetailClient({ id }: { id: string }) {
  const productId = parseInt(id) || 1;
  const product = products.find((p) => p.id === productId) || products[0];

  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("9");

  // Get related products (exclude current)
  const relatedProducts = products.filter((p) => p.id !== productId);

  const handleAddToBag = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseInt(product.price.replace("$", "")) || 249,
      image: product.image,
      size: selectedSize,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseInt(product.price.replace("$", "")) || 249,
      image: product.image,
      size: selectedSize,
    });
    router.push("/checkout");
  };

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-black">
      
      {/* Top Header Navigation */}
      <header className="p-6 md:p-12 flex justify-between items-center border-b border-black/5 bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 text-xs font-black tracking-widest uppercase hover:opacity-75 transition-opacity">
          <ChevronLeft size={16} />
          <span>BACK TO SHOWROOM</span>
        </Link>
        <div className="text-2xl font-black tracking-tight">NEO</div>
        <button 
          onClick={handleAddToBag}
          className="flex items-center gap-2 font-bold tracking-widest text-xs hover:opacity-70 transition-opacity bg-black text-white px-5 py-3 rounded-full shadow-lg shadow-black/10"
        >
          <span>BAG</span>
          <ShoppingBag size={14} />
        </button>
      </header>

      {/* Main Showcase Section */}
      <section className="flex flex-col lg:flex-row min-h-[80vh]">
        {/* Left Side: Floating Product Image */}
        <div className="w-full lg:w-3/5 min-h-[50vh] lg:min-h-0 relative bg-white border-b lg:border-b-0 lg:border-r border-black/5 flex items-center justify-center p-12 overflow-hidden">
          <div className="absolute top-8 left-8 z-10 pointer-events-none">
            <span className="text-[10px] font-black tracking-widest text-black/40 uppercase">// VIRTUAL BLUEPRINT</span>
            <h1 className="text-3xl font-black tracking-tight mt-1 uppercase">{product.name}</h1>
          </div>

          {/* Glowing back-shadow blur */}
          <div 
            className="absolute w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none" 
            style={{ backgroundColor: product.color }}
          />

          {/* Floating Shoe Image Wrapper */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, -1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }}
            className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center select-none pointer-events-none"
          >
            {/* Soft floor shadow */}
            <div className="absolute bottom-0 w-[85%] h-8 bg-black/5 rounded-full blur-xl" />
            
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.06)]"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Side: Product Details & Selection */}
        <div className="w-full lg:w-2/5 p-8 md:p-16 flex flex-col justify-center gap-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-black tracking-widest bg-black text-white px-2.5 py-1 rounded-md uppercase">{product.collection}</span>
              <span className="text-[10px] font-bold tracking-wider text-black/40 uppercase">{product.specs}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">{product.name}</h2>
            <span className="text-3xl font-light tracking-tight block mt-3">{product.price}</span>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black tracking-widest text-black/40 uppercase">SELECT SIZE (US MEN)</span>
              <span className="text-xs font-semibold text-black/30">SIZE CHART</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedSize === size
                      ? "bg-black text-white border-black scale-[1.03] shadow-md shadow-black/10"
                      : "bg-white text-black border-black/10 hover:border-black/30"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buy Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToBag}
              className="w-full py-5 bg-black text-white font-bold tracking-wider text-sm rounded-full hover:scale-[1.02] active:scale-98 transition-transform shadow-xl shadow-black/10 cursor-pointer"
            >
              ADD TO COLLECTION BAG
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-5 bg-white border border-black/15 text-black font-bold tracking-wider text-sm rounded-full hover:scale-[1.02] active:scale-98 transition-transform cursor-pointer hover:border-black"
            >
              INSTANT BUY NOW
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-6 border-t border-black/5 pt-8 mt-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck size={20} className="text-black/40" />
              <span className="text-[9px] font-black tracking-widest text-black/50 uppercase">FREE SHIPPING</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RefreshCw size={18} className="text-black/40" />
              <span className="text-[9px] font-black tracking-widest text-black/50 uppercase">30-DAY RETURNS</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck size={20} className="text-black/40" />
              <span className="text-[9px] font-black tracking-widest text-black/50 uppercase">SECURE PAYMENT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Breakdown */}
      <section className="py-24 px-8 md:px-24 bg-white border-t border-b border-black/5">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-black tracking-widest text-black/40 block mb-3">// DESIGN BLUEPRINT</span>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-12">TECHNICAL SPECIFICATIONS</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <div className="border-b border-black/5 pb-4">
              <span className="text-[10px] font-black tracking-widest text-black/40 uppercase block mb-1">UPPER CONSTRUCT</span>
              <p className="text-sm font-semibold text-black/70 leading-relaxed">
                Breathable aero-weave polyester knit structure providing maximum flex stability and side ventilation holes.
              </p>
            </div>
            <div className="border-b border-black/5 pb-4">
              <span className="text-[10px] font-black tracking-widest text-black/40 uppercase block mb-1">MIDSOLE CUSHION</span>
              <p className="text-sm font-semibold text-black/70 leading-relaxed">
                VOLT-FOAM high-performance cushioning core encapsulated inside high-durability polymer shell.
              </p>
            </div>
            <div className="border-b border-black/5 pb-4">
              <span className="text-[10px] font-black tracking-widest text-black/40 uppercase block mb-1">STABILIZER PLATE</span>
              <p className="text-sm font-semibold text-black/70 leading-relaxed">
                React-carbon shank running under the mid-sole arch, redirecting heel pressure into front push off force.
              </p>
            </div>
            <div className="border-b border-black/5 pb-4">
              <span className="text-[10px] font-black tracking-widest text-black/40 uppercase block mb-1">OUTSOLE SURFACE</span>
              <p className="text-sm font-semibold text-black/70 leading-relaxed">
                Grid-patterned traction grip designed with computer algorithms for cross-surface stability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Showcase */}
      <section className="py-24 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase mb-12 text-center">THE REST OF THE COLLECTION</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relProduct) => (
              <Link 
                href={`/product/${relProduct.id}`} 
                key={relProduct.id}
                className="group p-8 bg-white border border-black/5 rounded-[24px] flex flex-col justify-between h-96 relative overflow-hidden hover:shadow-xl hover:shadow-black/[0.02] transition-all duration-300"
              >
                <div>
                  <span className="text-[10px] font-black tracking-widest text-black/40 block uppercase">{relProduct.collection}</span>
                  <h4 className="text-xl font-black tracking-tight uppercase mt-1">{relProduct.name}</h4>
                </div>

                <div className="relative w-full h-40 my-auto flex items-center justify-center pointer-events-none select-none">
                  <div className="absolute bottom-2 w-4/5 h-4 bg-black/5 rounded-full blur-lg transition-all duration-300 group-hover:scale-x-90" />
                  <div className="relative w-full h-full transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-105 group-hover:rotate-[-5deg]">
                    <Image
                      src={relProduct.image}
                      alt={relProduct.name}
                      fill
                      sizes="220px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-black/60">{relProduct.price}</span>
                  <span className="text-[10px] font-black tracking-widest uppercase text-blue-600 group-hover:translate-x-1 transition-transform">VIEW DETAILS →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
