"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-12">
            <div>
                <h1 className="font-serif text-3xl text-[#004d4d]">Account <span className="italic font-light text-gray-400">Settings</span></h1>
                <p className="text-gray-400 text-xs mt-2">Manage your preferences and security.</p>
            </div>

            {/* Notification Section */}
            <div className="space-y-6">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b87333]">Preferences</h3>
                <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm">
                    <div>
                        <p className="text-[12px] font-bold text-[#004d4d]">Newsletter Subscription</p>
                        <p className="text-[10px] text-gray-400">Receive updates on limited edition drops.</p>
                    </div>
                    <div className="w-12 h-6 bg-[#004d4d] rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="space-y-6">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b87333]">Security</h3>
                <div className="space-y-4">
                    <button className="w-full text-left p-6 border border-gray-100 hover:border-[#b87333] transition-colors text-[11px] font-bold uppercase tracking-widest text-[#004d4d] flex justify-between items-center group">
                        Change Password
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                    <button className="w-full text-left p-6 border border-gray-100 hover:border-red-200 transition-colors text-[11px] font-bold uppercase tracking-widest text-red-800">
                        Deactivate Account
                    </button>
                </div>
            </div>

            <button className="px-10 py-5 bg-[#004d4d] text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#b87333] transition-all">
                Save All Changes
            </button>
        </motion.div>
    );
}
