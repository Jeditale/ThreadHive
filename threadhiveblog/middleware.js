import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = req.cookies.get("token")?.value; 

    const protectedRoutes = ["/home/post", "/user"];

    if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/home/post/:path*","/user"]
};
