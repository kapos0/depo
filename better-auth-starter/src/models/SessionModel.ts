import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema(
    {
        expiresAt: { type: Date, required: true },
        token: { type: String, required: true, unique: true },
        ipAddress: { type: String },
        userAgent: { type: String },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

const Session =
    mongoose.models?.Session || mongoose.model("Session", sessionSchema);
export default Session;
