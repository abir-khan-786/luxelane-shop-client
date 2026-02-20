"use client";
import React from 'react';
import { motion } from 'framer-motion';

const features = [
    { id: 1, title: 'Express Delivery', desc: 'Secure 24-hour shipping on all luxury orders.', icon: '📦' },
    { id: 2, title: 'Certified Quality', desc: 'Every piece is hand-inspected by our experts.', icon: '✨' },
    { id: 3, title: 'Exquisite Packaging', desc: 'Signature teal & copper box with every purchase.', icon: '🎁' },
];

const Features = () => {
    return (
        <section className="py-24 bg-[#004d4d] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 text-center">
                    {features.map((f, index) => (
                        <motion.div
                            key={f.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="flex flex-col items-center space-y-6 group"
                        >
                            {/* Animated Icon Container */}
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="relative w-20 h-20 flex items-center justify-center text-4xl bg-white/5 border border-[#b87333]/20 rounded-2xl transition-colors group-hover:border-[#b87333]"
                            >
                                {/* Background Glow Effect */}
                                <div className="absolute inset-0 bg-[#b87333]/0 group-hover:bg-[#b87333]/10 blur-xl transition-all duration-500 rounded-full"></div>

                                <span className="relative z-10 drop-shadow-2xl">{f.icon}</span>
                            </motion.div>

                            {/* Text with Copper Highlight */}
                            <div className="space-y-3">
                                <h3 className="font-serif text-2xl tracking-wide text-white group-hover:text-[#b87333] transition-colors duration-300">
                                    {f.title}
                                </h3>
                                <p className="text-gray-400 text-sm font-light leading-relaxed max-w-[280px] mx-auto opacity-80 group-hover:opacity-100 transition-opacity">
                                    {f.desc}
                                </p>
                            </div>

                            {/* Unique Animated Line */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "40px" }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="h-[1px] bg-gradient-to-r from-transparent via-[#b87333] to-transparent"
                            ></motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
