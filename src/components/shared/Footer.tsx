const Footer = () => {
    return (
        <footer className="bg-[#004d4d] text-[#f4f4f4] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand Info */}
                <div className="col-span-1 md:col-span-1">
                    <h2 className="font-serif text-2xl font-bold text-[#b87333] mb-6">LuxeLane</h2>
                    <p className="text-sm leading-relaxed opacity-80">
                        Crafting premium experiences through curated luxury goods. Your lane to elegance.
                    </p>
                </div>

                {/* Shop Links */}
                <div>
                    <h4 className="font-semibold mb-6 text-white">Explore</h4>
                    <ul className="space-y-4 text-sm opacity-70">
                        <li><a href="#" className="hover:text-[#b87333] transition-all">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-[#b87333] transition-all">Best Sellers</a></li>
                        <li><a href="#" className="hover:text-[#b87333] transition-all">Sustainability</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="font-semibold mb-6 text-white">Support</h4>
                    <ul className="space-y-4 text-sm opacity-70">
                        <li><a href="#" className="hover:text-[#b87333] transition-all">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-[#b87333] transition-all">Contact Expert</a></li>
                        <li><a href="#" className="hover:text-[#b87333] transition-all">FAQs</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-semibold mb-6 text-white">Newsletter</h4>
                    <div className="flex border-b border-[#b87333] pb-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
                        />
                        <button className="text-[#b87333] text-sm font-bold ml-2 underline">JOIN</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-white/10 text-center">
                <p className="text-[12px] opacity-50 tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} LuxeLane-Shop. Global Fine Goods.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
