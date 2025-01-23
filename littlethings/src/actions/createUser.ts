"use server";

import { connectDB } from "@/lib/conntectDB";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function createUserAction(formData: FormData) {
    try {
        await connectDB();
        if (!formData.get("email") || !formData.get("password")) {
            return { message: "Email and password are required" };
        }
        const existingUser = await User.findOne({
            email: formData.get("email") as string,
        });
        if (existingUser) return { message: "User already exists" };
        const hashedPassword = await bcrypt.hash(
            formData.get("password") as string,
            10
        );
        const user = new User({
            email: formData.get("email") as string,
            provider: "credentials",
            password: hashedPassword,
        });
        await user.save();
        return { message: "User created successfully" };
    } catch {
        throw new Error("Failed to create user");
    }
}
