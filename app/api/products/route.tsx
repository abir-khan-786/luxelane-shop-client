import { db } from "@/src/lib/server/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // ডাটাবেস থেকে সব প্রোডাক্ট নিয়ে আসবে
        const products = await db.product.findMany();

        return NextResponse.json(products);
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
