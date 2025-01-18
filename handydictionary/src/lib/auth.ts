import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./getUserFromDB";
import { createUserToDB } from "./createUserToDB";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                let user = await getUserFromDb({
                    email: credentials.email as string,
                    password: credentials.password as string,
                });

                if (!user) {
                    user = await createUserToDB({
                        email: credentials.email as string,
                        password: credentials.password as string,
                    });
                }

                if (!user) {
                    return null;
                }

                return user;
            },
        }),
        GitHub,
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.user) {
                session.user = {
                    ...session.user,
                    ...token.user,
                };
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        //signOut: "/auth/signout",
    },
});
