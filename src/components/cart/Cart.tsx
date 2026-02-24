"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/src/store/useCart';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react'; // Plus, Minus add kora hoyeche
import Link from 'next/link';

const CartDrawer = () => {
    // addItem function-ta ekhane add koro jate quantity barano jay
    const { isOpen, onClose, cartItems, removeItem, addItem } = useCart();

    // Total Price calculation with Quantity
    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + (item.price * (item.quantity || 1));
    }, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Background Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99] cursor-pointer"
                    />

                    {/* Cart Content */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.5, ease: "circOut" }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[100] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#004d4d] text-white">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-[#b87333]" />
                                <h2 className="font-serif text-xl tracking-wide">
                                    Your Selection ({cartItems.length})
                                </h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform duration-300">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items List */}
                        <div className="flex-grow overflow-y-auto p-8 space-y-8">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <p className="font-serif text-gray-400 italic">Your bag is currently empty.</p>
                                    <button onClick={onClose} className="text-[#b87333] text-xs font-bold uppercase tracking-widest border-b border-[#b87333]">Continue Browsing</button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <motion.div layout key={item.id} className="flex gap-6 group">
                                        <div className="w-24 h-32 bg-gray-50 overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                        <div className="flex flex-col justify-between flex-grow py-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-serif text-[#004d4d] text-lg leading-tight">{item.name}</h4>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{item.category}</p>
                                                </div>
                                                <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center border border-gray-100 rounded-sm">
                                                    <button
                                                        onClick={() => removeItem(item.id)} // current removeItem logic single delete hole, decrement logic store-e thaka bhalo
                                                        className="p-1 hover:text-[#b87333]"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="px-3 text-xs font-bold text-[#004d4d]">{item.quantity || 1}</span>
                                                    <button
                                                        onClick={() => addItem(item)}
                                                        className="p-1 hover:text-[#b87333]"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                <p className="text-[#b87333] font-bold">
                                                    ${item.price * (item.quantity || 1)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Checkout Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-8 border-t border-gray-100 space-y-6 bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 uppercase text-[10px] font-bold tracking-widest">Subtotal</span>
                                    <span className="text-[#004d4d] font-serif text-2xl">${totalPrice}</span>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={onClose}
                                    className="block w-full bg-[#004d4d] text-white py-5 text-center text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#b87333] transition-all duration-500 shadow-xl"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
