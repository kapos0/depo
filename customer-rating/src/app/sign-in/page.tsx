import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function SignInPage() {
    return (
        <main className="min-h-screen bg-[#f7f7f4] px-5 py-8 text-[#161616]">
            <div className="mx-auto max-w-md">
                <Link href="/" className="mb-10 flex items-center gap-2 px-1 text-base font-semibold tracking-tight">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#161616] text-sm text-white">m</span>
                    MasaPuan
                </Link>
                <AuthForm />
            </div>
        </main>
    );
}
