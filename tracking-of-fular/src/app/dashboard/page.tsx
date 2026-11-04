import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getSession();
    if (!session?.user) redirect("/sign-in");
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
            <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        </div>
    );
}
