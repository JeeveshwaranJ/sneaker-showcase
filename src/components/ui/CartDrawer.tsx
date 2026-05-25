"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, cartTotal, setCheckoutOpen } = useCart();

  // Lock background scroll when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      if ((window as any).lenis) {
        ((window as any).lenis).stop();
      }
    } else {
      document.body.style.overflow = "";
      if ((window as any).lenis) {
        ((window as any).lenis).start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if ((window as any).lenis) {
        ((window as any).lenis).start();
      }
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black z-[9990] backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-black/5 z-[9995] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-8 border-b border-black/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <h3 className="text-xl font-black tracking-tight uppercase">YOUR BAG</h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center text-black/40">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg uppercase mb-1">BAG IS EMPTY</h4>
                    <p className="text-sm text-black/40 font-medium">Select a model to begin your collection.</p>
                  </div>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="mt-2 text-xs font-black tracking-widest uppercase bg-black text-white px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-5 border-b border-black/5 pb-6 last:border-b-0">
                    {/* Item Image */}
                    <div className="relative w-24 h-24 bg-black/5 rounded-2xl flex items-center justify-center p-2 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.05)]"
                      />
                    </div>

                    {/* Item Metadata */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-black tracking-tight text-lg uppercase leading-none">{item.name}</h4>
                          <span className="font-bold text-sm text-black/80">${item.price}</span>
                        </div>
                        <p className="text-[10px] font-black tracking-widest text-black/40 uppercase mt-2">SIZE: US {item.size}</p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs font-semibold text-black/50">QTY: {item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-black/30 hover:text-black transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Panel Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-black/5 bg-[#fcfcfc] flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm font-semibold text-black/50">
                    <span>SHIPPING</span>
                    <span className="uppercase font-black text-black">FREE SHIPPING</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black tracking-widest text-black/40 uppercase">SUBTOTAL</span>
                    <span className="text-2xl font-black tracking-tight">${cartTotal}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-black text-white font-bold tracking-wider text-sm rounded-full hover:scale-105 active:scale-95 transition-transform shadow-xl shadow-black/10 cursor-pointer group"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
