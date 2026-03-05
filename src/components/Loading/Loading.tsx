"use client";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            {/* মেইন স্পিনার অ্যানিমেশন */}
            <motion.div
                className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                }}
            />

            {/* টেক্সট অ্যানিমেশন (Fade and Scale) */}
            <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="text-gray-500 font-medium tracking-wide"
            >
                Loading Profile...
            </motion.p>
        </div>
    );
}
