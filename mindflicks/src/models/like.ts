import mongoose, { Schema } from "mongoose";

const LikeSchema = new Schema(
    {
        post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

const Like = mongoose.models.Like || mongoose.model("Like", LikeSchema);
export default Like;

export type LikeType = {
    _id: string;
    post: string;
    user: string;
    createdAt: string;
    updatedAt: string;
};
