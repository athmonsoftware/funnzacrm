import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Proxy(req: NextRequest) {

    const { pathname } = req.nextUrl;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const protectedRoutes = ["/dashboard", "/admin", "/pricing", "/"];

    if (!session && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (session && pathname === "/login") {
        return NextResponse.redirect(new URL('/', req.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
        "/dashboard/:path*",
        "/admin/:path*",
    ],
}