"use client";
import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    { id: 1, name: 'Exclusive Watches', count: '12 Items', img: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg' },
    { id: 2, name: 'Leather Goods', count: '08 Items', img: 'https://images.pexels.com/photos/4452399/pexels-photo-4452399.jpeg' }, // ভিন্ন ইমেজ দিয়েছি দেখতে ভালো লাগবে
    { id: 3, name: 'Fragrance', count: '05 Items', img: 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg' }, // ভিন্ন ইমেজ
];

const Categories = () => {
    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Section Title with Animation */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 space-y-2"
                >
                    <span className="text-[#b87333] text-[10px] font-bold uppercase tracking-[0.3em] block">The Selection</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#004d4d]">
                        Shop by <span className="italic font-light text-gray-400">Category</span>
                    </h2>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group relative overflow-hidden cursor-pointer aspect-[4/5] bg-gray-100 shadow-lg"
                        >
                            {/* Image: Grayscale সরিয়ে দেওয়া হয়েছে, এখন সবসময় কালারফুল */}
                            <motion.img
                                src={cat.img}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#004d4d]/90 via-[#004d4d]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-[#b87333] text-[10px] uppercase tracking-[0.2em] font-bold mb-1"
                                >
                                    {cat.count}
                                </motion.p>

                                <h3 className="text-white text-xl md:text-2xl font-serif mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                                    {cat.name}
                                </h3>

                                {/* Animated Button line */}
                                <div className="relative overflow-hidden w-fit">
                                    <button className="text-white text-[10px] font-bold uppercase tracking-[0.2em] pb-1">
                                        Explore Collection
                                    </button>
                                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b87333] group-hover:w-full transition-all duration-500"></div>
                                </div>
                            </div>

                            {/* Inner Border on Hover */}
                            <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
