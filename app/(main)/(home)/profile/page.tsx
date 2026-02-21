"use client";

import { motion } from "framer-motion";
import { User, Mail, Shield, LogOut, Settings, Camera } from "lucide-react"; // আইকনের জন্য [Lucide React](https://lucide.dev)
import Loading from "@/src/components/Loading/IsLoading";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";




export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();


    // ✅ রিডাইরেক্ট লজিক useEffect-এর ভেতরে নিন
    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    // ১. ডাটা লোড হওয়া পর্যন্ত ওয়েট করুন
    if (isPending) {
        return <Loading />;
    }

    // ২. সেশন না থাকলে কিছুই রেন্ডার করবেন না (useEffect রিডাইরেক্ট না করা পর্যন্ত)
    if (!session) {
        return null;
    }


    // এনিমেশন ভেরিয়েন্ট [Framer Motion Stagger](https://www.framer.com)
    const containerVars = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVars = {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                variants={containerVars}
                initial="initial"
                animate="animate"
                className="max-w-4xl mx-auto space-y-6"
            >
                {/* প্রোফাইল হেডার কার্ড */}
                <motion.div variants={itemVars} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-indigo-50 shadow-inner">
                            {session.user.image ? (
                                <img src={session.user.image} className="w-full h-full object-cover" alt="User" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                    {session.user.name?.charAt(0)}
                                </div>
                            )}
                        </div>
                        {/* ভবিষ্যতে এডিট ইমেজ যোগ করার জন্য বাটন */}
                        <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-indigo-600 hover:scale-110 transition-transform">
                            <Camera size={18} />
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{session.user.name}</h1>
                        <p className="text-slate-500 font-medium mt-1">Premium Member</p>
                        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                            <span className="px-4 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">Active Now</span>
                            <span className="px-4 py-1 bg-slate-50 text-slate-500 text-xs font-bold rounded-full uppercase tracking-wider">Free Plan</span>
                        </div>
                    </div>

                    <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                        <Settings size={24} />
                    </button>
                </motion.div>

                {/* ইনফরমেশন গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* পার্সোনাল ডিটেইলস */}
                    <motion.div variants={itemVars} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <User className="text-indigo-500" size={20} /> Personal Information
                        </h2>
                        <div className="space-y-4">
                            <InfoItem label="Full Name" value={session.user.name} />
                            <InfoItem label="Email Address" value={session.user.email} />
                        </div>
                    </motion.div>

                    {/* সিকিউরিটি সেকশন */}
                    <motion.div variants={itemVars} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Shield className="text-emerald-500" size={20} /> Security & Privacy
                        </h2>
                        <div className="space-y-4">
                            <InfoItem label="Account Type" value="Standard" />
                            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-2xl">
                                <span className="text-xs font-bold text-emerald-700 uppercase">Email Verified</span>
                                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* অ্যাকশন বাটন */}
                <motion.div variants={itemVars} className="flex justify-end gap-4">
                    <button
                        onClick={async () => {
                            await authClient.signOut();
                            router.push("/login");
                        }}
                        className="flex items-center gap-2 px-8 py-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-all active:scale-95"
                    >
                        <LogOut size={20} /> Log Out Account
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}

// সাব-কম্পোনেন্ট: ভবিষ্যতে এখানে ইনপুট ফিল্ড যোগ করা যাবে [Tailwind Reusable Classes](https://tailwindcss.com)
function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="group">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-transparent group-hover:border-indigo-100 group-hover:bg-white transition-all">
                <p className="text-slate-700 font-semibold">{value}</p>
            </div>
        </div>
    );
}
