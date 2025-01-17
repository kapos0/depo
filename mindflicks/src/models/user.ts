import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
    {
        clerkId: {
            type: String,
            required: [true, "ClerkId is required!"],
        },
        email: {
            type: String,
            unique: [true, "Email already exits!"],
            required: [true, "Email is required!"],
        },
        username: {
            type: String,
            unique: [true, "Username already exits!"],
            required: [true, "Username is required!"],
        },
        name: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        location: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        },
        posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
        followers: [{ type: Schema.Types.ObjectId, ref: "Follows" }],
        following: [{ type: Schema.Types.ObjectId, ref: "Follows" }],
        notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
        notificationsCreated: [
            { type: Schema.Types.ObjectId, ref: "Notification" },
        ],
        followersCount: {
            type: Number,
            default: 0,
        },
        followingCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;

export type UserType = {
    _id: string;
    clerkId: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    name?: string;
    bio?: string;
    image?: string;
    location?: string;
    website?: string;
    posts?: string[];
    comments?: string[];
    likes?: string[];
    followers?: string[];
    following?: string[];
    notifications?: string[];
    notificationsCreated?: string[];
    followersCount?: number;
    followingCount?: number;
};
