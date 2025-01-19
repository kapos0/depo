import User from "@/models/user";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { connectDB } from "@/lib/conntectDB";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials.email || !credentials.password)
                    throw new Error("Email and password are required");
                await connectDB();
                const user = await User.findOne({
                    email: credentials?.email,
                    password: credentials?.password,
                });
                if (user) return user;
                else throw new Error("Invalid email or password");
            },
        }),
        GitHub,
    ],
});
