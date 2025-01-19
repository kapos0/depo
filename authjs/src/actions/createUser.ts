"use server";

import { connectDB } from "@/lib/conntectDB";
import { executeAction } from "@/lib/executeAction";
import User from "@/models/user";

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
            const user = new User({
                email: formData.get("email") as string,
                password: formData.get("password") as string,
            });
            await user.save();
        },
        successMessage: "User created successfully",
    });
}
