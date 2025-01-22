"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleSignIn } from "@/actions/handleSignIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GithubSignIn } from "@/components/github-sign-in";
import { useSession } from "next-auth/react";

export default function Page() {
    const session = useSession();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (session.data?.user) {
            router.push("/");
        }
    }, [session.data, router]);

    return (
        <div className="w-full max-w-sm mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-600">
                Sign In
            </h1>

            <GithubSignIn />

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with email
                    </span>
                </div>
            </div>

            {error && (
                <div className="text-red-500 text-sm text-center mb-4">
                    {error}
                </div>
            )}

            <form
                className="space-y-4"
                onSubmit={async (event) => {
                    event.preventDefault();
                    const formData = new FormData(
                        event.target as HTMLFormElement
                    );

                    try {
                        await handleSignIn("credentials", formData);
                        router.push("/");
                    } catch (err) {
                        if (err instanceof Error) {
                            setError(err.message);
                        } else {
                            setError("An unknown error occurred");
                        }
                    }
                }}
            >
                <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                    autoComplete="email"
                />
                <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                    autoComplete="current-password"
                />
                <Button className="w-full" type="submit">
                    Sign In
                </Button>
            </form>

            <div className="text-center">
                <Button asChild variant="link">
                    <a href="/sign-up">Don&apos;t have an account? Sign up</a>
                </Button>
            </div>
        </div>
    );
}
