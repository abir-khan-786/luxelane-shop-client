"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/src/store/useCart';
import { CreditCard, Truck, ChevronLeft, ShoppingBag, ShieldCheck, Globe } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { authClient } from '@/src/lib/auth-client';
import Image from 'next/image';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useCart();
    const router = useRouter();
    const { data: session } = authClient.useSession();

    // Shipping State
    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        phone: ""
    });

    const autoFilledRef = useRef(false);

    // অটোমেটিক ইউজার ডাটা ফিল করা
    useEffect(() => {
        if (!autoFilledRef.current && session?.user?.name) {
            const names = session.user.name.split(" ");
            setTimeout(() => {
                setAddress(prev => ({
                    ...prev,
                    firstName: names[0] || "",
                    lastName: names.slice(1).join(" ") || ""
                }));
            }, 0);
            autoFilledRef.current = true;
        }
    }, [session]);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    const handleConfirmOrder = async () => {
        if (!session) return router.push("/login");
        if (cartItems.length === 0) return toast.error("Your collection is empty");

        if (!address.street || !address.phone || !address.city) {
            return toast.error("Please provide complete delivery details");
        }

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartItems,
                    totalAmount: subtotal,
                    shippingAddress: address,
                    customerName: `${address.firstName} ${address.lastName}`,
                }),
            });

            if (response.ok) {
                toast.success("Acquisition Confirmed");
                clearCart();
                router.push("/checkout/success");
            } else {
                toast.error("Process failed. Please try again.");
            }
        } catch {
            toast.error("Network instability detected.");
        }
    };

    return (
        <div className="min-h-screen bg-[#fdfdfd] pt-32 pb-24 px-6 lg:px-16 text-[#004d4d]">
            <div className="max-w-7xl mx-auto">
                {/* Navigation Header */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between items-center mb-16 border-b border-gray-100 pb-8">
                    <Link href="/shop" className="group flex items-center text-[#b87333] text-[10px] uppercase font-bold tracking-[0.3em]">
                        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Boutique
                    </Link>
                    <div className="hidden md:flex gap-8 text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400">
                        <span className="text-[#b87333]">01 Bag</span>
                        <span className="text-[#004d4d]">02 Checkout</span>
                        <span>03 Confirmation</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Left: Client Logistics */}
                    <div className="lg:col-span-7 space-y-20">
                        <section className="space-y-12">
                            <div className="space-y-2">
                                <h2 className="font-serif text-4xl leading-tight">Client <span className="italic font-light text-gray-400 text-3xl block md:inline">Logistics.</span></h2>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-[#b87333] font-bold">Secure Delivery Details</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                                {['firstName', 'lastName', 'street', 'city', 'phone'].map((field) => (
                                    <div key={field} className={`relative ${field === 'street' ? 'md:col-span-2' : ''}`}>
                                        <input
                                            type="text"
                                            value={address[field as keyof typeof address]}
                                            onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
                                            className="peer w-full py-4 border-b border-gray-200 outline-none focus:border-[#b87333] transition-all text-sm font-light bg-transparent placeholder-transparent"
                                            placeholder={field}
                                        />
                                        <label className="absolute left-0 -top-4 text-[#b87333] text-[9px] uppercase font-bold tracking-[0.2em] transition-all peer-placeholder-shown:text-gray-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-[9px]">
                                            {field.replace(/([A-Z])/g, ' $1')}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-8">
                            <h3 className="font-serif text-xl italic font-light">Payment Method</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <button className="flex flex-col items-start gap-4 p-6 border border-[#b87333] bg-[#b87333]/5 text-[#b87333] group relative overflow-hidden">
                                    <CreditCard size={20} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Digital Transaction</span>
                                    <div className="absolute right-4 top-4 w-2 h-2 rounded-full bg-[#b87333]"></div>
                                </button>
                                <button className="flex flex-col items-start gap-4 p-6 border border-gray-100 text-gray-300 hover:border-[#004d4d] hover:text-[#004d4d] transition-all">
                                    <Truck size={20} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Cash on Collection</span>
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Right: Investment Summary */}
                    <div className="lg:col-span-5">
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-gray-100 p-12 sticky top-32">
                            <h3 className="font-serif text-2xl mb-10 flex items-center gap-3">
                                <ShoppingBag size={22} className="text-[#b87333]" />
                                Your <span className="italic font-light text-gray-400">Curations</span>
                            </h3>

                            <div className="space-y-8 max-h-[35vh] overflow-y-auto mb-10 pr-4 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-6 items-center border-b border-gray-50 pb-6 group">
                                        <div className="w-16 h-20 bg-gray-50 overflow-hidden relative">
                                            <Image src={item.image} alt={item.name} fill className='object-cover group-hover:scale-110 transition-transform duration-700' />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h4 className="text-[11px] font-bold uppercase tracking-widest">{item.name}</h4>
                                            <p className="text-[10px] text-[#b87333] font-bold tracking-tighter italic">Ref: #{String(item.id).slice(0, 5)}</p>
                                            <p className="text-[10px] text-gray-400 mt-2 italic">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="text-[12px] font-serif font-bold text-[#004d4d]">${(item.price * (item.quantity || 1)).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-5 border-t border-gray-100 pt-8">
                                <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                                    <span>Subtotal</span>
                                    <span className="text-[#004d4d]">${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                                    <span>Insurance & Freight</span>
                                    <span className="text-[#b87333] italic tracking-normal">Complimentary</span>
                                </div>
                                <div className="flex justify-between items-end pt-6 border-t border-gray-50 mt-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#b87333] font-bold mb-1">Total Investment</p>
                                        <span className="text-3xl font-serif text-[#004d4d] tracking-tighter">USD ${subtotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirmOrder}
                                className="w-full mt-12 py-6 bg-[#004d4d] text-white text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-[#b87333] transition-all duration-700 shadow-2xl relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    Finalize Acquisition <span className="text-lg group-hover:translate-x-2 transition-transform duration-500">→</span>
                                </span>
                            </button>

                            <div className="mt-10 flex flex-col items-center gap-4 text-center">
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <ShieldCheck size={12} className="text-[#b87333]" /> Secured by 256-bit encryption
                                </p>
                                <div className="flex gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                                    <Globe size={18} className="text-gray-400" />
                                    <CreditCard size={18} className="text-gray-400" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
