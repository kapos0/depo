import { createAuthClient } from "better-auth/react";
import { toast } from "react-toastify";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: import.meta.env.APP_URL,
});
export async function handleAuth() {
    try {
        await authClient.signIn.email(
            {
                email: "email@example.com",
                password: "password",
            },
            {
                onError: (ctx) => {
                    if (ctx.error.status === 403) {
                        alert("Please verify your email address");
                    }
                    alert(ctx.error.message);
                },
            }
        );

        const token = new URLSearchParams(window.location.search).get("token");
        if (!token) {
            console.error("No token found in the URL");
            toast.error(
                "No token found in the URL Please check your email for the reset link."
            );
            return;
        }
        await authClient.resetPassword({
            newPassword: "password1234",
            token,
        });
    } catch (error) {
        console.error("Error during authentication:", error);
        toast.error(
            "An error occurred during authentication. Please try again."
        );
    }
}
