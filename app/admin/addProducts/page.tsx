"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, DollarSign, Layers, Image as ImageIcon, Info, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    price: Number(data.price),
                    stock: Number(data.stock || 10),
                }),
            });

            if (response.ok) {
                alert("Product added successfully! 🎉");
                router.push("allProducts"); // প্রোডাক্ট লিস্টে পাঠিয়ে দেবে
            } else {
                alert("Failed to add product.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
            >
                <div className="p-8 sm:p-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Add New Product</h1>
                        <p className="text-slate-500 mt-2 font-medium">Fill in the details to list a new item in your shop.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Product Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Package size={14} /> Product Name
                            </label>
                            <input
                                name="name"
                                required
                                placeholder="e.g. Premium Leather Jacket"
                                className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300 font-semibold"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Info size={14} /> Description
                            </label>
                            <textarea
                                name="description"
                                rows={3}
                                placeholder="Describe your product..."
                                className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300 font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Price */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <DollarSign size={14} /> Price ($)
                                </label>
                                <input
                                    name="price"
                                    type="number"
                                    required
                                    placeholder="0.00"
                                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 font-bold"
                                />
                            </div>

                            {/* Stock */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Layers size={14} /> Stock Quantity
                                </label>
                                <input
                                    name="stock"
                                    type="number"
                                    defaultValue={10}
                                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 font-bold"
                                />
                            </div>
                        </div>

                        {/* Category & Image Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</label>
                                <select
                                    name="category"
                                    required
                                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-700 appearance-none cursor-pointer"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <ImageIcon size={14} /> Image URL
                                </label>
                                <input name="image" required placeholder="https://..." className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="w-full py-5 bg-indigo-600 text-white font-black rounded-[1.5rem] shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                "Publish Product"
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}



const categories = [
    "Apparel",
    "Footwear",
    "Bags & Backpacks",
    "Wallets & Cardholders",
    "Belts",
    "Watch Straps",
    "Jackets",
    "Office Accessories",
    "Home Decor",
    "Handcrafted Specials"
];
