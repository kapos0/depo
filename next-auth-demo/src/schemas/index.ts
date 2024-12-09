import * as z from "zod"

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
        message: "Please enter your password",
    }),
})

export const LoginSchema = z.object({
    name: z.string().min(1),
    email: z
        .string()
        .email({
            message: "Please enter a valid email address",
        })
        .min(1, {
            message: "Please enter your email address",
        }),
    password: z.string().min(1, {
        message: "Minimum password length is 6",
    }),
})
