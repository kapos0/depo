"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getPostById, publishPost, updatePost } from "@/actions/PostAction";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ImageUpload";

export default function CreatePostPage({
    params: paramsPromise,
}: {
    params: Promise<{ postId: string }>;
}) {
    const params = React.use(paramsPromise);
    const [loading, setLoading] = useState(false);
    const { data } = useSession();
    useEffect(() => {
        async function woa() {
            try {
                if (params.postId === "create") {
                    setLoading(true);
                    setFormData({
                        title: "",
                        category: "",
                        content: "",
                        image_url: "",
                        slug: "",
                    });
                } else if (params.postId === "update") {
                    setLoading(true);
                    const postId = params.postId;
                    const post = await getPostById(postId);
                    setLoading(false);
                    if (!post) return;
                    setFormData({
                        title: post.title,
                        category: post.category,
                        content: post.content,
                        image_url: post.image_url,
                        slug: post.slug,
                    });
                    const formDataToSend = new FormData();
                    formDataToSend.append("title", formData.title);
                    formDataToSend.append("category", formData.category);
                    formDataToSend.append("content", formData.content);
                    formDataToSend.append("image_url", formData.image_url);
                    formDataToSend.append("slug", formData.slug);
                    setLoading(true);
                    await updatePost(postId, formDataToSend);
                    setLoading(false);
                    setFormData({
                        title: "",
                        category: "",
                        content: "",
                        image_url: "",
                        slug: "",
                    });
                }
            } catch (error) {
                console.error("Error in useEffect:", error);
                setLoading(false);
            }
        }
        woa();
    }, [params, data]);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        content: "",
        image_url: "",
        slug: "",
    });
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!formData.title || !formData.content || !formData.category) return;
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("image_url", formData.image_url);
        formDataToSend.append("slug", formData.title.replace(/\s+/g, "-")); //replace spaces with -
        try {
            setLoading(true);
            await publishPost(formDataToSend);
            setLoading(false);
            setFormData({
                title: "",
                category: "",
                content: "",
                image_url: "",
                slug: "",
            });
        } catch (err) {
            console.error("Error in handleSubmit:", err);
        } finally {
            setLoading(false);
        }
    }

    if (!data?.user) return <Loading />;
    if (data?.user?.role !== "admin")
        return (
            <div>
                <h1 className="text-center mt-[25vh] font-extrabold text-5xl text-red-500">
                    Access Denied
                </h1>

                <Link
                    href="/"
                    className="text-center block mb-4 text-blue-500 hover:underline"
                >
                    Go back to Home
                </Link>
            </div>
        );
    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">
                Create a post
            </h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <Input
                        type="text"
                        placeholder="Title"
                        required
                        id="title"
                        value={formData.title}
                        className="flex-1"
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />
                    <Select
                        onValueChange={(value) =>
                            setFormData({ ...formData, category: value })
                        }
                    >
                        <SelectTrigger
                            value={formData.category}
                            className="w-full sm:w-[200px]"
                        >
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="uncategorized">
                                Uncategorized
                            </SelectItem>
                            <SelectItem value="javascript">News</SelectItem>
                            <SelectItem value="reactjs">Thoughts</SelectItem>
                            <SelectItem value="nextjs">Fun</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <ImageUpload
                    endpoint="imageUploader"
                    value={formData.image_url}
                    onChange={(url) =>
                        setFormData({ ...formData, image_url: url })
                    }
                />
                <MDEditor
                    value={formData.content}
                    onChange={(value) => {
                        setFormData({ ...formData, content: value || "" });
                    }}
                />

                <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                    Publish
                </Button>
            </form>
        </div>
    );
}
