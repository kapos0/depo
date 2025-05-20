"use client";
import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function DashBoardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { session, isError, isLoading } = useSession();

    async function handleSignOut() {
        setLoading(true);
        try {
            await authClient.signOut();
            toast("You have been signed out successfully.");
            router.push("/auth/sign-in");
        } catch (error) {
            console.error("Error signing out:", error);
            toast("there is a problem signing out");
        } finally {
            setLoading(false);
        }
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>There was an error loading your session</div>;
    if (!session) redirect("/auth/sign-in");

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <Button
                    variant="outline"
                    onClick={handleSignOut}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <LogOut className="mr-2 h-4 w-4 animate-spin" />
                            Signing out...
                        </>
                    ) : (
                        <>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </>
                    )}
                </Button>
            </div>
            <div>Welcome to your dashboard</div>
        </div>
    );
}
