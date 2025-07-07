import { useEffect, useState } from "react";
import { authClient } from "./auth-client";

export function useSession() {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSession() {
            const res = await authClient.getSession();
            if ("data" in res && res.data && res.data.session) {
                setIsLoading(false);
                setSession(res.data.session);
            } else {
                setIsLoading(false);
                setSession(null);
            }
        }
        fetchSession();
    }, []);
    if (session)
        return {
            isLoggedIn: true,
            session,
            isLoading,
        };
    else
        return {
            isLoggedIn: false,
            session: null,
            isLoading,
        };
}
