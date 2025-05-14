"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function DashBoardPage() {
    const { session } = useSession();
    if (!session) redirect("/auth/sign-in");

    const [loading, setLoading] = useState(false);

    async function handleSignOut() {
        console.log("signout");
    }

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
