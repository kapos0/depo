import { auth } from "@/lib/auth";
import Link from "next/link";
import { SignOut } from "./sign-out";

export default async function Nav() {
    const session = await auth();
    return (
        <nav className="flex justify-between bg-nav p-4">
            <div className="flex items-center space-x-4">
                <Link href="/">
                    <i className="icon bi bi-house-fill"></i>
                </Link>
                <Link href="/ticketpage/new">
                    <i className="icon bi bi-ticket-fill"></i>
                </Link>
                {session && session.user?.email && (
                    <SignOut user={session.user.email} />
                )}
            </div>
            <div>
                <p className=" text-default-text">
                    <span className="font-bold underline">
                        Available Technician:
                    </span>{" "}
                    eden.turhann@gmail.com
                </p>
            </div>
        </nav>
    );
}
