"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import User from "@/models/user";
import { connectToDB } from "@/lib/connectToDB";
import Notification from "@/models/notification";
import { revalidatePath } from "next/cache";
import Follows from "@/models/follows";

export async function syncUser() {
    try {
        await connectToDB();
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) return;

        const existingUser = await User.findOne({ clerkId: userId });

        if (existingUser) return existingUser;

        const newUser = await User.create({
            clerkId: userId,
            name: `${user.firstName || ""} ${user.lastName || ""}`,
            username:
                user.username ??
                user.emailAddresses[0].emailAddress.split("@")[0],
            email: user.emailAddresses[0].emailAddress,
            image: user.imageUrl,
        });

        return newUser;
    } catch (error) {
        console.error("Error in syncUser", error);
    }
}

export async function getUserByClerckID(userId: string) {
    try {
        await connectToDB();
        const user = await User.findOne({ clerkId: userId }).populate([
            { path: "Post", select: "_id" },
            { path: "followers", select: "_id" },
            { path: "following", select: "_id" },
        ]);

        if (!user) {
            return null;
        }
        return {
            ...user.toObject(),
            _count: {
                posts: user.posts.length,
                followers: user.followersCount,
                following: user.followingCount,
            },
        };
    } catch (error) {
        console.error("Error in getUser", error);
        throw error;
    }
}

export async function getDBUserId() {
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("Unauthorized");
    const user = await getUserByClerckID(clerkId);
    if (!user) throw new Error("User not found");
    return user._id;
}

export async function getRandomUsers() {
    try {
        const userId = await getDBUserId();
        if (!userId) return [];

        const randomUsers = await User.aggregate([
            {
                $match: {
                    $and: [
                        { _id: { $ne: userId } },
                        {
                            followers: {
                                $not: {
                                    $elemMatch: { followerId: userId },
                                },
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    id: "$_id",
                    name: 1,
                    username: 1,
                    image: 1,
                    followersCount: { $size: "$followers" },
                },
            },
            { $sample: { size: 3 } },
        ]);

        return randomUsers;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function toggleFollow(targetedUserId: string) {
    try {
        const userId = await getDBUserId();
        if (!userId) return;
        if (userId === targetedUserId)
            return { message: "You can't follow yourself" };

        const alreadyFollowing = await Follows.findOne({
            follower: userId,
            following: targetedUserId,
        });

        if (alreadyFollowing) {
            // Unfollow logic
            await Follows.deleteOne({
                follower: userId,
                following: targetedUserId,
            });
            await User.updateOne(
                { _id: userId },
                { $pull: { following: targetedUserId } }
            );
            await User.updateOne(
                { _id: targetedUserId },
                { $pull: { followers: userId } }
            );
        } else {
            // Follow logic
            await Follows.create({
                follower: userId,
                following: targetedUserId,
            });

            await User.updateOne(
                { _id: userId },
                { $push: { following: targetedUserId } }
            );
            await User.updateOne(
                { _id: targetedUserId },
                { $push: { followers: userId } }
            );

            await Notification.create({
                type: "FOLLOW",
                user: targetedUserId, // user being followed
                creator: userId, // user following
            });
        }

        const updateFollowersCount = async (userId: string) => {
            const followersCount = await Follows.countDocuments({
                following: userId,
            });
            await User.findByIdAndUpdate(userId, { followersCount });
        };

        const updateFollowingCount = async (userId: string) => {
            const followingCount = await Follows.countDocuments({
                follower: userId,
            });
            await User.findByIdAndUpdate(userId, { followingCount });
        };

        await updateFollowingCount(userId);
        await updateFollowersCount(targetedUserId);

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Error toggling follow" };
    }
}
