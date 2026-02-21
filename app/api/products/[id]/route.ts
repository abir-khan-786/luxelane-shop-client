import { prisma } from "@/src/lib/server/prisma";
import { NextResponse } from "next/server";

// DELETE: http://localhost:3000/api/products/[id]




export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params; // ✅ Next.js 15 এ await বাধ্যতামূলক
        const product = await prisma.product.findUnique({
            where: { id: id }
        });

        if (!product) return NextResponse.json({ error: "Not Found" }, { status: 404 });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // ১. params-কে Promise হিসেবে টাইপ করুন
) {
    try {
        // ২. params-কে await করুন [Next.js 15+ রিকোয়ারমেন্ট]
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Product ID is missing" }, { status: 400 });
        }

        // ৩. এখন ডিলিট কল করুন
        await prisma.product.delete({
            where: { id: id }
        });

        return NextResponse.json({ message: "Product Deleted Successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}




export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // ✅ Promise টাইপ
) {
    try {
        const { id } = await params; // ✅ params ওয়েট করুন
        const body = await req.json();

        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data: {
                name: body.name,
                description: body.description,
                price: Number(body.price),
                category: body.category,
                image: body.image,
                stock: Number(body.stock),
            },
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}


