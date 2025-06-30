import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "./connectDB.js";
import { sendEmail } from "./sendEmail.js";

const db = await connectDB();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            console.log("sendResetPassword çağrıldı:", user.email, url);
            try {
                const result = await sendEmail({
                    to: user.email,
                    subject: "Reset your password",
                    content: `Click the link to reset your password: ${url}`,
                });
                console.log("sendEmail sonucu:", result);
                if (!result?.success) {
                    console.error(
                        "Reset password email failed:",
                        result?.message
                    );
                    throw new Error(
                        result?.message || "Reset password email failed"
                    );
                }
            } catch (error) {
                console.error("Error in sendResetPassword:", error);
                throw error;
            }
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24 * 7,
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            try {
                if (
                    !process.env.BETTER_AUTH_URL ||
                    !process.env.EMAIL_VERIFICATION_CALLBACK_URL
                ) {
                    throw new Error(
                        "Environment variables BETTER_AUTH_URL or EMAIL_VERIFICATION_CALLBACK_URL are not set."
                    );
                }
                // callbackURL frontend'e yönlendirilecek şekilde ayarlanıyor
                const callbackURL = process.env.EMAIL_VERIFICATION_CALLBACK_URL;
                const verificationUrl = `${
                    process.env.BETTER_AUTH_URL
                }/api/auth/verify-email?token=${token}&callbackURL=${encodeURIComponent(
                    callbackURL
                )}`;
                await sendEmail({
                    to: user.email,
                    subject: "Verify your email address",
                    content: `Click the link to verify your email address: ${verificationUrl}`,
                });
            } catch (error) {
                console.error("Error sending verification email:", error);
                throw error;
            }
        },
    },
});
