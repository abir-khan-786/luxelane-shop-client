import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/server/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    // ১. সেশন চেক করা (কে রিকোয়েস্ট পাঠাচ্ছে তাকে চেনা)
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // ২. যদি লগইন করা না থাকে
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // ৩. শুধুমাত্র ওই ইউজারের আইডি দিয়ে অর্ডারগুলো ফিল্টার করা
        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id // এখানে আপনার ডাটাবেসের রিলেশন কী (userId) ব্যবহার করুন
            },
            orderBy: {
                createdAt: 'desc' // নতুন অর্ডারগুলো আগে দেখাবে
            }
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Order Fetch Error:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}


export async function POST(request: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { items, totalAmount } = body; // ফ্রন্টএন্ড থেকে পাঠানো ডাটা

        const newOrder = await prisma.order.create({
            data: {
                userId: session.user.id,
                totalAmount: totalAmount,
                items: items, // আপনার স্কিমা অনুযায়ী ডাটা ফরম্যাট করুন
                status: "PENDING"
            }
        });

        return NextResponse.json(newOrder);
    } catch (error) {
        return NextResponse.json({ error: "Order failed" }, { status: 500 });
    }
}
