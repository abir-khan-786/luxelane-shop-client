"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Trash2, Plus, Search, Package } from "lucide-react";
import Link from "next/link";
import Loading from "@/src/components/Loading/IsLoading";
import { useParams } from "next/navigation";
import { Product } from "@prisma/client";

export default function AdminProductTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const resolvedParams = useParams();
    const id = resolvedParams.id;

    // ✅ ১. আগে ফাংশনটি ডিফাইন করুন
    async function fetchProducts() {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    }

    // ✅ ২. তারপর useEffect-এ কল করুন
    useEffect(() => {
        fetchProducts();
    }, []);

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this product?")) return;
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (res.ok) {
            setProducts(products.filter((p) => p.id !== id));
        }
    }

    // ফিল্টার লজিক
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
            <div className="max-w-7xl mx-auto">
                {/* হেডার ও সার্চবার */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Product Management</h1>
                        <p className="text-slate-500 text-sm font-medium">Total {products.length} items in your inventory.</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
                            />
                        </div>
                        <Link href={`addProducts`}>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all text-sm shadow-lg shadow-indigo-100">
                                <Plus size={18} /> Add New
                            </button>
                        </Link>
                    </div>
                </div>

                {/* টেবিল সেকশন */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Product</th>
                                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Price</th>
                                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Stock</th>
                                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <AnimatePresence>
                                    {filteredProducts.map((product) => (
                                        <motion.tr
                                            key={product.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="hover:bg-slate-50/80 transition-colors group"
                                        >
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <img src={product.image} className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm" alt="" />
                                                    <span className="font-bold text-slate-700 block max-w-[200px] truncate">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-wider">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="p-5 font-black text-slate-600">${product.price}</td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
                                                    <span className="text-sm font-bold text-slate-500">{product.stock} Pcs</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link href={`/admin/allProducts/${product.id}`}>
                                                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                                            <Edit3 size={18} /> EDMI
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-20 text-center flex flex-col items-center gap-4">
                            <Package size={48} className="text-slate-200" />
                            <p className="text-slate-400 font-bold">No products found!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
