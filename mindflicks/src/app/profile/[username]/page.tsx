import {
    getProfileByUsername,
    getUserLikedPosts,
    getUserPosts,
    isFollowing,
} from "@/controllers/profileController";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

export default async function ProfilePageServer({
    params,
}: {
    params: { username: string };
}) {
    const user = await getProfileByUsername(params.username);

    if (!user) notFound();

    const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing(user.id),
    ]);

    return (
        <ProfilePageClient
            user={user}
            posts={posts}
            likedPosts={likedPosts}
            isFollowing={isCurrentUserFollowing}
        />
    );
}
