import React from 'react';

const products = [
    { id: 1, name: 'Minimalist Copper Watch', price: '$450', category: 'Timepieces', img: 'https://images.pexels.com/photos/355915/pexels-photo-355915.jpeg' },
    { id: 2, name: 'Teal Leather Wallet', price: '$120', category: 'Accessories', img: 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg' },
    { id: 3, name: 'Signature Fragrance', price: '$85', category: 'Scent', img: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg' },
    { id: 4, name: 'Copper Cufflinks', price: '$65', category: 'Jewelry', img: 'https://images.pexels.com/photos/2064505/pexels-photo-2064505.jpeg' },
];

const Products = () => {
    return (
        <section className="py-16 md:py-24 bg-[#fdfdfd]">
            <div className="max-w-7xl mx-auto px-4 md:px-12">

                {/* Header with 'View All' */}
                <div className="flex items-end justify-between mb-12">
                    <div className="space-y-2">
                        <span className="text-[#b87333] text-[10px] font-bold uppercase tracking-[0.3em]">Curated</span>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#004d4d]">New <span className="italic font-light text-gray-400">Arrivals</span></h2>
                    </div>
                    <button className="text-[11px] font-bold uppercase tracking-widest border-b border-gray-300 pb-1 hover:border-[#b87333] transition-all">
                        See All
                    </button>
                </div>

                {/* Product Grid (Mobile: 2 cols, Desktop: 4 cols) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {products.map((item) => (
                        <div key={item.id} className="group cursor-pointer">
                            {/* Product Image Area */}
                            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Fast Action Button (Hidden on Mobile, Visible on Hover) */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <button className="w-full bg-white text-[#004d4d] py-2 text-[10px] font-bold uppercase tracking-widest shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform">
                                        Quick Add +
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-1 text-center md:text-left">
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{item.category}</p>
                                <h3 className="text-[#004d4d] font-serif text-sm md:text-base">{item.name}</h3>
                                <p className="text-[#b87333] font-bold text-sm">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
