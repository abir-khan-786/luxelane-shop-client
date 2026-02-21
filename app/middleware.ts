import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // ১. সেশন কুকি চেক করা [Better Auth Cookies](https://www.better-auth.com)
    const sessionCookie = getSessionCookie(request);

    // ২. যদি কোনো সেশন না থাকে, তবে লগইন পেজে পাঠিয়ে দিবে
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // ৩. সেশন ডাটা থেকে রোল (Role) চেক করা
    // Better Auth-এর সেশন ডাটা সাধারণত কুকিতে এনক্রিপ্টেড থাকে। 
    // অ্যাডমিন প্রটেকশনের জন্য আপনার Better Auth Config-এ 'role' এনাবল থাকতে হবে।

    const session = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
        headers: {
            cookie: request.headers.get("cookie") || "",
        },
    }).then((res) => res.json());

    // ৪. যদি ইউজার অ্যাডমিন না হয়, তবে এক্সেস ডিনাই করা
    if (session?.user?.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url)); // হোমপেজে পাঠিয়ে দিবে
    }

    return NextResponse.next();
}

// ৫. কোন কোন রুট প্রটেক্ট করবেন তা এখানে বলে দিন [Next.js Middleware Matcher](https://nextjs.org)
export const config = {
    matcher: ["/admin/:path*", "/products/add", "/products/edit/:path*"],
};
