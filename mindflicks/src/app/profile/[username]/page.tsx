import { getProfileByUsername } from "@/controllers/profileController";
import { notFound } from "next/navigation";

export default async function ProfilePageServer({
    params,
}: {
    params: { username: string };
}) {
    const { username } = await params;
    const user = await getProfileByUsername(username);
    if (!user) notFound();
    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
}
