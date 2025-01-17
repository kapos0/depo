"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import { toggleFollow } from "@/actions/userAction";
import toast from "react-hot-toast";

export default function FollowButton({ userId }: { userId: string }) {
    const [loading, setLoading] = useState(false);
    async function handleFollow() {
        setLoading(true);
        try {
            const result = await toggleFollow(userId);
            if (result?.message === "You can't follow yourself") {
                toast.error(result.message);
            } else if (result?.success) {
                toast.success("Follow state updated");
            } else {
                toast.error(result?.error || "Error updating follow state");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating follow state");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button
            size={"sm"}
            variant={"secondary"}
            onClick={handleFollow}
            disabled={loading}
            className="w-20"
        >
            {loading ? (
                <Loader2Icon className="size-4 animate-spin" />
            ) : (
                "Follow"
            )}
        </Button>
    );
}
