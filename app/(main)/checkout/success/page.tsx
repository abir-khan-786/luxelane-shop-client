"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/src/store/useCart';
import Link from 'next/link';
import { Check } from 'lucide-react';

const OrderSuccess = () => {
    const { clearCart } = useCart();

    // পেজ লোড হলে কার্ট খালি করে দেবে
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd] px-6">
            <div className="max-w-md w-full text-center space-y-8">

                {/* Animated Success Icon */}
                <div className="relative flex justify-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="w-24 h-24 bg-[#004d4d] rounded-full flex items-center justify-center z-10 shadow-2xl"
                    >
                        <motion.div
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <Check className="w-12 h-12 text-[#b87333] stroke-[3px]" />
                        </motion.div>
                    </motion.div>

                    {/* Background Ripple Effect */}
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 bg-[#b87333]/20 rounded-full"
                    />
                </div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-4"
                >
                    <h1 className="font-serif text-4xl text-[#004d4d]">Order <span className="italic text-[#b87333]">Confirmed.</span></h1>
                    <p className="text-gray-500 font-light leading-relaxed">
                        Thank you for choosing LuxeLane. Your curated selection is being prepared for its journey to you.
                    </p>
                </motion.div>

                {/* Order ID & CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="pt-8 space-y-6"
                >
                    <div className="py-3 border-y border-gray-100 uppercase text-[10px] tracking-[0.3em] text-gray-400 font-bold">
                        Order Ref: #LX-
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link href="/shop" className="w-full py-4 bg-[#004d4d] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#b87333] transition-all shadow-xl">
                            Continue Shopping
                        </Link>
                        <Link href="/dashboard" className="text-[#004d4d] text-[10px] font-bold uppercase tracking-widest border-b border-[#004d4d] pb-1 w-fit mx-auto hover:text-[#b87333] hover:border-[#b87333] transition-all">
                            Track Your Order
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderSuccess;
