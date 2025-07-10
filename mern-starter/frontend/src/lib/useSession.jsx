import { useEffect, useState, useMemo } from "react";
import { authClient } from "./auth-client";

export function useSession() {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSession() {
            const res = await authClient.getSession();
            if (res?.data?.session) {
                setSession(res.data.session);
                setUser(res.data.user);
            } else {
                setSession(null);
                setUser(null);
            }
            setIsLoading(false);
        }
        fetchSession();
    }, []);

    return useMemo(
        () => ({
            isLoggedIn: !!session,
            session,
            isLoading,
            user: session ? user : null,
        }),
        [session, isLoading, user]
    );
}
