import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI || "");
const db = client.db();
export const auth = betterAuth({
    adapter: mongodbAdapter(db, { client }),
    secret: process.env.AUTH_SECRET || "",
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    emailAndPassword: {
        enabled: true,
    },
});
