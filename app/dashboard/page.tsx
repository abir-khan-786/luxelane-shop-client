"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Package, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/src/lib/auth-client";

export default function DashboardPage() {
    const { data: session } = authClient.useSession();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await fetch("/api/orders");
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Dashboard error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    // ক্যালকুলেশন
    const activeOrdersCount = orders.filter(o => o.status !== "DELIVERED").length;
    const totalSpent = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

    if (loading) return (
        <div className="h-96 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#b87333]" size={32} />
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            {/* Welcome Header */}
            <div>
                <h1 className="font-serif text-4xl text-[#004d4d]">
                    Welcome, <span className="italic font-light text-gray-400">{session?.user?.name?.split(" ")[0]}.</span>
                </h1>
                <p className="text-gray-500 text-sm mt-2 font-light tracking-wide">
                    You have <span className="text-[#b87333] font-bold">{activeOrdersCount}</span> active acquisitions in your collection.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: "Active Orders", value: activeOrdersCount.toString().padStart(2, '0'), icon: <Package size={20} /> },
                    { label: "Total Investment", value: `$${totalSpent.toLocaleString()}`, icon: <Star size={20} /> },
                    { label: "Total Orders", value: orders.length.toString().padStart(2, '0'), icon: <Clock size={20} /> },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 border border-gray-100 relative group overflow-hidden shadow-sm hover:border-[#b87333]/30 transition-all">
                        <div className="text-[#b87333] mb-4">{stat.icon}</div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">{stat.label}</p>
                        <h3 className="text-3xl font-serif mt-2 text-[#004d4d]">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Recent Order Preview */}
            <div className="bg-white border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#004d4d]">Recent Acquisitions</h3>
                    <Link href="/dashboard/orders" className="text-[10px] font-bold uppercase tracking-widest text-[#b87333] flex items-center gap-2 hover:gap-3 transition-all">
                        View All <ArrowRight size={12} />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Reference</th>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Status</th>
                                <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 text-right">Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 text-[11px] font-bold uppercase tracking-tighter">
                                        #{order.id.slice(-8).toUpperCase()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${order.status === 'DELIVERED' ? 'text-green-600 bg-green-50' : 'text-[#b87333] bg-[#b87333]/5'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-[11px] text-right font-bold text-[#004d4d]">
                                        ${order.totalAmount.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
