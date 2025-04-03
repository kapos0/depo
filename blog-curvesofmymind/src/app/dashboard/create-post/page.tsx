"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
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

export default function CreatePostPage() {
    const { data } = useSession();
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        content: "",
        image_url: "",
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!formData.title || !formData.content || !formData.category) return;
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
                        <SelectTrigger className="w-full sm:w-[200px]">
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
