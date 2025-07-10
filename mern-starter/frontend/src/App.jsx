import { useEffect } from "react";
import { useSession } from "./lib/useSession";
import { useNavigate } from "react-router";
export default function App() {
    const navigate = useNavigate();
    const { isLoading, isLoggedIn } = useSession();
    useEffect(() => {
        if (!isLoading && !isLoggedIn) navigate("/auth/sign-in");
    }, [user, isLoading, isLoggedIn]);
    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
}
