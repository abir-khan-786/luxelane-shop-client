"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    Settings,
    Menu,
    X,
    LogOut,
    Plus
} from 'lucide-react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
        { name: 'All Products', icon: <ShoppingBag size={20} />, href: '/admin/allProducts' },
        { name: 'Orders', icon: <ShoppingBag size={20} />, href: '/admin/orders' },
        { name: 'Customers', icon: <Users size={20} />, href: '/admin/users' },
        { name: 'Settings', icon: <Settings size={20} />, href: '/admin/settings' },
    ];

    return (
        <div className="flex min-h-screen bg-[#f8f9fa]">
            {/* Mobile Toggle Button */}
            <button
                className="lg:hidden fixed top-6 left-6 z-[60] p-2 bg-[#004d4d] text-white rounded-md shadow-lg"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar Navigation */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="fixed lg:static inset-y-0 left-0 w-72 bg-[#004d4d] text-white z-50 flex flex-col p-8 shadow-2xl"
                    >
                        {/* Logo */}
                        <div className="mb-12">
                            <h2 className="font-serif text-2xl font-bold tracking-tight">
                                Luxe<span className="text-[#b87333]">Admin.</span>
                            </h2>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1 font-bold">Store Controller</p>
                        </div>

                        {/* Menu Links */}
                        <nav className="flex-grow space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition-all group border border-transparent hover:border-white/5"
                                >
                                    <span className="text-[#b87333] group-hover:scale-110 transition-transform">{item.icon}</span>
                                    <span className="text-sm font-medium tracking-wide">{item.name}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* Logout / Exit */}
                        <div className="pt-8 border-t border-white/10">
                            <Link href="/" className="flex items-center gap-4 p-4 text-gray-400 hover:text-white transition-colors">
                                <LogOut size={20} />
                                <span className="text-sm font-medium">Exit to Shop</span>
                            </Link>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Admin Content Area */}
            <main className="flex-grow p-6 lg:p-12 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
