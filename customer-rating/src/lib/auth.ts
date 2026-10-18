import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth/minimal";
import { mongoClient } from "@/lib/mongodb";

export const auth = betterAuth({
    database: mongodbAdapter(mongoClient.db(process.env.MONGODB_DB_NAME ?? "active")),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [nextCookies()],
    trustedOrigins: [process.env.BETTER_AUTH_URL || ""],
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
});
