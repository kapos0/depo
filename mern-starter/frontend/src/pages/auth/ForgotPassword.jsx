import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { authClient } from "../../lib/auth-client";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await authClient.requestPasswordReset?.({
                email,
                redirectTo: "/auth/reset-password",
            });
            toast.success("Password reset link sent!");
        } catch (err) {
            toast.error(err?.message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="w-full max-w-sm">
                <div className="card bg-base-100 shadow-xl border border-base-200">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl font-bold mb-2 text-primary">
                            Forgot Password
                        </h2>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-2"
                                disabled={loading}
                            >
                                {loading ? "Sending ..." : "Send Reset Link"}
                            </button>
                        </form>
                        <div className="text-center mt-4 text-sm">
                            <button
                                className="link link-primary"
                                onClick={() => navigate("/auth/sign-in")}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
