"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/src/store/useCart";
import Link from "next/link";
import { Check, Package, ArrowRight, Home, ReceiptText } from "lucide-react";

const OrderSuccess = () => {
    const { clearCart } = useCart();

    // অর্ডার সফল হওয়ার সাথে সাথে কার্ট ক্লিয়ার করা
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd] px-6 py-24 text-[#004d4d]">
            <div className="max-w-2xl w-full text-center">

                {/* 1. Success Icon with Luxury Glow */}
                <div className="relative flex justify-center mb-16">
                    <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
                        className="w-24 h-24 bg-[#004d4d] rounded-none flex items-center justify-center z-10 shadow-[0_25px_60px_-15px_rgba(0,77,77,0.3)]"
                    >
                        <Check className="w-10 h-10 text-[#b87333] stroke-[3px]" />
                    </motion.div>

                    {/* Animated Decorative Rings */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.8 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 m-auto w-24 h-24 border border-[#b87333]/20"
                    />
                </div>

                {/* 2. Message Section */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4 mb-12"
                >
                    <h1 className="font-serif text-5xl md:text-6xl leading-tight">
                        Acquisition <br />
                        <span className="italic font-light text-gray-400">Complete.</span>
                    </h1>
                    <p className="max-w-md mx-auto text-gray-500 text-sm font-light leading-relaxed tracking-wide">
                        Your selection has been confirmed and is being prepared for its journey to your collection.
                    </p>
                </motion.div>

                {/* 3. Status Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white border border-gray-100 p-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative overflow-hidden"
                >
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#b87333] font-bold flex items-center gap-2">
                            <ReceiptText size={12} /> Reference ID
                        </p>
                        <p className="font-serif text-xl tracking-tighter">#LX-8829-PRM</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#b87333] font-bold flex items-center gap-2">
                            <Package size={12} /> Fulfillment
                        </p>
                        <p className="font-serif text-xl tracking-tighter italic text-gray-400">Hand-Picked Status</p>
                    </div>

                    {/* Visual Border Accent */}
                    <div className="absolute top-0 right-0 w-1 h-full bg-[#b87333]/10"></div>
                </motion.div>

                {/* 4. Interactive Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-16"
                >
                    <Link
                        href="/dashboard/orders"
                        className="group px-8 py-5 bg-[#004d4d] text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#b87333] transition-all duration-500 shadow-2xl flex items-center justify-center gap-3"
                    >
                        Track Progress
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>

                    <Link
                        href="/"
                        className="px-8 py-5 border border-gray-100 text-[#004d4d] text-[11px] font-bold uppercase tracking-[0.3em] hover:border-[#b87333] transition-all flex items-center justify-center gap-3 group"
                    >
                        <Home className="w-4 h-4 text-gray-300 group-hover:text-[#b87333] transition-colors" />
                        Return Home
                    </Link>
                </motion.div>

                {/* Footer Info */}
                <p className="mt-12 text-[10px] text-gray-400 uppercase tracking-widest italic font-light">
                    A confirmation receipt has been dispatched to your registered email.
                </p>
            </div>
        </div>
    );
};

export default OrderSuccess;
