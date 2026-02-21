import { prisma } from "@/src/lib/server/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
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
