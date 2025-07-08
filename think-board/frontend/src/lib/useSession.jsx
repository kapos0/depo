import { useEffect, useState } from "react";
import { authClient } from "./auth-client";

export function useSession() {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchSession() {
            const res = await authClient.getSession();
            if ("data" in res && res.data && res.data.session) {
                setSession(res.data.session);
                setUser(res.data.user);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setSession(null);
                setUser(null);
            }
        }
        fetchSession();
    }, []);
    if (session)
        return {
            isLoggedIn: true,
            session,
            isLoading,
            user,
        };
    else
        return {
            isLoggedIn: false,
            session: null,
            isLoading,
            user: null,
        };
}
