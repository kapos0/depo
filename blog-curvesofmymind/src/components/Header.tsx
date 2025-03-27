"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
    return (
        <header className="border-b border-gray-200 bg-background">
            <div className="container flex items-center justify-between h-16 px-4 mx-auto">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <div className="px-3 py-1 text-xl font-bold text-white rounded bg-gradient-to-r from-purple-500 to-pink-500">
                            Turhan&apos;s
                        </div>
                        <span className="ml-2 text-xl font-semibold">Blog</span>
                    </Link>
                </div>

                <div className="relative max-w-md mx-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full pl-10 md:w-[300px] rounded-md"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4 gap-12">
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/"
                            className="text-blue-600 font-medium dark:text-blue-400"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            About
                        </Link>
                        <Link
                            href="/projects"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Projects
                        </Link>
                    </nav>
                    <div>
                        <ThemeToggle />
                        <Button variant="outline" className="rounded-full ms-5">
                            Sign In
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
