"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Chrome, UserPlus, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/src/lib/auth-client';

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await authClient.signUp.email({
            name,
            email,
            password,
            callbackURL: "/",
        });
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd] py-20 px-6 overflow-hidden">
            {/* Soft Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#b87333] blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#004d4d] blur-[100px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-lg w-full bg-white border border-gray-100 p-8 md:p-14 shadow-2xl relative z-10"
            >
                {/* Header */}
                <div className="text-center mb-10 space-y-2">
                    <h2 className="font-serif text-3xl text-[#004d4d] tracking-tight">Create <span className="italic text-[#b87333]">Account</span></h2>
                    <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold">Join the Exclusive Lane</p>
                </div>

                {/* Google Quick Join */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-4 py-4 border border-gray-200 hover:border-[#b87333]/40 transition-all duration-300 mb-8 group"
                >
                    <Chrome className="w-4 h-4 text-[#b87333]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#004d4d]">Join with Google</span>
                </button>

                <div className="relative mb-10 text-center">
                    <span className="bg-white px-4 text-[9px] text-gray-300 uppercase tracking-[0.4em] relative z-10 font-bold">Or Manual Entry</span>
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100"></div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleRegister} className="grid grid-cols-1 gap-6">
                    <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                        <input
                            required
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full py-3 bg-transparent border-b border-gray-200 focus:border-[#b87333] outline-none transition-all text-sm font-light text-[#004d4d]"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                        <input
                            required
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-3 bg-transparent border-b border-gray-200 focus:border-[#b87333] outline-none transition-all text-sm font-light text-[#004d4d]"
                            placeholder="luxury@luxe.com"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Create Password</label>
                        <input
                            required
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full py-3 bg-transparent border-b border-gray-200 focus:border-[#b87333] outline-none transition-all text-sm font-light text-[#004d4d]"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center gap-3 py-2">
                        <ShieldCheck className="w-4 h-4 text-[#b87333]" />
                        <p className="text-[10px] text-gray-400 leading-tight">By joining, you agree to our <span className="underline cursor-pointer">Member Terms</span> and Privacy Policy.</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#004d4d] text-white py-5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#b87333] transition-all duration-500 flex items-center justify-center gap-3 shadow-xl mt-4"
                    >
                        Register Member <UserPlus className="w-4 h-4" />
                    </button>
                </form>

                {/* Switch to Login */}
                <div className="mt-10 text-center border-t border-gray-50 pt-8">
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                        Already a member? <Link href="/login" className="text-[#b87333] font-bold hover:underline ml-2 transition-all">Sign In Here</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
