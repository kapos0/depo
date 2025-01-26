import NextAuth, { CredentialsSignin } from "next-auth";
import { connectDB } from "@/lib/conntectDB";
import User from "@/models/user";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Username",
                },
                provider: {
                    type: "hidden",
                    accept: "credentials, google, github",
                },
                role: {
                    type: "hidden",
                    defaultValue: "user",
                },
            },
            authorize: async (credentials) => {
                const username = credentials.username as string;
                const password = credentials.password as string;

                if (!username || !password)
                    throw new CredentialsSignin(
                        "Please provide both username & password"
                    );
                await connectDB();
                const user = await User.findOne({
                    username,
                    provider: "credentials",
                }).select("+password +role");

                if (!user || !user.password)
                    throw new Error("Invalid username or password");

                const isMatched = await compare(password, user?.password);

                if (!isMatched) throw new Error("Password did not matched");

                const userData = {
                    username: user?.username,
                    lastName: user?.lastName,
                    email: user?.email,
                    role: user?.role,
                    id: user?._id,
                    isVerified: user?.isVerified,
                    avatar: user?.avatar,
                    provider: user?.provider,
                };
                return userData;
            },
        }),
        Google,
        Github,
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        //when user sign in with google or github it needs to be saved in the database
        async signIn({ user, account }) {
            await connectDB();
            if (
                account?.provider === "google" ||
                account?.provider === "github"
            ) {
                const existingUser = await User.findOne({ email: user?.email });
                if (!existingUser) {
                    const newUser = new User({
                        email: user?.email,
                        username: user?.name,
                        provider: account?.provider,
                        avatar: user?.image,
                        isVerified: true,
                    });
                    await newUser.save();
                }
            }
            return true;
        },
    },
});
