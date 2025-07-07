import { Link, useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";
import { useSession } from "../lib/useSession";
import { toast } from "react-toastify";
import { CiCirclePlus } from "react-icons/ci";

export default function Navbar() {
    const navigate = useNavigate();
    const { isLoggedIn } = useSession();
    async function handleLogout() {
        try {
            await authClient.signOut();
            toast.success("Başarıyla çıkış yapıldı");
            navigate("/auth/sign-in");
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
                            ThinkBoard
                        </h1>
                    </Link>
                    <div className="flex items-center gap-4">
                        {isLoggedIn === true && (
                            <Link to="/create" className="btn btn-primary">
                                <CiCirclePlus className="size-5" />
                                <span>New Note</span>
                            </Link>
                        )}
                        {isLoggedIn === true ? (
                            <Link onClick={handleLogout}>Çıkış Yap</Link>
                        ) : (
                            <Link onClick={() => navigate("/auth/sign-in")}>
                                Giriş Yap
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
