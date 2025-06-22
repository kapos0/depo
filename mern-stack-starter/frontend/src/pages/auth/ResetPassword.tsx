import { Suspense } from "react";

function ResetPasswordPageInner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="w-full max-w-sm">
                <div className="card bg-base-100 shadow-xl border border-base-200">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl font-bold mb-2 text-primary">
                            Şifre Sıfırla
                        </h2>
                        <form className="flex flex-col gap-4">
                            <input
                                type="password"
                                placeholder="Yeni Şifre"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="password"
                                placeholder="Yeni Şifre Tekrar"
                                className="input input-bordered w-full"
                            />
                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-2"
                            >
                                Şifreyi Güncelle
                            </button>
                        </form>
                        <div className="text-center mt-4 text-sm">
                            <a
                                href="/auth/sign-in"
                                className="link link-primary"
                            >
                                Giriş Yap
                            </a>
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
