import { useNavigate } from "react-router";
import { authClient } from "./lib/auth-client";
import { useSession } from "./lib/useSession";

export default function App() {
    const navigate = useNavigate();
    const isLoggedIn = useSession();
    async function handleLogout() {
        try {
            await authClient.signOut();
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
    if (!isLoggedIn) navigate("/auth/sign-in");
    return (
        <div>
            <h1>Hello</h1>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Çıkış Yap</button>
            ) : (
                <p>Giriş yapmadınız</p>
            )}
        </div>
    );
}
