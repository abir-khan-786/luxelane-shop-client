"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../../../src/components/Loading/Loading";
import Image from "next/image";
import { CreditCard, Package, Calendar, ChevronRight, CheckCircle2, Clock, Delete } from "lucide-react";

export interface OrderItem {
    id: string | number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface Order {
    id: string;
    items: OrderItem[];
    totalAmount: number;
    status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED";
    createdAt: string;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchOrders() {
        try {
            const res = await fetch("/api/orders");
            const data = await res.json();
            setOrders(Array.isArray(data) ? (data as Order[]) : []);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchOrders(); }, []);

    if (loading) return <Loading />;

    return (
        <div className="max-w-6xl mx-auto pb-20 text-[#004d4d]">
            {/* Header */}
            <header className="mb-12 flex justify-between items-end border-b border-gray-100 pb-8">
                <div className="space-y-2">
                    <h1 className="font-serif text-4xl">My <span className="italic font-light text-gray-400">Orders</span></h1>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#b87333] font-bold">Trace your acquisitions</p>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Active Orders</p>
                    <p className="text-2xl font-serif">{orders.filter(o => o.status !== 'DELIVERED').length.toString().padStart(2, '0')}</p>
                </div>
            </header>

            <AnimatePresence>
                {orders.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-gray-50/50 border border-dashed border-gray-200">
                        <Package className="mx-auto text-gray-300 mb-4" size={40} />
                        <p className="font-serif italic text-gray-400">No orders found in your collection.</p>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, idx) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white border border-gray-100 p-6 md:p-8 hover:shadow-xl hover:shadow-[#004d4d]/5 transition-all duration-500 group"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-8">
                                    {/* 1. Order Info */}
                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] bg-[#004d4d] text-white px-2 py-0.5 font-bold tracking-widest">
                                                #{order.id.slice(-8).toUpperCase()}
                                            </span>
                                            <div className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest ${order.status === 'DELIVERED' ? 'text-green-600' : 'text-[#b87333]'
                                                }`}>
                                                {order.status === 'DELIVERED' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                                {order.status}
                                            </div>
                                        </div>

                                        {/* Product Mini Gallery */}
                                        <div className="flex flex-wrap gap-3">
                                            {order.items?.map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 bg-gray-50 pr-4 border border-transparent hover:border-[#b87333]/20 transition-colors">
                                                    <div className="relative w-12 h-14 bg-white flex-shrink-0">
                                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] font-bold uppercase tracking-tight line-clamp-1">{item.name}</p>
                                                        <p className="text-[9px] text-gray-400">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 2. Order Metadata */}
                                    <div className="flex flex-row md:flex-col justify-between items-end md:text-right border-t md:border-t-0 border-gray-50 pt-4 md:pt-0">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center md:justify-end gap-1">
                                                <Calendar size={10} /> Date
                                            </p>
                                            <p className="text-[12px] font-medium uppercase tracking-tighter">
                                                {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>

                                        <div className="space-y-1 mt-auto">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Total Investment</p>
                                            <p className="text-xl font-serif font-bold text-[#004d4d]">${order.totalAmount.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    {/* 3. Actions */}
                                    <div className="flex md:flex-col gap-2 justify-center">
                                        {order.status === 'PENDING' && (
                                            <button className="flex-1 md:flex-none bg-[#004d4d] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#b87333] transition-all flex items-center justify-center gap-2">
                                                <CreditCard size={14} /> Pay Now
                                            </button>
                                        )}
                                        <button className="flex-1 md:flex-none border border-gray-200 text-[#004d4d] px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:border-[#b87333] transition-all flex items-center justify-center gap-2 group-hover:bg-gray-50">
                                            Details <ChevronRight size={12} />
                                        </button>
                                        <button className="flex-1 md:flex-none border border-gray-200 bg-red-300 text-[#004d4d] px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:border-[#b87333] transition-all flex items-center justify-center gap-2  ">
                                            Cancel <Delete size={12} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
