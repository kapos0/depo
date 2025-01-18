import User from "@/models/user";
import { connectDB } from "./conntectDB";

export async function createUserToDB({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const newUser = new User({
        email,
        password,
    });

    try {
        await connectDB();
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}
