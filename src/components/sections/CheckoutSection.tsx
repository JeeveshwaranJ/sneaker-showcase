"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, CheckCircle, CreditCard, Lock, ShieldCheck } from "lucide-react";

export default function CheckoutSection() {
  const { cart, isCheckoutOpen, setCheckoutOpen, cartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Lock background scroll when checkout overlay is open
  useEffect(() => {
    if (isCheckoutOpen) {
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
  }, [isCheckoutOpen]);
  
  const [form, setForm] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvv: ""
  });

  const tax = Math.round(cartTotal * 0.08); // 8% sales tax
  const grandTotal = cartTotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate transaction delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setIsSuccess(false);
    clearCart();
    setCheckoutOpen(false);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto flex items-center justify-center p-4 md:p-10">
          
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSuccess && setCheckoutOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer z-0"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white border border-black/5 rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
          >
            {/* Close Button */}
            {!isSuccess && (
              <button
                onClick={() => setCheckoutOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer z-20 bg-white/80 backdrop-blur-md"
              >
                <X size={18} />
              </button>
            )}

            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* Success Screen Overlay */
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col items-center justify-center text-center p-12 md:p-24 bg-white gap-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-emerald-500"
                  >
                    <CheckCircle size={80} strokeWidth={1.5} />
                  </motion.div>

                  <div>
                    <span className="text-[10px] font-black tracking-widest text-black/40 block mb-2">// TRANSACTION COMPLETED</span>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-4">ORDER CONFIRMED</h3>
                    <p className="text-sm font-semibold text-black/40 max-w-md mx-auto leading-relaxed">
                      Your order <strong className="text-black">#NEO-{Math.floor(100000 + Math.random() * 900000)}</strong> has been placed successfully. A confirmation email with tracking updates has been sent to <strong className="text-black">{form.email || "your email"}</strong>.
                    </p>
                  </div>

                  <button
                    onClick={handleCloseSuccess}
                    className="mt-4 px-10 py-5 bg-black text-white text-xs font-black tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-black/10 cursor-pointer"
                  >
                    RETURN TO SHOWROOM
                  </button>
                </motion.div>
              ) : (
                /* Checkout Form & Order Summary */
                <>
                  {/* Left Side: Forms */}
                  <form onSubmit={handleSubmit} className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                    <div className="flex flex-col gap-8">
                      <div>
                        <span className="text-xs font-black tracking-widest text-black/40 block mb-1">// SECURE CHECKOUT</span>
                        <h3 className="text-2xl font-black tracking-tight uppercase">TRANSACTION DETAILS</h3>
                      </div>

                      {/* Shipping Fields */}
                      <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-black tracking-widest text-black/50 border-b border-black/5 pb-2 uppercase">1. SHIPPING ADDRESS</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black tracking-widest text-black/60 uppercase">EMAIL ADDRESS</label>
                            <input 
                              type="email" required name="email" value={form.email} onChange={handleInputChange}
                              placeholder="you@email.com"
                              className="px-4 py-3 rounded-xl border border-black/10 text-sm font-semibold focus:outline-none focus:border-black transition-colors"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black tracking-widest text-black/60 uppercase">FULL NAME</label>
                            <input 
                              type="text" required name="name" value={form.name} onChange={handleInputChange}
                              placeholder="Alex Mercer"
                              className="px-4 py-3 rounded-xl border border-black/10 text-sm font-semibold focus:outline-none focus:border-black transition-colors"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black tracking-widest text-black/60 uppercase">STREET ADDRESS</label>
                          <input 
                            type="text" required name="address" value={form.address} onChange={handleInputChange}
                            placeholder="742 Evergreen Terrace"
                            className="px-4 py-3 rounded-xl border border-black/10 text-sm font-semibold focus:outline-none focus:border-black transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black tracking-widest text-black/60 uppercase">CITY</label>
                            <input 
                              type="text" required name="city" value={form.city} onChange={handleInputChange}
                              placeholder="Springfield"
                              className="px-4 py-3 rounded-xl border border-black/10 text-sm font-semibold focus:outline-none focus:border-black transition-colors"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black tracking-widest text-black/60 uppercase">ZIP CODE</label>
                            <input 
                              type="text" required name="zip" value={form.zip} onChange={handleInputChange}
                              placeholder="90210"
                              className="px-4 py-3 rounded-xl border border-black/10 text-sm font-semibold focus:outline-none focus:border-black transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Payment Fields */}
                      <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-black tracking-widest text-black/50 border-b border-black/5 pb-2 uppercase">2. PAYMENT INFORMATION</h4>
                        
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black tracking-widest text-black/60 uppercase">CARD NUMBER</label>
                          <div className="relative">
                            <input 
                              type="text" required name="card" value={form.card} onChange={handleInputChange}
                              placeholder="•••• •••• •••• ••••"
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-black/10 text-sm font-semibold focus:outline-none focus:border-black transition-colors"
                            />
                            <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black tracking-widest text-black/60 uppercase">EXPIRY DATE</label>
                            <input 
                              type="text" required name="expiry" value={form.expiry} onChange={handleInputChange}
                              placeholder="MM/YY"
                              className="px-4 py-3 rounded-xl border border-black/10 text-sm font-semibold focus:outline-none focus:border-black transition-colors"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black tracking-widest text-black/60 uppercase">CVV SECURITY</label>
                            <div className="relative">
                              <input 
                                type="text" required name="cvv" value={form.cvv} onChange={handleInputChange}
                                placeholder="•••"
                                className="w-full pr-10 pl-4 py-3 rounded-xl border border-black/10 text-sm font-semibold focus:outline-none focus:border-black transition-colors"
                              />
                              <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Complete Checkout Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 py-5 bg-black text-white font-bold tracking-wider text-sm rounded-full hover:scale-[1.02] active:scale-98 transition-all disabled:opacity-50 shadow-xl shadow-black/10 cursor-pointer"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <ShieldCheck size={18} />
                            <span>AUTHORIZE TRANSACTION</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Right Side: Order Summary Panel */}
                  <div className="w-full md:w-80 bg-[#f9f9f9] border-t md:border-t-0 md:border-l border-black/5 p-8 flex flex-col justify-between overflow-y-auto max-h-[90vh]">
                    <div className="flex flex-col gap-6">
                      <h4 className="text-xs font-black tracking-widest text-black/50 uppercase">ORDER SUMMARY</h4>
                      
                      {/* Items List */}
                      <div className="flex flex-col gap-4 max-h-[30vh] overflow-y-auto">
                        {cart.map((item) => (
                          <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                            <div className="relative w-12 h-12 bg-white border border-black/5 rounded-xl flex items-center justify-center p-1 shrink-0">
                              <Image 
                                src={item.image} alt={item.name} fill sizes="48px"
                                className="object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-xs truncate uppercase leading-none">{item.name}</h5>
                              <span className="text-[9px] font-black tracking-widest text-black/40 uppercase block mt-1">
                                SIZE {item.size} • QTY {item.quantity}
                              </span>
                            </div>
                            <span className="font-bold text-xs">${item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Receipt Calculation */}
                    <div className="border-t border-black/5 pt-6 mt-6 flex flex-col gap-4">
                      <div className="flex justify-between items-center text-xs font-semibold text-black/40">
                        <span>SUBTOTAL</span>
                        <span className="text-black font-bold">${cartTotal}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold text-black/40">
                        <span>EST. TAX (8%)</span>
                        <span className="text-black font-bold">${tax}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold text-black/40">
                        <span>SHIPPING</span>
                        <span className="uppercase font-black text-black">FREE</span>
                      </div>
                      <div className="border-t border-black/5 pt-4 mt-2 flex justify-between items-end">
                        <span className="text-xs font-black tracking-widest text-black/40 uppercase">GRAND TOTAL</span>
                        <span className="text-xl font-black tracking-tight">${grandTotal}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
