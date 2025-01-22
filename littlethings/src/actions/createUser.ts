"use server";

import { connectDB } from "@/lib/conntectDB";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function createUserAction(formData: FormData) {
    await connectDB();
    if (!formData.get("email") || !formData.get("password")) {
        throw new Error("Email and password are required");
    }
    const existingUser = await User.findOne({
        email: formData.get("email") as string,
    });
    if (existingUser) throw new Error("User already exists");
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
    return user;
}
