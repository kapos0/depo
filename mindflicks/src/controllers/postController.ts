"use server";
import { revalidatePath } from "next/cache";
import { fetchUser } from "./userController";
import Post from "@/models/post";
import User from "@/models/user";
import { connectDB } from "@/lib/conntectDB";

export async function createUserPost(content: string, image: string) {
    try {
        await connectDB();
        const user = await fetchUser();
        if (!user) return;

        const post = await Post.create({
            content,
            image: image,
            author: user._id,
            comments: [],
            likes: [],
        });

        await User.findByIdAndUpdate(
            { _id: user._id },
            {
                $push: { posts: post._id },
            }
        );

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to create post:", error);
        return { success: false, error: "Failed to create post" };
    }
}
