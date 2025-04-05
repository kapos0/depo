"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/actions/PostAction";
import { PostType } from "@/models/PostModel";
import PostCard from "@/components/PostCard";

export default function RecentPosts(limit?: number) {
    const [posts, setPosts] = useState<PostType[] | any>([]);

    async function getAllPosts() {
        const res = await getPosts(limit ? limit : undefined);
        setPosts(res);
    }
    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <>
            <h1 className="text-xl mt-5">Recent articles</h1>
            <div className="flex flex-wrap gap-5 mt-5 justify-center">
                {posts &&
                    posts.map((post: PostType) => (
                        <PostCard key={post._id} post={post} />
                    ))}
            </div>
        </>
    );
}
