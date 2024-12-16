import { NextResponse, NextRequest } from "next/server"
import bcryptjs from "bcryptjs"
import User from "@/models/user"
import { connectToDB } from "@/lib/DB"

export async function POST(req: NextRequest) {
    const { name, email, password, confirmPassword } = await req.json()

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
    if (!name || !email || !password || !confirmPassword) {
        return NextResponse.json(
            { message: " All fields are required" },
            { status: 400 }
        )
    }

    if (!isValidEmail(email)) {
        return NextResponse.json(
            { message: "Invalid email format" },
            { status: 400 }
        )
    }
    if (confirmPassword !== password) {
        return NextResponse.json(
            { message: "Password do not match" },
            { status: 400 }
        )
    }
    // if (password.length < 6) {
    //     return NextResponse.json(
    //         { message: "Password must be at least 6 character long" },
    //         { status: 400 }
    //     )
    // }
    try {
        await connectToDB()
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exist!" },
                { status: 400 }
            )
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })
        await newUser.save()
        return NextResponse.json({ message: "User created" }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
}