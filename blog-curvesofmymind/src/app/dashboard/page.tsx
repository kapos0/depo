"use client";
import React, { useEffect } from "react";
import { deletePost, getPosts } from "@/actions/PostAction";

export default function DashBoardPage() {
    async function getAllPosts() {
        const res = await getPosts();
        console.log(res);
    }
    useEffect(() => {
        getAllPosts();
    }, []);

    async function handlePostDelete() {
        //her bir cardın sağ üst köşesinde bir çarpı işareti var. ona tıklayınca bu fonksiyon çalışacak ve post silinecek.
        const postId = "fjdskfds"; // //postId'yi buraya dinamik olarak alacaksınız.
        await deletePost(postId);
    }

    return (
        <div>
            <h1>DashBoardPage</h1>
        </div>
    );
}
