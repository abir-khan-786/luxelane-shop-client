import { prisma } from "@/src/lib/server/prisma";
import { auth } from "@/src/lib/auth"; // আপনার Better Auth কনফিগ পাথ
import { headers } from "next/headers";
import { NextResponse } from "next/server";



export async function GET(request: Request) {
    const headerList = await headers();
    const referer = headerList.get("referer");
    const host = headerList.get("host");

    // ১. গার্ড: যদি কেউ সরাসরি URL এন্টার করে (Referer থাকে না) 
    // অথবা যদি আপনার ডোমেইন থেকে রিকোয়েস্ট না আসে
    if (!referer || !referer.includes(host as string)) {
        return NextResponse.json(
            { error: "Forbidden: Direct API access is not allowed" },
            { status: 403 }
        );
    }

    // ২. সেশন ছাড়াই প্রোডাক্ট দেখাবে (আপনার ওয়েবসাইট থেকে আসলে)
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}


export async function PATCH(request: Request) {
    try {
        // ১. যে রিকোয়েস্ট পাঠাচ্ছে তার সেশন চেক করা
        const session = await auth.api.getSession({
            headers: await headers()
        });

        // ২. যদি সে লগইন করা না থাকে অথবা সে নিজে 'ADMIN' না হয়
        if (!session || session?.user?.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized: Only admins can change roles" },
                { status: 403 }
            );
        }

        // ৩. বডি থেকে ডাটা নেওয়া (কাকে আপডেট করতে হবে এবং কি রোল দিতে হবে)
        const body = await request.json();
        const { userId, role } = body;

        if (!userId || !role) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }

        // ৪. ডাটাবেস আপডেট করা
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role: role }, // এখানে 'ADMIN' বা 'user' আসবে
        });

        return NextResponse.json({ success: true, user: updatedUser });

    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
