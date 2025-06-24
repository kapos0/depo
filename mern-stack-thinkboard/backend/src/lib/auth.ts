import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "./connectDB.js";

const dbPromise = connectDB();

export const auth = betterAuth({
    database: mongodbAdapter(await dbPromise),

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
