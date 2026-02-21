import { prisma } from "@/src/lib/server/prisma";
import { NextResponse } from "next/server";

// GET: http://localhost:3000/api/users/[email]
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // এখানে 'id' মানে আপনার পাঠানো ইমেইল
) {
    try {
        const { id: email } = await params;

        const user = await prisma.user.findUnique({
            where: {
                email: email, // ✅ ইমেইল দিয়ে খোঁজা [Prisma findUnique](https://www.prisma.io)
            },

        });

        if (!user) return NextResponse.json({ error: "User in not found error" }, { status: 404 });
        return NextResponse.json(user);

    } catch (error) {
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}
