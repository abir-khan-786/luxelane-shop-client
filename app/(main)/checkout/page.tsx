"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/src/store/useCart';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';

const CheckoutPage = () => {
    const { cartItems } = useCart();
    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="min-h-screen bg-[#fdfdfd] py-20 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left: Shipping & Payment Form */}
                <div className="lg:col-span-7 space-y-12">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <h2 className="font-serif text-3xl text-[#004d4d]">Shipping <span className="italic text-gray-400">Details</span></h2>

                        <div className="grid grid-cols-2 gap-6">
                            <input type="text" placeholder="First Name" className="w-full py-3 border-b border-gray-200 outline-none focus:border-[#b87333] transition-colors text-sm font-light bg-transparent" />
                            <input type="text" placeholder="Last Name" className="w-full py-3 border-b border-gray-200 outline-none focus:border-[#b87333] transition-colors text-sm font-light bg-transparent" />
                        </div>
                        <input type="text" placeholder="Full Address" className="w-full py-3 border-b border-gray-200 outline-none focus:border-[#b87333] transition-colors text-sm font-light bg-transparent" />

                        <div className="grid grid-cols-2 gap-6">
                            <input type="text" placeholder="City" className="w-full py-3 border-b border-gray-200 outline-none focus:border-[#b87333] transition-colors text-sm font-light bg-transparent" />
                            <input type="text" placeholder="Phone Number" className="w-full py-3 border-b border-gray-200 outline-none focus:border-[#b87333] transition-colors text-sm font-light bg-transparent" />
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-8">
                        <h2 className="font-serif text-3xl text-[#004d4d]">Payment <span className="italic text-gray-400">Method</span></h2>
                        <div className="flex gap-4">
                            <button className="flex-grow flex items-center justify-center gap-3 py-4 border-2 border-[#b87333] bg-[#b87333]/5 text-[#b87333] font-bold text-xs uppercase tracking-widest">
                                <CreditCard className="w-4 h-4" /> Card Payment
                            </button>
                            <button className="flex-grow flex items-center justify-center gap-3 py-4 border border-gray-200 text-gray-400 font-bold text-xs uppercase tracking-widest hover:border-[#004d4d] hover:text-[#004d4d] transition-all">
                                <Truck className="w-4 h-4" /> Cash on Delivery
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:col-span-5">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 border border-gray-100 shadow-2xl sticky top-32">
                        <h3 className="font-serif text-2xl text-[#004d4d] mb-8 uppercase tracking-widest border-b border-gray-50 pb-4">Order Summary</h3>

                        <div className="space-y-4 mb-8">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-light">{item.name} x 1</span>
                                    <span className="text-[#004d4d] font-bold">${item.price}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-xs uppercase tracking-widest">Subtotal</span>
                                <span className="text-[#004d4d] font-bold">${subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-xs uppercase tracking-widest">Shipping</span>
                                <span className="text-[#b87333] font-bold">Free</span>
                            </div>
                            <div className="flex justify-between items-end pt-4 border-t border-gray-50">
                                <span className="text-[#004d4d] font-serif text-xl">Total Amount</span>
                                <span className="text-[#004d4d] font-serif text-3xl">${subtotal}</span>
                            </div>
                        </div>

                        <button className="w-full bg-[#004d4d] text-white py-5 mt-10 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#b87333] transition-all duration-500 shadow-xl flex items-center justify-center gap-3">
                            Confirm Order <ShieldCheck className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
