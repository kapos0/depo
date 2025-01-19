import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    provider: {
        type: String,
        required: true,
    },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
