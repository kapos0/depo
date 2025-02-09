import { notFound, redirect } from "next/navigation";
import {
    getPostsByAuthor,
    getProfileByUsername,
    isFollowing,
} from "@/controllers/profileController";
import { auth } from "@/auth";
import ProfilePageClient from "./ProfilePageClient";

export default async function ProfilePageServer({
    params,
}: {
    params: { username: string };
}) {
    const session = await auth();
    if (!session) return redirect("/sign-in");
    const { username } = await params;
    const user = await getProfileByUsername(username);
    if (!user) return notFound();
    const posts = await getPostsByAuthor(user._id);
    console.log("🚀 ~ posts:", posts);
    const following = await isFollowing(user._id);
    return (
        <ProfilePageClient user={user} posts={posts} following={following} />
    );
}
