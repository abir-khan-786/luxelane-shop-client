import { prisma } from "@/src/lib/server/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const products = await prisma.user.findMany();
    return NextResponse.json(products);
} 