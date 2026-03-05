"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, User, LogOut, Home, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Overview", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "My Orders", href: "/dashboard/orders", icon: <ShoppingBag size={18} /> },
        { name: "Profile", href: "/dashboard/profile", icon: <User size={18} /> },
        { name: "Settings", href: "/dashboard/settings", icon: <Settings size={18} /> },
    ];

    return (
        <div className="flex min-h-screen bg-[#fdfdfd] text-[#004d4d]">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-100 hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-8 border-b border-gray-50">
                    <Link href="/" className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight">
                        <div className="w-8 h-8 bg-[#004d4d] flex items-center justify-center text-white text-xs">L</div>
                        <span>Luxe<span className="italic font-light text-gray-400">Lane.</span></span>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-2 mt-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#b87333] font-bold mb-6 ml-2">Main Menu</p>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href}>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className={`flex items-center gap-4 px-4 py-4 rounded-none transition-all duration-300 ${isActive
                                        ? "bg-[#004d4d] text-white shadow-lg"
                                        : "text-gray-500 hover:text-[#004d4d] hover:bg-gray-50"
                                        }`}
                                >
                                    {item.icon}
                                    <span className="text-[11px] font-bold uppercase tracking-widest">{item.name}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-8 border-t border-gray-50">
                    <button className="flex items-center gap-3 w-full text-[11px] font-bold uppercase tracking-widest text-red-800 hover:text-red-500 transition-colors">
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#b87333] animate-pulse"></div>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Member Status: Gold</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-[11px] font-bold uppercase tracking-tight text-[#004d4d]">Alex Graham</p>
                            <p className="text-[9px] text-gray-400">alex@luxelane.com</p>
                        </div>
                        <div className="w-10 h-10 border border-[#b87333] p-0.5">
                            <img src="https://ui-avatars.com" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                <section className="p-10 max-w-6xl mx-auto w-full">
                    {children}
                </section>
            </main>
        </div>
    );
}
