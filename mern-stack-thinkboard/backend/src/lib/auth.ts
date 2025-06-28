import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "./connectDB.js";

let auth: ReturnType<typeof betterAuth>;

export async function setupAuth() {
    const db = await connectDB();
    auth = betterAuth({
        database: mongodbAdapter(db),
        emailAndPassword: {
            enabled: true,
            session: {
                expiresIn: 60 * 60 * 24 * 7, // 7 days
                updateAge: 60 * 60 * 24 * 7,
                cookieCache: {
                    enabled: true,
                    maxAge: 5 * 60,
                },
            },
        },
    });
}

export { auth };
