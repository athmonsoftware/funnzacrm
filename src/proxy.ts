import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Redirect authenticated users away from auth pages
    if (session && ["/login", "/signup"].includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Public pages
    if (["/login", "/signup", "/forgot-password", "/reset-password", "/login-otp", "/verify-email"].includes(pathname)) {
        return NextResponse.next();
    }

    if (pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Everything else requires auth
    if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};