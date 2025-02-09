"use client";

import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    getPostsByAuthor,
    getProfileByUsername,
    updateProfile,
} from "@/controllers/profileController";
import { toggleFollow } from "@/controllers/userController";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { format } from "date-fns";
import {
    CalendarIcon,
    EditIcon,
    FileTextIcon,
    HeartIcon,
    LinkIcon,
    MapPinIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePageClient({
    user,
    following,
    posts,
}: {
    user: Awaited<ReturnType<typeof getProfileByUsername>>;
    posts: Awaited<ReturnType<typeof getPostsByAuthor>>;
    following: boolean;
}) {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [isFollowing, setIsFollowing] = useState(following);
    const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
    const [editForm, setEditForm] = useState({
        username: user.username || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
    });
    async function handleEditSubmit() {
        const formData = new FormData();
        Object.entries(editForm).forEach(([key, value]) => {
            formData.append(key, value);
        });
        const result = await updateProfile(formData);
        if (result.success) {
            setShowEditDialog(false);
            toast.success("Profile updated successfully");
        }
    }
    async function handleFollow() {
        if (!user) return;

        try {
            setIsUpdatingFollow(true);
            await toggleFollow(user._id);
            setIsFollowing(!isFollowing);
        } catch (error) {
            toast.error("Failed to update follow status");
        } finally {
            setIsUpdatingFollow(false);
        }
    }

    const isOwnProfile =
        user?.username === user.username ||
        user?.emailAddresses[0].emailAddress.split("@")[0] === user.username;

    const formattedDate = format(new Date(user.createdAt), "MMMM yyyy");
    console.log("🚀 ~ user:", user);
    console.log("🚀 ~ formattedDate:", formattedDate);
    console.log("🚀 ~ isOwnProfile:", isOwnProfile);
    return (
        <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 gap-6">
                <div className="w-full max-w-lg mx-auto">
                    <Card className="bg-card">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage
                                        src={user.image ?? "/avatar.png"}
                                    />
                                </Avatar>
                                <h1 className="mt-4 text-2xl font-bold">
                                    {user.name ?? user.username}
                                </h1>
                                <p className="text-muted-foreground">
                                    @{user.username}
                                </p>
                                <p className="mt-2 text-sm">{user.bio}</p>

                                {/* PROFILE STATS */}
                                <div className="w-full mt-6">
                                    <div className="flex justify-between mb-4">
                                        <div>
                                            <div className="font-semibold">
                                                {user.following.length}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Following
                                            </div>
                                        </div>
                                        <Separator orientation="vertical" />
                                        <div>
                                            <div className="font-semibold">
                                                {user.followers.length}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Followers
                                            </div>
                                        </div>
                                        <Separator orientation="vertical" />
                                        <div>
                                            <div className="font-semibold">
                                                {posts.length}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Posts
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* "FOLLOW & EDIT PROFILE" BUTTONS */}
                                {!user ? (
                                    <Link href="/sign-in">
                                        <Button className="w-full mt-4">
                                            Follow
                                        </Button>
                                    </Link>
                                ) : isOwnProfile ? (
                                    <Button
                                        className="w-full mt-4"
                                        onClick={() => setShowEditDialog(true)}
                                    >
                                        <EditIcon className="size-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full mt-4"
                                        onClick={handleFollow}
                                        disabled={isUpdatingFollow}
                                        variant={
                                            isFollowing ? "outline" : "default"
                                        }
                                    >
                                        {isFollowing ? "Unfollow" : "Follow"}
                                    </Button>
                                )}

                                {/* LOCATION & WEBSITE */}
                                <div className="w-full mt-6 space-y-2 text-sm">
                                    {user.location && (
                                        <div className="flex items-center text-muted-foreground">
                                            <MapPinIcon className="size-4 mr-2" />
                                            {user.location}
                                        </div>
                                    )}
                                    {user.website && (
                                        <div className="flex items-center text-muted-foreground">
                                            <LinkIcon className="size-4 mr-2" />
                                            <a
                                                href={
                                                    user.website.startsWith(
                                                        "http"
                                                    )
                                                        ? user.website
                                                        : `https://${user.website}`
                                                }
                                                className="hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {user.website}
                                            </a>
                                        </div>
                                    )}
                                    <div className="flex items-center text-muted-foreground">
                                        <CalendarIcon className="size-4 mr-2" />
                                        Joined {formattedDate}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="posts" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                        <TabsTrigger
                            value="posts"
                            className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
                                data-[state=active]:bg-transparent px-6 font-semibold"
                        >
                            <FileTextIcon className="size-4" />
                            Posts
                        </TabsTrigger>
                        <TabsTrigger
                            value="likes"
                            className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
                                data-[state=active]:bg-transparent px-6 font-semibold"
                        >
                            <HeartIcon className="size-4" />
                            Likes
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="posts" className="mt-6">
                        <div className="space-y-6">
                            {posts?.length > 0 ? (
                                posts?.map((post: any) => (
                                    <PostCard
                                        key={Math.random()}
                                        post={post}
                                        dbUserId={user.id}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No posts yet
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="likes" className="mt-6">
                        <div className="space-y-6">
                            {user.likes.length > 0 ? (
                                user.likes.map((post: any) => (
                                    <PostCard
                                        key={Math.random()}
                                        post={post}
                                        dbUserId={user.id}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No liked posts to show
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>

                <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input
                                    name="name"
                                    value={editForm.username}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            username: e.target.value,
                                        })
                                    }
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Bio</Label>
                                <Textarea
                                    name="bio"
                                    value={editForm.bio}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            bio: e.target.value,
                                        })
                                    }
                                    className="min-h-[100px]"
                                    placeholder="Tell us about yourself"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Location</Label>
                                <Input
                                    name="location"
                                    value={editForm.location}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            location: e.target.value,
                                        })
                                    }
                                    placeholder="Where are you based?"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Website</Label>
                                <Input
                                    name="website"
                                    value={editForm.website}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            website: e.target.value,
                                        })
                                    }
                                    placeholder="Your personal website"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleEditSubmit}>
                                Save Changes
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
