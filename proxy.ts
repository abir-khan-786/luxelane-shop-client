import { NextResponse, NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// ১. ফাংশনটির নাম অবশ্যই 'proxy' হতে হবে অথবা 'default export' করতে হবে
export async function proxy(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;
    const sessionCookie = getSessionCookie(request);

    if (pathname.startsWith("/admin")) {
        if (!sessionCookie) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            const response = await fetch(`${origin}/api/auth/get-session`, {
                headers: {
                    cookie: request.headers.get("cookie") || "",
                },
            });
            const session = await response.json();

            // আপনার ডাটাবেসে 'ADMIN' থাকলে সেটি চেক করুন
            if (!session?.user || session.user.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/", request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

// ২. আগের মতোই matcher কনফিগ থাকবে
export const config = {
    matcher: ["/admin/:path*"],
};
