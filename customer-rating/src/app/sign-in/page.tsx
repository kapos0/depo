import { AuthForm } from "@/components/auth-form";
import { Brand } from "@/components/brand";

export default function SignInPage() {
    return (
        <main className="min-h-screen bg-[#f7f7f4] px-5 py-8 text-[#161616]">
            <div className="mx-auto max-w-md">
                <div className="mb-10 px-1"><Brand compact /></div>
                <AuthForm />
            </div>
        </main>
    );
}
