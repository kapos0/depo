import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function HomePage() {
    const user = await auth();
    if (!user) return redirect("/sign-in");
    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
}
