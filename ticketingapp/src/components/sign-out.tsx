"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

function SignOut({ user }: { user: string }) {
    async function handleSignOut() {
        await signOut();
    }

    return (
        <div className="flex justify-center">
            <Button variant="default" onClick={handleSignOut}>
                {user && <p className="text-white me-3">{user}</p>}
                <span className="text-white">Sign Out</span>
            </Button>
        </div>
    );
}

export { SignOut };
