"use client";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="font-serif text-2xl md:text-3xl font-bold text-[#004d4d]">
                    LuxeLane<span className="text-[#b87333]">.</span>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex space-x-12 text-[13px] font-bold uppercase tracking-[0.2em] text-gray-600">
                    <li><Link href="/shop" className="hover:text-[#b87333] transition-colors">Collections</Link></li>
                    <li><Link href="/about" className="hover:text-[#b87333] transition-colors">Our Story</Link></li>
                    <li><Link href="/contact" className="hover:text-[#b87333] transition-colors">Contact</Link></li>
                </ul>

                {/* Desktop Icons */}
                <div className="hidden md:flex items-center space-x-8">
                    <button className="text-[#004d4d] font-bold text-xs uppercase tracking-widest border-b-2 border-[#b87333]">Bag (0)</button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-[#004d4d]" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "Close" : "Menu"}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-8 animate-fade-in">
                    <ul className="flex flex-col space-y-6 text-center font-serif text-2xl text-[#004d4d]">
                        <li><Link href="/shop" onClick={() => setIsOpen(false)}>Collections</Link></li>
                        <li><Link href="/about" onClick={() => setIsOpen(false)}>Our Story</Link></li>
                        <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
                    </ul>
                    <button className="w-full mt-10 py-4 bg-[#b87333] text-white uppercase text-xs font-bold tracking-widest">
                        Cart (0)
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
