import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        provider: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String },
        avatar: { type: String, required: false },
        role: { type: String, default: "user" },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
