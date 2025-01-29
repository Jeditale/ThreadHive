import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function middleware(req) {
    const headersList = await headers()
    const token = headersList.get('Authorization')

    const protectedRoutes = ["/home/post", "/user"];

    // if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !token) {
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }

    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/home/post/:path*","/user"]
};
