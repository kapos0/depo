import User from "@/models/user";
import Post from "@/models/post";
import { fetchUser } from "./userController";
import { revalidatePath } from "next/cache";

// Get user profile by username
export async function getProfileByUsername(username: string) {
    try {
        const user = await User.findOne({ username })
            .select("id name username bio image location website createdAt")
            .populate({
                path: "followers following posts",
                select: "id username",
            });

        return user;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw new Error("Failed to fetch profile");
    }
}

// Get posts by user ID
export async function getUserPosts(userId: string) {
    try {
        const posts = await Post.find({ author: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "author comments.author likes",
                select: "id name username image",
            })
            .populate({
                path: "comments",
                select: "content createdAt",
                populate: {
                    path: "author",
                    select: "id name username image",
                },
            });

        return posts;
    } catch (error) {
        console.error("Error fetching user posts:", error);
        throw new Error("Failed to fetch user posts");
    }
}

// Get liked posts by user ID
export async function getUserLikedPosts(userId: string) {
    try {
        const likedPosts = await Post.find({ likes: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "author comments.author likes",
                select: "id name username image",
            })
            .populate({
                path: "comments",
                select: "content createdAt",
                populate: {
                    path: "author",
                    select: "id name username image",
                },
            });

        return likedPosts;
    } catch (error) {
        console.error("Error fetching liked posts:", error);
        throw new Error("Failed to fetch liked posts");
    }
}

// Update user profile
export async function updateProfile(formData: FormData) {
    try {
        const dbuser = await fetchUser();
        const userId = dbuser?._id;
        if (!userId) throw new Error("Unauthorized");

        const name = formData.get("name") as string;
        const bio = formData.get("bio") as string;
        const location = formData.get("location") as string;
        const website = formData.get("website") as string;

        const user = await User.findOneAndUpdate(
            { userId },
            { name, bio, location, website },
            { new: true }
        );

        revalidatePath("/profile");
        return { success: true, user };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: "Failed to update profile" };
    }
}

// Check if a user is following another user
export async function isFollowing(userId: string) {
    try {
        const dbuser = await fetchUser();
        const currentUserId = dbuser?._id;
        if (!currentUserId) return false;

        const follow = await User.findOne({
            _id: currentUserId,
            following: userId,
        });

        return !!follow;
    } catch (error) {
        console.error("Error checking follow status:", error);
        return false;
    }
}
