import User from "@/models/user";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { connectDB } from "@/lib/conntectDB";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter your email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password",
                },
            },
            authorize: async (credentials) => {
                if (!credentials.email || !credentials.password)
                    throw new Error("Email and password are required");
                await connectDB();
                const user = await User.findOne({
                    email: credentials?.email,
                    provider: "credentials",
                });
                if (
                    user &&
                    (await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    ))
                ) {
                    return user;
                } else {
                    throw new Error("Invalid email or password");
                }
            },
        }),
        GitHub,
    ],
    callbacks: {
        async signIn({ account, profile }) {
            await connectDB();
            if (account?.provider === "github") {
                const existingUser = await User.findOne({
                    email: profile?.email,
                });
                if (!existingUser) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.login,
                        avatar: profile?.avatar_url,
                        provider: "github",
                    });
                }
            }
            return true;
        },
        /*async session({ session }) {
            await connectDB();

            const dbUser = await User.findOne({ email: session.user.email });
            if (dbUser) {
                session.user.id = dbUser._id.toString();
            }
            return session;
        },Sanırım bu şey kullanılmıyor işlevsellik aynı şekilde devam ederse kullanmaktan vaz geç sende*/
    },
    secret: process.env.AUTH_SECRET,
});
