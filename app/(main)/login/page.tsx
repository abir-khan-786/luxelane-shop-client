"use client";




import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { authClient } from '@/src/lib/auth-client';
import { Chrome, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast'; // ✅ এটি ব্যবহারের জন্য রেডি
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // গুগল লগইন [Better Auth Social](https://www.better-auth.com)
    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    // ইমেইল লগইন [Better Auth Sign In](https://www.better-auth.com)
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/admin"
            });

            if (error) {
                // ✅ এরর টোস্ট (User not found বা Invalid password এর জন্য)
                if (error) {
                    if (error.status === 401) {
                        toast.error("Invalid password. Please try again.");
                    } else if (error.status === 404) {
                        toast.error("No account found with this email.");
                    } else {
                        toast.error(error.message || "Login failed.");
                    }
                }

            } else {
                // ✅ সাকসেস টোস্ট
                toast.success("Welcome back to the Lane!", {
                    icon: '💼',
                    style: { borderRadius: '10px', background: '#b87333', color: '#fff', fontSize: '12px' }
                });
                router.push("/admin");
            }
        } catch (error) {
            toast.error("Something went wrong. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd] py-20 px-6 overflow-hidden text-[#004d4d]">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#b87333] blur-[120px]"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#004d4d] blur-[120px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md w-full bg-white border border-gray-100 p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative z-10"
            >
                <div className="text-center mb-12 space-y-2">
                    <Link href="/" className="font-serif text-3xl font-bold text-[#004d4d]">
                        LuxeLane<span className="text-[#b87333]">.</span>
                    </Link>
                    <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold">The Members Vault</p>
                </div>

                <h2 className="font-serif text-2xl text-[#004d4d] mb-8 text-center uppercase tracking-widest">Sign In</h2>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full flex items-center justify-center gap-4 py-5 border border-gray-200 hover:border-[#b87333]/50 transition-all duration-500 mb-8 group"
                >
                    <Chrome className="w-5 h-5 text-[#b87333]" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Continue with Google</span>
                </motion.button>

                <div className="relative mb-10 text-center">
                    <span className="bg-white px-4 text-[10px] text-gray-300 uppercase tracking-[0.4em] relative z-10 font-bold">Or Email</span>
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100"></div>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                    <div className="space-y-1 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-3 bg-transparent border-b border-gray-200 focus:border-[#b87333] outline-none transition-colors text-sm font-light"
                            placeholder="name@luxury.com"
                        />
                    </div>
                    <div className="space-y-1 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Secret Key</label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full py-3 bg-transparent border-b border-gray-200 focus:border-[#b87333] outline-none transition-colors text-sm font-light"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-[#004d4d] text-white py-5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#b87333] disabled:bg-gray-400 transition-all duration-500 flex items-center justify-center gap-3 shadow-xl group"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                            <>
                                Enter The Lane
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                        Not a member yet? <Link href="/register" className="text-[#b87333] font-bold hover:underline">Apply Here</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
