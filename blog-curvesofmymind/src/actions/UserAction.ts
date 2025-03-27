import { connectDB } from "@/lib/conntectDB";
import User from "@/models/UserModel";

export const createOrUpdateUser = async (
    _id: string,
    avatar: string,
    email: string,
    username: string
) => {
    try {
        await connectDB();
        const user = await User.findByIdAndUpdate(
            _id,
            {
                $set: {
                    avatar,
                    email,
                    username,
                },
            },
            { new: true, upsert: true }
        );
        return user;
    } catch (error) {
        console.error("Error creating or updating user:", error);
    }
};

export const deleteUser = async (_id: string) => {
    try {
        await connectDB();
        await User.findByIdAndDelete(_id);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
