import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import bcrypt from "bcryptjs"
import { connectToDB } from "@/lib/DB"
import User from "@/models/user"

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: {},
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    await connectToDB()
                    const user = await User.findOne({
                        email: credentials?.email,
                    })
                    if (!user) throw new Error("User not found")
                    const isValidPassword = await bcrypt.compare(
                        credentials?.password ?? "",
                        user.password as string
                    )
                    if (!isValidPassword)
                        throw new Error("Password does not match")
                    return user
                } catch (error) {
                    console.error(error)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "github") {
                await connectToDB()
                const existingUser = await User.findOne({
                    email: profile?.email,
                })
                if (!existingUser) {
                    await User.create({
                        name: profile?.name,
                        email: profile?.email,
                    })
                }
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name
                token.email = user.email
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                    name: token.name,
                    image: token.picture,
                }
            }
            return session
        },
    },
    pages: {
        signIn: "/sign-in",
    },
    secret: process.env.NEXTAUTH_SECRET,
})
export { handler as GET, handler as POST }
