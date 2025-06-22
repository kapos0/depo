export default function SignIn() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="w-full max-w-sm">
                <div className="card bg-base-100 shadow-xl border border-base-200">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl font-bold mb-2 text-primary">
                            Giriş Yap
                        </h2>
                        <form className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="password"
                                placeholder="Şifre"
                                className="input input-bordered w-full"
                            />
                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-2"
                            >
                                Giriş Yap
                            </button>
                        </form>
                        <div className="flex justify-between mt-4 text-sm">
                            <a
                                href="/auth/forgot-password"
                                className="link link-primary"
                            >
                                Şifremi Unuttum
                            </a>
                            <a
                                href="/auth/sign-up"
                                className="link link-primary"
                            >
                                Kayıt Ol
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
