"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function Navbar() {
    //const { data: session } = useSession();
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-16 items-center px-4 justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-semibold text-primary"
                >
                    <Briefcase />
                    Job Tracker
                </Link>
                <div className="flex items-center gap-4">
                    {true /*session?.user*/ ? (
                        <>
                            <Button
                                render={<Link href="/dashboard" />}
                                nativeButton={false}
                                variant="ghost"
                                className="text-gray-700 hover:text-black"
                            >
                                Dashboard
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    render={
                                        <Button
                                            variant="ghost"
                                            className="relative h-8 w-8 rounded-full"
                                        />
                                    }
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary text-white">
                                            {
                                                "kapos" /*session.user.name[0].toUpperCase()*/
                                            }
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    className="w-56"
                                    align="end"
                                >
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {
                                                        "kapos" /*session.user.name*/
                                                    }
                                                </p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {
                                                        "deneme@gmail.com" /*session.user.email*/
                                                    }
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                    </DropdownMenuGroup>
                                    {/*<SignOutButton />*/}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Button
                                render={<Link href="/sign-in" />}
                                nativeButton={false}
                                variant="ghost"
                                className="text-gray-700 hover:text-black"
                            >
                                Log In
                            </Button>
                            <Button
                                render={<Link href="/sign-up" />}
                                nativeButton={false}
                                className="bg-primary hover:bg-primary/90"
                            >
                                Start for free
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
