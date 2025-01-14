"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import User from "@/models/user";
import { connectToDB } from "@/lib/connectToDB";

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
                followers: user.followers.length,
                following: user.following.length,
            },
        };
    } catch (error) {
        console.error("Error in getUser", error);
        throw error;
    }
}
