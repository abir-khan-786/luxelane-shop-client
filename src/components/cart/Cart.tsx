"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/src/store/useCart';
import { X, ShoppingBag, Trash2 } from 'lucide-react';

const CartDrawer = () => {
    const { isOpen, onClose, cartItems, removeItem } = useCart();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-99 cursor-pointer"
                    />

                    {/* Cart Content */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.5, ease: "circOut" }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-100 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#004d4d] text-white">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-[#b87333]" />
                                <h2 className="font-serif text-xl tracking-wide">Your Selection</h2>
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
                                        <div className="w-24 h-32 bg-gray-50 overflow-hidden">
                                            <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                        <div className="flex flex-col justify-between flex-grow py-1">
                                            <div>
                                                <h4 className="font-serif text-[#004d4d] text-lg">{item.name}</h4>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.category}</p>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <p className="text-[#b87333] font-bold">${item.price}</p>
                                                <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
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
                                <p className="text-[10px] text-gray-400 italic text-center">Shipping & taxes calculated at checkout.</p>
                                <button className="w-full bg-[#004d4d] text-white py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#b87333] transition-all duration-500 shadow-xl">
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
