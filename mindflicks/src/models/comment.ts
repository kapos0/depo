import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
    {
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
    },
    { timestamps: true }
);

const Comment =
    mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;

export type CommentType = {
    _id: string;
    content: string;
    author: string;
    post: string;
    createdAt: string;
    updatedAt: string;
    notifications?: string[];
};
