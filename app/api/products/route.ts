import { prisma } from "@/src/lib/server/prisma";
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

// app/api/products/route.ts
export async function POST(req: Request,) {
    try {
        const body = await req.json();
        const product = await prisma.product.create({
            data: {
                ...body,
            }
        });


        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
