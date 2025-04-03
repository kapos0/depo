import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { auth } from "./auth";

const authConfig = {
    providers: [],
    callbacks: {
        async authorized({ request }) {
            const user = await auth();
            const protectedPaths = [/\/dashboard/];
            const { pathname } = request.nextUrl;
            if (protectedPaths.some((p) => p.test(pathname)))
                return user?.user?.role === "admin";
            return true;
        },
    },
} satisfies NextAuthConfig;

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
