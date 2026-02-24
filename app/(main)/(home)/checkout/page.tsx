"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/src/store/useCart';
import { CreditCard, Truck, ShieldCheck, ChevronLeft, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
const CheckoutPage = () => {
    const { cartItems } = useCart();
    const router = useRouter();

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    const handleConfirmOrder = () => {
        if (cartItems.length === 0) return alert("Your bag is empty!");

        // In a real app, you would send the formData to your DB here.
        // After successful DB entry:
        router.push("checkout/success");
    };
    return (
        <div className="min-h-screen bg-[#fcfcfc] pt-32 pb-20 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <Link href="/shop" className="inline-flex items-center text-gray-400 hover:text-[#b87333] mb-12 transition-colors text-xs uppercase tracking-widest font-bold">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Continue Shopping
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left: Shipping & Payment Form */}
                    <div className="lg:col-span-7 space-y-16">
                        {/* Shipping Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-10"
                        >
                            <div className="flex items-center gap-4">
                                <span className="bg-[#004d4d] text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">01</span>
                                <h2 className="font-serif text-3xl text-[#004d4d]">Shipping <span className="italic text-gray-300">Information</span></h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                                <div className="relative group">
                                    <input type="text" required className="peer w-full py-3 border-b border-gray-200 outline-none focus:border-[#b87333] transition-all text-sm font-light bg-transparent placeholder-transparent" placeholder="First Name" />
                                    <label className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#b87333]">First Name</label>
                                </div>
                                <div className="relative group">
                                    <input type="text" required className="peer w-full py-3 border-b border-gray-200 outline-none focus:border-[#b87333] transition-all text-sm font-light bg-transparent placeholder-transparent" placeholder="Last Name" />
                                    <label className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#b87333]">Last Name</label>
                                </div>
                                <div className="md:col-span-2 relative group">
                                    <MapPin className="absolute right-0 bottom-3 w-4 h-4 text-gray-300" />
                                    <input type="text" required className="peer w-full py-3 border-b border-gray-200 outline-none focus:border-[#b87333] transition-all text-sm font-light bg-transparent placeholder-transparent" placeholder="Address" />
                                    <label className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#b87333]">Shipping Address</label>
                                </div>
                                <div className="relative group">
                                    <input type="text" required className="peer w-full py-3 border-b border-gray-200 outline-none focus:border-[#b87333] transition-all text-sm font-light bg-transparent placeholder-transparent" placeholder="City" />
                                    <label className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#b87333]">City</label>
                                </div>
                                <div className="relative group">
                                    <Phone className="absolute right-0 bottom-3 w-4 h-4 text-gray-300" />
                                    <input type="tel" required className="peer w-full py-3 border-b border-gray-200 outline-none focus:border-[#b87333] transition-all text-sm font-light bg-transparent placeholder-transparent" placeholder="Phone" />
                                    <label className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#b87333]">Phone Number</label>
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Method */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-10"
                        >
                            <div className="flex items-center gap-4">
                                <span className="bg-[#004d4d] text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">02</span>
                                <h2 className="font-serif text-3xl text-[#004d4d]">Payment <span className="italic text-gray-300">Method</span></h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-4 py-5 border-2 border-[#b87333] bg-[#b87333]/5 text-[#b87333] font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-[#b87333]/10">
                                    <CreditCard className="w-4 h-4" /> Card Payment
                                </button>
                                <button className="flex items-center justify-center gap-4 py-5 border border-gray-100 text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] hover:border-[#004d4d] hover:text-[#004d4d] transition-all">
                                    <Truck className="w-4 h-4" /> Cash on Delivery
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-8 md:p-12 border border-gray-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] sticky top-32"
                        >
                            <h3 className="font-serif text-2xl text-[#004d4d] mb-10 text-center tracking-widest">Order Summary</h3>

                            {/* Cart Items List */}
                            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-6 mb-10 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center group">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-12 h-16 bg-gray-50 shrink-0 overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-[#004d4d] line-clamp-1">{item.name}</p>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Qty: {item.quantity || 1}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-[#b87333]">${item.price * (item.quantity || 1)}</span>
                                    </div>
                                ))}
                                {cartItems.length === 0 && <p className="text-center text-gray-400 text-sm italic">Bag is empty</p>}
                            </div>

                            {/* Calculations */}
                            <div className="border-t border-gray-100 pt-8 space-y-5">
                                <div className="flex justify-between items-center text-xs uppercase tracking-widest">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span className="text-[#004d4d] font-bold">${subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs uppercase tracking-widest">
                                    <span className="text-gray-400">Luxury Shipping</span>
                                    <span className="text-[#b87333] font-bold">Complimentary</span>
                                </div>
                                <div className="flex justify-between items-end pt-6 border-t border-gray-50">
                                    <span className="text-[#004d4d] font-serif text-xl">Total</span>
                                    <span className="text-[#004d4d] font-serif text-4xl">${subtotal}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirmOrder}
                                className="w-full bg-[#004d4d] text-white py-6 mt-12 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-[#b87333] transition-all duration-700 shadow-2xl flex items-center justify-center gap-3 active:scale-95"
                            >
                                Confirm Order <ShieldCheck className="w-4 h-4" />
                            </button>

                            <p className="text-[9px] text-gray-300 text-center mt-6 uppercase tracking-widest">
                                Encrypted & Secure Checkout
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
