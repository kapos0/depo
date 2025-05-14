import mongoose, { Schema } from "mongoose";

const verificationSchema = new Schema(
    {
        identifier: { type: String, required: true },
        value: { type: String, required: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

const Verification =
    mongoose.models?.Verification ||
    mongoose.model("Verification", verificationSchema);
export default Verification;
