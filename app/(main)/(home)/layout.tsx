import Footer from '@/src/components/shared/Footer';
import Navbar from '@/src/components/shared/Navbar';
import React from 'react';

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        /* flex flex-col এবং min-h-screen নিশ্চিত করবে ফুটার নিচে থাকবে */
        <div className="flex flex-col min-h-screen antialiased selection:bg-[#b87333] selection:text-white bg-[#fdfdfd]">

            {/* ১. নেভবার */}
            <Navbar />

            {/* 
               ২. মেইন কন্টেন্ট এরিয়া 
               pt-[80px]: মোবাইলে নেভবারের উচ্চতা অনুযায়ী টপ প্যাডিং (যেন হিরো সেকশন নেভবারের নিচে না ঢুকে যায়)।
               md:pt-[100px]: ডেস্কটপে একটু বেশি প্যাডিং।
               px-4: মোবাইলে দুই পাশে গ্যাপ রাখবে।
               md:px-0: ডেস্কটপে বড় কন্টেন্টের জন্য গ্যাপ রিমুভ করবে (কারণ আমরা হিরো সেকশনে আলাদা প্যাডিং দেব)।
            */}
            <main className="flex-grow pt-[80px] md:pt-[100px] px-4 md:px-0 w-full overflow-x-hidden">
                <div className="max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>

            {/* ৩. ফুটার */}
            <Footer />
        </div>
    );
};

export default MainLayout;
