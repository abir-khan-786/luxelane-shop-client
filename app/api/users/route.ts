import { prisma } from "@/src/lib/server/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const products = await prisma.user.findMany();
    return NextResponse.json(products);
}

// PATCH: http://localhost:3000/api/user
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { userId, role } = body;

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role: role },
        });

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
    }
}