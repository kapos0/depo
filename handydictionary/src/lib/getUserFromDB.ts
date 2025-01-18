import User from "@/models/user";
import { connectDB } from "./conntectDB";

export const getUserFromDb = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    try {
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) return null;
        if (user.password === password) return user;
    } catch (error) {
        console.error("Error getting user from db:", error);
        throw new Error("Error getting user from db");
    }
    return null;
};
