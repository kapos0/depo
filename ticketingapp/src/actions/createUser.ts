"use server";

import { connectDB } from "@/lib/conntectDB";
import { executeAction } from "@/lib/executeAction";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function createUserAction(formData: FormData) {
    return executeAction({
        actionFn: async () => {
            if (!formData.get("email") || !formData.get("password")) {
                throw new Error("Email and password are required");
            }
            await connectDB();
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
        },
        successMessage: "User created successfully",
    });
}
