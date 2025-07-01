import { useEffect, useState } from "react";
import { authClient } from "./auth-client";

export function useSession() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        async function fetchSession() {
            const res = await authClient.getSession();
            if ("data" in res && res.data && res.data.session) {
                setSession(res.data.session);
            } else {
                setSession(null);
            }
        }
        fetchSession();
    }, []);
    if (session) return true;
    return false;
}
