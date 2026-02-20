"use client";
import React from 'react';
import { motion } from 'framer-motion';

const BrandStory = () => {
    return (
        <section className="py-24 md:py-32 bg-[#fdfdfd] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Artistic Image with Floating Elements */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative group"
                >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
                        <img
                            src="https://images.pexels.com/photos/3184285/pexels-photo-3184285.jpeg"
                            alt="Craftsmanship"
                            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                        />
                        {/* Dark Overlay with Copper Border */}
                        <div className="absolute inset-0 border-[15px] border-white/10 group-hover:border-[#b87333]/20 transition-all duration-500"></div>
                    </div>

                    {/* Floating Card (Unique Element) */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="absolute -bottom-8 -right-8 md:right-[-20px] bg-[#004d4d] p-8 md:p-10 text-white shadow-2xl hidden sm:block"
                    >
                        <p className="text-[#b87333] text-4xl font-serif mb-2">100%</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-300">Authentic Luxury</p>
                    </motion.div>
                </motion.div>

                {/* Right Side: Narrative Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <span className="text-[#b87333] text-xs font-bold tracking-[0.4em] uppercase">Since 2024</span>
                        <h2 className="font-serif text-4xl md:text-6xl text-[#004d4d] leading-tight">
                            Crafting <span className="italic font-light text-gray-400 underline decoration-[#b87333]/30">Legacy</span> <br />
                            Through Details.
                        </h2>
                    </div>

                    <p className="text-gray-600 text-lg font-light leading-relaxed">
                        At LuxeLane, we believe luxury isnt a price tagits a narrative. Every piece in our collection is selected for its soul, its story, and its ability to transcend time.
                    </p>

                    <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-[#b87333] pl-6 italic">
                        Our mission is to bring the worlds most exquisite copper-toned essentials and teal-infused aesthetics directly to your doorstep.
                    </p>

                    <div className="pt-4">
                        <button className="group flex items-center gap-4 text-[#004d4d] font-bold text-xs uppercase tracking-widest">
                            Explore Our Philosophy
                            <span className="w-12 h-[1px] bg-[#b87333] transition-all group-hover:w-20"></span>
                        </button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default BrandStory;
