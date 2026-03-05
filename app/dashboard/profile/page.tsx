"use client";
import React from "react";
import { motion } from "framer-motion";
import { Camera, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-10">
            <div className="flex items-end gap-6 relative">
                <div className="w-32 h-32 border-4 border-white shadow-xl relative group">
                    <img src="https://ui-avatars.com" alt="User" className="w-full h-full object-cover" />
                    <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                        <Camera size={20} />
                    </button>
                </div>
                <div className="pb-2">
                    <h2 className="font-serif text-3xl text-[#004d4d]">Alex <span className="italic font-light text-gray-400">Graham</span></h2>
                    <p className="text-[10px] font-bold text-[#b87333] uppercase tracking-[0.3em] flex items-center gap-2">
                        <ShieldCheck size={12} /> Verified Collector
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-10">
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email Address</label>
                    <p className="text-[#004d4d] font-medium text-sm border-b border-gray-50 pb-2">alex@luxelane.com</p>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Phone Number</label>
                    <p className="text-[#004d4d] font-medium text-sm border-b border-gray-50 pb-2">+1 234 567 890</p>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Member Since</label>
                    <p className="text-[#004d4d] font-medium text-sm border-b border-gray-50 pb-2">January 2024</p>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Shipping Region</label>
                    <p className="text-[#004d4d] font-medium text-sm border-b border-gray-50 pb-2">European Union</p>
                </div>
            </div>
        </motion.div>
    );
}
