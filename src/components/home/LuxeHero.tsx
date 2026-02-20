"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const LuxeHero = () => {
    // এনিমেশন ভেরিয়েন্ট ফিক্সড এবং টাইপ-সেফ
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        },
    };

    return (
        <section className="relative min-h-[90vh] md:h-screen flex items-center bg-[#fdfdfd] pt-20 md:pt-0 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Text Content Area */}
                <motion.div
                    className="text-center md:text-left space-y-6 md:space-y-10 order-2 md:order-1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="space-y-3">
                        <motion.span
                            variants={itemVariants}
                            className="text-[#b87333] text-xs font-bold tracking-[0.4em] uppercase block"
                        >
                            Premier Boutique
                        </motion.span>

                        <motion.h1
                            variants={itemVariants}
                            className="font-serif text-5xl md:text-8xl text-[#004d4d] leading-tight md:leading-[0.9]"
                        >
                            Pure <br />
                            <span className="italic font-light text-gray-400">
                                Excellence.
                            </span>
                        </motion.h1>
                    </div>

                    <motion.p
                        variants={itemVariants}
                        className="max-w-md mx-auto md:mx-0 text-gray-500 text-base md:text-lg font-light leading-relaxed"
                    >
                        Curated collections of the finest timepieces and leather goods, crafted for those who appreciate the subtle art of luxury.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-[#004d4d] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#b87333] transition-all duration-500 shadow-lg"
                        >
                            Shop The Selection
                        </motion.button>

                        <motion.button
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                            className="px-10 py-5 border border-gray-200 text-[#004d4d] text-[11px] font-bold uppercase tracking-widest hover:border-[#b87333] transition-all"
                        >
                            Our Process
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Visual Element Area (Always Color) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="order-1 md:order-2 relative w-full aspect-square md:aspect-[4/5] overflow-hidden bg-gray-50 group shadow-2xl"
                >
                    <motion.img
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2 }}
                        src="https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg"
                        alt="Luxury Fashion"
                        /* grayscale এবং group-hover:grayscale-0 রিমুভ করা হয়েছে */
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                    />

                    {/* Animated Corner Border */}
                    <motion.div
                        initial={{ width: 0, height: 0 }}
                        animate={{ width: "96px", height: "96px" }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute top-0 right-0 border-t-2 border-r-2 border-[#b87333]/40"
                    ></motion.div>

                    <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border-l-2 border-[#b87333] p-4">
                        <p className="text-white text-[10px] uppercase tracking-widest font-bold">Limited Edition</p>
                        <p className="text-gray-300 text-[9px]">Handcrafted in 2026</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LuxeHero;
