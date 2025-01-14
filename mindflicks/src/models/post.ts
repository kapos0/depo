import mongoose, { Schema } from "mongoose";

const PostModel = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, default: "" },
        image: { type: String, default: "" },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
        notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
    },
    { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostModel);
export default Post;

export type PostType = {
    _id: string;
    author: string;
    content?: string;
    image?: string;
    comments?: string[];
    likes?: string[];
    notifications?: string[];
    createdAt: string;
    updatedAt: string;
};
