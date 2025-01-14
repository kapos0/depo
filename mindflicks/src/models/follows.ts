import mongoose, { Schema } from "mongoose";

const FollowsSchema = new Schema(
    {
        follower: { type: Schema.Types.ObjectId, ref: "User", required: true },
        following: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

const Follows =
    mongoose.models.Follows || mongoose.model("Follows", FollowsSchema);
export default Follows;

export type FollowsType = {
    _id: string;
    follower: string;
    following: string;
    createdAt: string;
    updatedAt: string;
};
