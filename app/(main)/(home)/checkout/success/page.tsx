"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/src/store/useCart";
import Link from "next/link";
import { Check, Package, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
    const { clearCart } = useCart();

    // Generate order ID only once on initial render (hydration safe)
    const [orderId] = useState(() =>
        `LX-${Math.random().toString(36).toUpperCase().substring(2, 10)}`
    );

    // Clear cart as a side effect
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd] px-6 py-20">
            <div className="max-w-xl w-full text-center space-y-12">
                {/* Hero Animation */}
                <div className="relative flex justify-center py-10">
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-28 h-28 bg-[#004d4d] rounded-full flex items-center justify-center z-10 shadow-[0_20px_50px_rgba(0,77,77,0.2)]"
                    >
                        <Check className="w-12 h-12 text-[#b87333] stroke-[3px]" />
                    </motion.div>

                    {[1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 2.2, opacity: 0 }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                            className="absolute inset-0 m-auto w-28 h-28 border border-[#b87333]/30 rounded-full"
                        />
                    ))}
                </div>

                {/* Heading */}
                <h1 className="font-serif text-5xl text-[#004d4d] leading-tight">
                    Your Order is <span className="italic text-[#b87333]">Confirmed</span>
                </h1>

                {/* Order Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white border border-gray-100 p-8 shadow-sm space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 uppercase tracking-widest text-xs font-bold">
                            Order Reference
                        </span>
                        <span className="text-[#004d4d] font-bold">{orderId}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="flex items-center gap-2 italic">
                            <Package className="w-3 h-3 text-[#b87333]" /> Estimated Delivery
                        </span>
                        <span className="font-medium">3–5 Business Days</span>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Link
                        href="/shop"
                        className="px-10 py-4 bg-[#004d4d] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#b87333] transition-all duration-500 shadow-xl flex items-center justify-center gap-2"
                    >
                        Continue Shopping
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/dashboard"
                        className="px-10 py-4 border border-gray-100 text-[#004d4d] text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center"
                    >
                        Track Order
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;