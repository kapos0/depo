import { Link } from "react-router";
import { authClient } from "../lib/auth-client";
import { useSession } from "../lib/useSession";
import { toast } from "react-toastify";

export default function Navbar() {
    const { isLoggedIn, user } = useSession();
    async function handleLogout() {
        try {
            await authClient.signOut();
            toast.success("Başarıyla çıkış yapıldı");
            window.location.href = "/auth/sign-in";
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <Link to="/">
                        <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
                            Mern-Starter
                        </h1>
                    </Link>
                    <div className="flex items-center gap-4">
                        {isLoggedIn === true ? (
                            <div>
                                <span className="text-xl text-emerald-400">
                                    <span className="text-white text-sm">
                                        Signed User:
                                    </span>
                                    {user?.name}
                                </span>
                                <span className="mx-2">|</span>

                                <Link onClick={handleLogout}>Sign Out</Link>
                            </div>
                        ) : (
                            <Link to="/auth/sign-in">Sign In</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
