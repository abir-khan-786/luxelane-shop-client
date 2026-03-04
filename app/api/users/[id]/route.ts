import { prisma } from "@/src/lib/server/prisma";
import { NextResponse } from "next/server";



export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const id = searchParams.get("id");
        const email = searchParams.get("email");
        const role = searchParams.get("role");

        const user = await prisma.user.findFirst({
            where: {
                ...(id && { id }),
                ...(email && { email }),
                ...(role && { role: role as any }),
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
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
