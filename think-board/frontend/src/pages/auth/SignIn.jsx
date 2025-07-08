import { useEffect, useState } from "react";
import { authClient } from "../../lib/auth-client";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSession } from "../../lib/useSession";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, isLoading } = useSession();

    useEffect(() => {
        if (!isLoading && isLoggedIn === true) {
            navigate("/");
        }
    }, [isLoggedIn, isLoading, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await authClient.signIn?.email(
                { email, password },
                {
                    onError: (ctx) => {
                        toast.error(ctx.error.message || "Giriş başarısız");
                        setLoading(false);
                        throw new Error(ctx.error.message);
                    },
                }
            );
            toast.success("Başarıyla giriş yapıldı!");
            window.location.href = "/";
        } catch (e) {
            toast.error(e?.message || "Giriş başarısız");
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
                            Sign In
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
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-2"
                                disabled={loading}
                            >
                                {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                            </button>
                        </form>
                        <div className="flex flex-col gap-2 justify-center mt-4 text-sm">
                            <button
                                className="link link-primary"
                                onClick={() => navigate("/auth/sign-up")}
                            >
                                Register
                            </button>
                            <button
                                className="link link-primary"
                                onClick={() =>
                                    navigate("/auth/forgot-password")
                                }
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
