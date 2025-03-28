"use server";

import { connectDB } from "@/lib/conntectDB";
import User from "@/models/user";
import { auth, signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

async function login(formData: FormData): Promise<any> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    if (!username || !password) return "Please fill all fields";
    try {
        await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            username,
            password,
        });
    } catch (error) {
        const someError = error as CredentialsSignin;
        return someError.cause;
    }
    redirect("/");
}

async function fastLogin(service: "github" | "google") {
    try {
        await signIn(service, { callbackUrl: "/" });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to login");
    }
}

async function register(formData: FormData): Promise<any> {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const provider = "credentials";
    if (!username || !email || !password) return "Please fill all fields";

    await connectDB();

    // existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hash(password, 12);

    await User.create({ username, provider, email, password: hashedPassword });
    console.log(`User created successfully 🥂`);
    redirect("/sign-in");
}

async function fetchAllUsers() {
    await connectDB();
    const users = await User.find({});
    return users;
}

async function fetchUser() {
    const user = await auth();
    if (!user) throw new Error("User not found");
    const userEmail = user.user?.email;
    await connectDB();
    const dbUser = await User.findOne({ email: userEmail });
    return dbUser;
}

export { fastLogin, register, login, fetchAllUsers, fetchUser };
