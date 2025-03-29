"use client";
import Link from "next/link";
import { register } from "@/actions/UserActions";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
    const user = useSession();
    useEffect(() => {
        if (user?.status !== "unauthenticated") {
            redirect("/");
        }
    }, [user.status]);

    async function handleGoogleFastLogin() {
        try {
            await signIn("google");
        } catch (error) {
            console.error(error);
        }
    }
    async function handleGithubFastLogin() {
        try {
            await signIn("github");
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <main className="relative min-h-screen w-full bg-white dark:bg-gray-900">
            <div className="p-6" x-data="app">
                <header className="flex w-full justify-end">
                    <div>
                        <Link
                            href="/sign-in"
                            className="rounded-2xl border-b-2 border-b-gray-300 bg-white dark:bg-gray-800 px-4 py-3 font-bold text-blue-500 dark:text-blue-400 ring-2 ring-gray-300 dark:ring-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 active:translate-y-[0.125rem] active:border-b-gray-200 dark:active:border-b-gray-600"
                        >
                            SIGN IN
                        </Link>
                    </div>
                </header>
                <div className="absolute left-1/2 top-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center w-full">
                    <div className="space-y-4">
                        <header className="mb-3 text-4xl font-bold text-gray-900 dark:text-gray-100">
                            Create your profile
                        </header>
                        <form action={register}>
                            <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 ring-2 ring-gray-200 dark:ring-gray-700 my-4 focus-within:ring-blue-400 dark:focus-within:ring-blue-500">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="User Name"
                                    className="my-3 w-full border-none bg-transparent text-gray-900 dark:text-gray-100 outline-hidden focus:outline-hidden"
                                />
                            </div>
                            <div className="w-full my-4 rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 ring-2 ring-gray-200 dark:ring-gray-700 focus-within:ring-blue-400 dark:focus-within:ring-blue-500">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email..."
                                    className="my-3 w-full border-none bg-transparent text-gray-900 dark:text-gray-100 outline-hidden focus:outline-hidden"
                                />
                            </div>
                            <div className="w-full my-4 rounded-2xl bg-gray-50 dark:bg-gray-800 px-4 ring-2 ring-gray-200 dark:ring-gray-700 focus-within:ring-blue-400 dark:focus-within:ring-blue-500">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="my-3 w-full border-none bg-transparent text-gray-900 dark:text-gray-100 outline-hidden focus:outline-hidden"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-2xl border-b-4 border-b-blue-600 dark:border-b-blue-500 bg-blue-500 dark:bg-blue-600 py-3 font-bold text-white hover:bg-blue-400 dark:hover:bg-blue-500 active:translate-y-[0.125rem] active:border-b-blue-400 dark:active:border-b-blue-400"
                            >
                                CREATE ACCOUNT
                            </button>
                        </form>
                    </div>
                    <div className="flex items-center space-x-4">
                        <hr className="w-full border border-gray-300 dark:border-gray-700" />
                        <div className="font-semibold text-gray-400 dark:text-gray-500">
                            OR
                        </div>
                        <hr className="w-full border border-gray-300 dark:border-gray-700" />
                    </div>
                    <footer>
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                onClick={handleGoogleFastLogin}
                                className="rounded-2xl border-b-2 border-b-gray-300 dark:border-b-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 font-bold text-blue-700 dark:text-blue-400 ring-2 ring-gray-300 dark:ring-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 active:translate-y-[0.125rem] active:border-b-gray-200 dark:active:border-b-gray-600"
                            >
                                GOOGLE
                            </button>
                            <button
                                onClick={handleGithubFastLogin}
                                className="rounded-2xl border-b-2 border-b-gray-300 dark:border-b-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 font-bold text-blue-700 dark:text-blue-400 ring-2 ring-gray-300 dark:ring-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 active:translate-y-[0.125rem] active:border-b-gray-200 dark:active:border-b-gray-600"
                            >
                                GITHUB
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </main>
    );
}
