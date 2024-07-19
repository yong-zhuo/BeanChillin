import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ["/groups/:path*", "/friends/:path*", "/feed/:path*", "/chat/:path*"],
}

