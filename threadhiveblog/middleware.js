import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    const protectedRoutes = ["/home"];

    if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/home"],
};
