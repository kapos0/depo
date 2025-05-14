import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        emailVerified: { type: Boolean, required: true },
        image: { type: String },
        sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
        accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    },
    { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
