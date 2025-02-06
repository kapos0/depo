import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CreatePost from "@/components/CreatePost";
import WhoToFollow from "@/components/WhoToFollow";

export default async function HomePage() {
    const session = await auth();
    if (!session) redirect("/sign-in");
    return (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-6">
                {session ? <CreatePost /> : null}
            </div>
            <div className="hidden lg:block lg:col-span-4 sticky top-20">
                <WhoToFollow />
            </div>
        </div>
    );
}
