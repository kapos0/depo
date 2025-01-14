import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
        type: {
            type: String,
            enum: ["LIKE", "COMMENT", "FOLLOW"],
            required: true,
        },
        read: { type: Boolean, default: false },
        post: { type: Schema.Types.ObjectId, ref: "Post" },
        comment: { type: Schema.Types.ObjectId, ref: "Comment" },
    },
    { timestamps: true }
);

const Notification =
    mongoose.models.Notification ||
    mongoose.model("Notification", NotificationSchema);
export default Notification;

export type NotificationType = {
    _id: string;
    user: string;
    creator: string;
    type: "LIKE" | "COMMENT" | "FOLLOW";
    read: boolean;
    post?: string;
    comment?: string;
    createdAt: string;
    updatedAt: string;
};
