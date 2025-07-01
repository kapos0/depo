import { toast } from "react-toastify";
import { authClient } from "./lib/auth-client";
import { useSession } from "./lib/useSession";
import { useNavigate } from "react-router";

export default function App() {
    const isLoggedIn = useSession();
    const navigate = useNavigate();
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
        <div>
            <h1>Hello</h1>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Çıkış Yap</button>
            ) : (
                <button onClick={() => navigate("/auth/sign-in")}>
                    Giriş Yap
                </button>
            )}
        </div>
    );
}
