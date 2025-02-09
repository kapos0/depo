import Post from "@/models/post";
import User from "@/models/user";
import { fetchUser } from "./userController";
import { revalidatePath } from "next/cache";

export async function getProfileByUsername(username: string) {
    try {
        const user = await User.findOne({ username })
            .populate("_id followers following")
            .select("_id username posts createdAt");
        return user;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw new Error("Failed to fetch profile");
    }
}

export async function getUserPosts(userId: string) {
    try {
        const posts = await Post.find({ author: userId })
            .populate({
                path: "author",
                select: "_id name username image",
            })
            .populate({
                path: "comments.author",
                select: "_id name username image",
            })
            .populate({
                path: "likes",
                select: "_id",
            })
            .sort({ createdAt: -1 })
            .lean();
        const formattedPosts = posts.map((post: any) => ({
            ...post,
            _count: {
                likes: post.likes.length,
                comments: post.comments.length,
            },
        }));

        return formattedPosts;
    } catch (error) {
        console.error("Error fetching user posts:", error);
        throw new Error("Failed to fetch user posts");
    }
}

export async function getUserLikedPosts(userId: string) {
    try {
        const likedPosts = await Post.find({ likes: userId })
            .populate({
                path: "author",
                select: "_id name username image",
            })
            .populate({
                path: "comments.author",
                select: "_id name username image",
            })
            .populate({
                path: "likes",
                select: "_id",
            })
            .sort({ createdAt: -1 })
            .lean();
        const formattedPosts = likedPosts.map((post) => ({
            ...post,
            _count: {
                likes: post.likes.length,
                comments: post.comments.length,
            },
        }));
        return formattedPosts;
    } catch (error) {
        console.error("Error fetching liked posts:", error);
        throw new Error("Failed to fetch liked posts");
    }
}

export async function updateProfile(formData: FormData) {
    try {
        const authUser = await fetchUser();
        const userId = authUser?._id;
        if (!userId) throw new Error("Unauthorized");

        const name = formData.get("name") as string;
        const bio = formData.get("bio") as string;
        const location = formData.get("location") as string;
        const website = formData.get("website") as string;

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { name, bio, location, website },
            { new: true }
        ).lean();

        if (!user) throw new Error("User not found");

        revalidatePath("/profile");
        return { success: true, user };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: "Failed to update profile" };
    }
}

export async function isFollowing(userId: string) {
    try {
        const dbUserId = await fetchUser();
        const currentUserId = dbUserId?._id;
        if (!currentUserId) return false;

        const user = await User.findById(currentUserId);
        if (!user) return false;

        const isFollowing = user.following.includes(userId);

        return isFollowing;
    } catch (error) {
        console.error("Error checking follow status:", error);
        return false;
    }
}
