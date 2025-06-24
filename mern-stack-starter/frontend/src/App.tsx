import { authClient } from "./lib/auth-client";
import { useSession } from "./lib/useSession";

export default function App() {
    const isLoggedIn = useSession();
    async function handleLogout() {
        try {
            await authClient.signOut();
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
    return (
        <div>
            <h1>Hello</h1>
            {isLoggedIn ? (
                <button className="btn btn-primary" onClick={handleLogout}>
                    Çıkış Yap
                </button>
            ) : (
                <p>Giriş yapmadınız</p>
            )}
        </div>
    );
}
