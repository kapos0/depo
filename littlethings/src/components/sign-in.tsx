"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

function SignIn() {
    function handleSignIn() {
        redirect("/sign-in");
    }

    return (
        <div className="flex justify-center">
            <Button variant="destructive" onClick={handleSignIn}>
                Sign In
            </Button>
        </div>
    );
}

export { SignIn };
