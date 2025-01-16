"use server";

import { revalidatePath } from "next/cache";
import { getDBUserId } from "./userAction";
import Post from "@/models/post";

export async function createPost(textContent: string, imageUrl: string) {
    try {
        const userId = await getDBUserId();
        if (!userId) return;

        const post = await Post.create({
            content: textContent,
            image: imageUrl,
            author: userId,
        });

        revalidatePath("/");

        // Convert MongoDB document to plain JSON
        const plainPost = post.toObject();

        // Convert _id and author to strings
        plainPost._id = plainPost._id.toString();
        plainPost.author = plainPost.author.toString(); // Convert author (likely an ObjectId) to a string

        // Convert dates to strings
        if (plainPost.createdAt instanceof Date) {
            plainPost.createdAt = plainPost.createdAt.toISOString();
        }
        if (plainPost.updatedAt instanceof Date) {
            plainPost.updatedAt = plainPost.updatedAt.toISOString();
        }

        return { success: true, post: plainPost };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to create post" };
    }
}
