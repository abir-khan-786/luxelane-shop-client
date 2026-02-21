"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Loading from "@/src/components/Loading/IsLoading";
import { Product } from "@/src/types/ProductType";

export default function UpdateProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const productId = resolvedParams.slug;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const router = useRouter();

    // ১. বর্তমান ডাটা ফেচ করা [Next.js Route Handlers](https://nextjs.org)
    useEffect(() => {
        async function getProduct() {
            // ❌ ভুল ছিল: if (productId) return
            // ✅ সঠিক: যদি আইডি না থাকে তবে রিটার্ন করবে
            if (!productId) return;

            try {
                const res = await fetch(`/api/products/${productId}`);

                if (!res.ok) throw new Error("Product fetch failed");

                const data: Product = await res.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        }
        getProduct();
    }, [productId]);

    // ২. আপডেট হ্যান্ডেলার [Next.js Server Actions](https://nextjs.org)
    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setUpdating(true);

        const formData = new FormData(e.currentTarget);
        const updatedData = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`/api/products/${productId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...updatedData,
                    price: Number(updatedData.price),
                    stock: Number(updatedData.stock)
                }),
            });

            if (res.ok) {
                alert("Product updated successfully! 🚀");
                router.push("/admin/allProducts");
                router.refresh();
            } else {
                alert("Failed to update on server");
            }
        } catch (error) {
            alert("Network error occurred");
        } finally {
            setUpdating(false);
        }
    }

    if (loading) return <Loading />;
    if (!product) return <div className="text-center py-20 font-bold">Product not found!</div>;

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100"
            >
                <h2 className="text-2xl font-black mb-6 text-slate-800 tracking-tight">
                    Update {product.name}
                </h2>

                <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-5">
                    {/* Product Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Name</label>
                        <input
                            name="name"
                            defaultValue={product.name}
                            required
                            className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-700 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Price */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Price ($)</label>
                            <input
                                name="price"
                                type="number"
                                defaultValue={product.price}
                                required
                                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
                            />
                        </div>
                        {/* Stock */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Stock</label>
                            <input
                                name="stock"
                                type="number"
                                defaultValue={product.stock}
                                required
                                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Image URL</label>
                        <input
                            name="image"
                            defaultValue={product.image}
                            required
                            className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-500"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Description</label>
                        <textarea
                            name="description"
                            defaultValue={product.description ?? ""}
                            rows={3}
                            className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-600 resize-none"
                        />
                    </div>

                    <button
                        disabled={updating}
                        className="mt-2 w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:bg-slate-300 active:scale-95"
                    >
                        {updating ? "Updating..." : "Save Product Changes"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
