import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSession } from "../lib/useSession";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = useSession();

    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== password2) {
            toast.error("Şifreler eşleşmiyor");
            return;
        }
        setLoading(true);
        try {
            await authClient.signUp?.email({ email, password, name });
            toast.success(
                "Kayıt başarılı! Email adresinize doğrulama linki gönderildi."
            );
            navigate("/auth/sign-in");
        } catch (err) {
            toast.error(err?.message || "Kayıt başarısız");
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
                            Kayıt Ol
                        </h2>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                placeholder="Adınız"
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
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
                                placeholder="Şifre"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Şifre Tekrar"
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
                                {loading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
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
