"use client";
import { SessionProvider } from "next-auth/react";
import UserButton from "@/components/ui/userButton";

export default function Home() {
    return (
        <div>
            <SessionProvider>
                <UserButton />
            </SessionProvider>
        </div>
    );
}
