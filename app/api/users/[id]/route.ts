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
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) return Response.json({ error: "User ID required" }, { status: 400 });

    try {
        // ১. আগে চেক করুন ইউজারটি ডাটাবেসে আছে কি না
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        // ২. ইউজার না পাওয়া গেলে এরর রিটার্ন করুন
        if (!existingUser) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        // ৩. ইউজার থাকলে তাকে ডিলিট করুন
        await prisma.user.delete({
            where: { id: userId },
        });

        return Response.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
