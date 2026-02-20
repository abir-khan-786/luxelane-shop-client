"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
    { id: 1, name: "Sarah L.", text: "The copper finish on the watch is exquisite. Best luxury purchase this year.", rating: 5 },
    { id: 2, name: "James R.", text: "Exceptional quality and the packaging was a masterpiece itself.", rating: 5 },
    { id: 3, name: "Elena W.", text: "Fast delivery and the AI stylist's recommendation was spot on.", rating: 4 },
];

const Reviews = () => {
    return (
        <section className="py-24 bg-[#fdfdfd] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 space-y-4"
                >
                    <h2 className="font-serif text-4xl md:text-5xl text-[#004d4d]">
                        Trusted by <span className="italic text-[#b87333]">Collectors.</span>
                    </h2>
                    <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-[#b87333] text-[#b87333]" />
                        ))}
                        <span className="ml-2 text-sm font-bold text-[#004d4d]">4.9/5 Rating</span>
                    </div>
                </motion.div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((rev, index) => (
                        <motion.div
                            key={rev.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all relative group"
                        >
                            {/* Quote Mark Decoration */}
                            <div className="absolute top-4 right-6 text-6xl text-gray-50 font-serif group-hover:text-[#b87333]/10 transition-colors italic"></div>

                            <div className="flex justify-center mb-6 gap-1">
                                {[...Array(rev.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-[#b87333] text-[#b87333]" />
                                ))}
                            </div>

                            <p className="text-gray-600 font-light italic leading-relaxed mb-6">
                                {rev.text}
                            </p>

                            <div className="w-8 h-[1px] bg-[#b87333] mx-auto mb-4"></div>
                            <h4 className="text-[#004d4d] font-bold text-xs uppercase tracking-widest">{rev.name}</h4>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
