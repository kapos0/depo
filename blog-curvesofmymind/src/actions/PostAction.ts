"use server";

import Post from "@/models/PostModel";
import { connectDB } from "@/lib/connectDB";
import { auth } from "@/auth";

export async function getPosts() {
    try {
        await connectDB();
        const posts = await Post.find({});
        const plainPosts = posts.map((post) => post.toObject());
        const forClientPosts = plainPosts.map((post) => ({
            ...post,
            _id: post._id.toString(),
            userId: post.userId?.toString(),
            createdAt: post.createdAt?.toISOString(),
            updatedAt: post.updatedAt?.toISOString(),
        }));
        return forClientPosts;
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

export async function getPostById(postId: string) {
    //sanırım gerek kalmadı
    try {
        await connectDB();
        const post = await Post.findById(postId);
        if (!post) throw new Error("Post not found");
        const plainPost = post.toObject();
        const forClientPost = {
            ...plainPost,
            _id: plainPost._id.toString(),
            userId: plainPost.userId?.toString(),
            createdAt: plainPost.createdAt?.toISOString(),
            updatedAt: plainPost.updatedAt?.toISOString(),
        };
        return forClientPost;
    } catch (error) {
        console.error("Error fetching post:", error);
    }
}

export async function deletePost(postId: string) {
    try {
        await connectDB();
        const session = await auth();
        if (!session || !session.user)
            throw new Error("User not authenticated");
        const post = await Post.findById(postId);
        if (!post) throw new Error("Post not found");
        await Post.findByIdAndDelete(postId);
        console.log("Post deleted successfully 🥂");
    } catch (error) {
        console.error("Error deleting post:", error);
    }
}

export async function publishPost(formData: FormData) {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const image_url = formData.get("image_url") as string;
    const slug = formData.get("slug") as string;
    try {
        await connectDB();
        const session = await auth();
        if (!session || !session.user)
            throw new Error("User not authenticated");
        await Post.create({
            userId: session?.user?.id,
            title,
            category,
            content,
            image: image_url,
            slug,
        });
        console.log("Post published successfully 🥂");
        return;
    } catch (error) {
        console.error("Error publishing post:", error);
    }
}

export async function updatePost(postId: string, formData: FormData) {
    try {
        await connectDB();
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $set: {
                    title: formData.get("title") as string,
                    category: formData.get("category") as string,
                    content: formData.get("content") as string,
                    image_url: formData.get("image_url") as string,
                    slug: formData.get("slug") as string,
                },
            },
            { new: true }
        );
        if (!post) throw new Error("Post not found");
    } catch (error) {
        console.error("Error updating post:", error);
    }
}
