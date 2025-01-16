"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { createPost } from "@/actions/postAction";
import toast from "react-hot-toast";

export default function CreatePost() {
    const { user } = useUser();
    const [textContent, setTextContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [showImageDropZone, setShowImageDropZone] = useState(false);

    async function handleSubmit() {
        if (!textContent.trim() && !imageUrl) return;
        setLoading(true);
        try {
            const result = await createPost(textContent, imageUrl);
            if (result?.success) {
                setTextContent("");
                setImageUrl("");
                setShowImageDropZone(false);
                toast.success("Post created successfully");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create post");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="mb-6">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex space-x-4">
                        <Avatar className="w-10 h-10">
                            <AvatarImage
                                src={user?.imageUrl || "/avatar.png"}
                            />
                        </Avatar>
                        <Textarea
                            placeholder="What's on your mind?"
                            className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/*(showImageDropZone || imageUrl) && (
                        <div className="border rounded-lg p-4">
                            <ImageUpload
                                endpoint="postImage"
                                value={imageUrl}
                                onChange={(url) => {
                                    setImageUrl(url);
                                    if (!url) setShowImageDropZone(false);
                                }}
                            />
                        </div>
                    )*/}

                    <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex space-x-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-primary"
                                onClick={() =>
                                    setShowImageDropZone(!showImageDropZone)
                                }
                                disabled={loading}
                            >
                                <ImageIcon className="size-4 mr-2" />
                                Photo
                            </Button>
                        </div>
                        <Button
                            className="flex items-center"
                            onClick={handleSubmit}
                            disabled={
                                (!textContent.trim() && !imageUrl) || loading
                            }
                        >
                            {loading ? (
                                <>
                                    <Loader2Icon className="size-4 mr-2 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <SendIcon className="size-4 mr-2" />
                                    Post
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
