import { Suspense, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { authClient } from "../lib/auth-client";

function ResetPasswordPageInner() {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== password2) {
            toast.error("Şifreler eşleşmiyor");
            return;
        }
        setLoading(true);
        try {
            await authClient.resetPassword?.({ token, newPassword: password });
            toast.success("Şifre başarıyla güncellendi!");
            navigate("/auth/sign-in");
        } catch (err) {
            toast.error(err?.message || "Bir hata oluştu");
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
                            Şifre Sıfırla
                        </h2>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="password"
                                placeholder="Yeni Şifre"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Yeni Şifre Tekrar"
                                className="input input-bordered w-full"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-2"
                                disabled={loading}
                            >
                                {loading
                                    ? "Güncelleniyor..."
                                    : "Şifreyi Güncelle"}
                            </button>
                        </form>
                        <div className="text-center mt-4 text-sm">
                            <button
                                className="link link-primary"
                                onClick={() => navigate("/auth/sign-in")}
                            >
                                Giriş Yap
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordPageInner />
        </Suspense>
    );
}
