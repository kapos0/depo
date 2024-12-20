import Image from "next/image"
import Link from "next/link"
import { auth, signIn, signOut } from "@/../auth"

export default async function Navbar() {
    const session = await auth()
    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        priority
                        width={140}
                        height={30}
                    />
                </Link>
                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/thing/create">
                                <span>Create</span>
                            </Link>
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut({ redirectTo: "/" })
                                }}
                            >
                                <button type="submit">Log Out</button>
                            </form>
                            <Link href={`/user/${session?.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                "use server"
                                await signIn("github")
                            }}
                        >
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}
