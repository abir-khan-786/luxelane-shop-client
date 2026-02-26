"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/src/store/useCart";
import { ShoppingBag, ChevronLeft, Star } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

// Product interface (match your API)
interface IProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

export default function ProductDetails({ }) {
    const { slug } = useParams<{ slug: string }>();
    const { addItem, onOpen } = useCart();

    // TanStack Query fetch
    const { data, isLoading, isError } = useQuery<IProduct>({
        queryKey: ["products", slug],
        queryFn: async () => {
            const res = await fetch(`/api/products/${slug}`);
            if (!res.ok) throw new Error("Failed to fetch product");
            return res.json();
        },
        enabled: !!slug, // only run if id exists
    });
    console.log(data)

    if (isLoading) {
        return (
            <div className="pt-40 text-center font-serif text-xl animate-pulse text-[#004d4d]">
                Loading product...
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="pt-40 text-center font-serif text-2xl text-red-500">
                Product not found.
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
            {/* Back Link */}
            <Link
                href="/shop"
                className="flex items-center text-gray-400 hover:text-[#b87333] mb-8 transition-colors"
            >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Collections
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img
                        src={data.image}
                        alt={data.name}

                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center">
                    <p className="text-[12px] uppercase tracking-[0.3em] text-[#b87333] font-bold mb-4">
                        {data.category}
                    </p>

                    <h1 className="font-serif text-4xl md:text-5xl text-[#004d4d] mb-6 leading-tight">
                        {data.name}
                    </h1>

                    {/* Ratings */}
                    <div className="flex items-center gap-2 mb-6 text-gray-400">
                        <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                        </div>
                        <span className="text-xs">(24 Customer Reviews)</span>
                    </div>

                    <p className="text-2xl font-bold text-gray-900 mb-8">
                        ${data.price.toLocaleString()}
                    </p>

                    <div className="border-t border-b border-gray-100 py-8 mb-10">
                        <p className="text-gray-500 leading-relaxed font-light">
                            {data.description}
                        </p>
                    </div>

                    {/* Add to Cart */}
                    <button
                        onClick={() => {
                            addItem(data);
                            onOpen();
                        }}
                        className="w-full md:w-max px-12 py-4 bg-[#004d4d] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#b87333] transition-all duration-500 flex items-center justify-center gap-3"
                    >
                        <ShoppingBag className="w-5 h-5" /> Add To Bag
                    </button>
                </div>
            </div>
        </div>
    );
}