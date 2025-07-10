import { useNavigate } from "react-router";

export default function EmailVerified() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="w-full max-w-sm">
                <div className="card bg-base-100 shadow-xl border border-base-200 text-center">
                    <div className="card-body items-center">
                        <div className="mb-4">
                            <svg
                                className="w-14 h-14 text-success"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9 12l2 2 4-4" />
                            </svg>
                        </div>
                        <h2 className="card-title text-2xl font-bold mb-2 text-success">
                            Email Confirmed
                        </h2>
                        <p className="mb-6 text-base-content/70">
                            Your email has been successfully verified. You can
                            now log in to your account.
                        </p>
                        <button
                            className="btn btn-primary w-full"
                            onClick={() => navigate("/auth/sign-in")}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
