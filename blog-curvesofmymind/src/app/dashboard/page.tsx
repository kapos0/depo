"use client";
import { useEffect, useState } from "react";
import { deletePost, getPosts, updatePost } from "@/actions/PostAction";
import { PostType } from "@/models/PostModel";
import PostCardForAdmin from "@/components/PostCardForAdmin";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashBoardPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<PostType[] | any>([]);

    async function getAllPosts() {
        const res = await getPosts();
        setPosts(res);
    }

    function handlePostDeleted(deletedPostId: string) {
        setPosts((prevPosts: PostType[]) =>
            prevPosts.filter((post) => post._id !== deletedPostId)
        );
    }

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between my-4">
                <h1 className="text-2xl font-bold">Posts</h1>
                <Button
                    variant="outline"
                    className="rounded-full"
                    style={{ cursor: "pointer" }}
                >
                    <Link href="/dashboard/post/create">Create Post</Link>
                </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts &&
                    posts.map((post: PostType) => (
                        <PostCardForAdmin
                            key={post._id}
                            _id={post._id}
                            title={post.title}
                            content={post.content}
                            category={post.category}
                            image={post.image}
                            userId={post.userId}
                            slug={post.slug}
                            createdAt={post.createdAt}
                            updatedAt={post.updatedAt}
                            onDelete={() => deletePost(post._id)}
                            onUpdate={() =>
                                router.push("dashboard/post/" + post._id)
                            }
                            onPostDeleted={handlePostDeleted}
                        />
                    ))}
            </div>
        </div>
    );
}
