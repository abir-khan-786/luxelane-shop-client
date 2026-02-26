"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Search } from "lucide-react";
import { useCart } from "@/src/store/useCart";
import { useState } from "react";
import { IProduct } from "@/src/types/ProductType";
import { useQuery } from "@tanstack/react-query";

export default function ShopPage() {
    const { addItem, onOpen } = useCart();
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, isError } = useQuery<IProduct[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch("/api/products");
            if (!res.ok) throw new Error("Failed to fetch products");
            return res.json();
        },
    });

    const filteredProducts =
        data?.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="animate-pulse text-[#004d4d]">Loading products...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Failed to load products</p>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen bg-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
                <div>
                    <h1 className="font-serif text-5xl text-[#004d4d] tracking-tight">
                        Collections
                    </h1>
                    <p className="text-gray-400 text-sm mt-3 font-light tracking-widest uppercase">
                        Curated luxury for the modern individual
                    </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                    <input
                        type="text"
                        placeholder="Search product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border px-4 py-2 text-sm outline-none"
                    />

                    <div className="text-[#b87333] text-xs font-bold uppercase tracking-[0.3em] border-b border-[#b87333] pb-1">
                        {filteredProducts.length} Masterpieces
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="group flex flex-col">
                        <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f9f9] mb-6">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill  // এটি নিশ্চিত করুন
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-[#004d4d]/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                <Link
                                    href={`/shop/${product.id}`}
                                    className="p-4 bg-white text-[#004d4d] rounded-full hover:bg-[#b87333] hover:text-white transition shadow-xl"
                                >
                                    <Search className="w-5 h-5" />
                                </Link>

                                <button
                                    onClick={() => {
                                        addItem(product);
                                        onOpen();
                                    }}
                                    className="p-4 bg-white text-[#004d4d] rounded-full hover:bg-[#004d4d] hover:text-white transition shadow-xl"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                                {product.category}
                            </p>

                            <Link href={`/shop/${product.id}`}>
                                <h3 className="font-serif text-2xl text-[#004d4d] hover:text-[#b87333] transition cursor-pointer">
                                    {product.name}
                                </h3>
                            </Link>

                            <div className="flex items-center gap-4">
                                <span className="h-[1px] w-8 bg-[#b87333]/30"></span>
                                <p className="text-[#b87333] font-bold tracking-widest text-lg">
                                    ${product.price.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-400 mt-20">
                    No products found.
                </p>
            )}
        </div>
    );
}