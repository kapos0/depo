"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/auth/FormFields";
import { GoogleAuthButton } from "@/components/auth/GoogleBtn";

type SignUpFormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function SignUpPage() {
    const form = useForm<SignUpFormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const [loading, setLoading] = useState(false);

    async function handleSubmit(data: SignUpFormValues) {
        console.log("signup data", data);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-8 h-8 rounded-md bg-primary/90 flex items-center justify-center text-white font-bold">
                                A
                            </div>
                            <h1 className="text-2xl font-bold">
                                Better-Auth Demo
                            </h1>
                        </div>
                    </Link>
                </div>

                <Card className="border-none shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">
                            Create an account
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter your information to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="space-y-4"
                            >
                                <InputField
                                    control={form.control}
                                    name="name"
                                    label="Full name"
                                    placeholder="john doe"
                                    type="text"
                                    icon={
                                        <User className="h-5 w-5 text-muted-foreground" />
                                    }
                                />

                                <InputField
                                    control={form.control}
                                    name="email"
                                    label="Email"
                                    placeholder="john.doe@example.com"
                                    type="email"
                                    icon={
                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                    }
                                />

                                <InputField
                                    control={form.control}
                                    name="password"
                                    label="Password"
                                    placeholder="••••••••"
                                    type="password"
                                    icon={
                                        <Lock className="h-5 w-5 text-muted-foreground" />
                                    }
                                    showPasswordToggle={true}
                                />

                                <InputField
                                    control={form.control}
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    placeholder="••••••••"
                                    type="password"
                                    icon={
                                        <Lock className="h-5 w-5 text-muted-foreground" />
                                    }
                                    showPasswordToggle={true}
                                />

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Please wait...
                                        </>
                                    ) : (
                                        <>
                                            Sign up{" "}
                                            <ArrowRight className="h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4 ">
                            <GoogleAuthButton
                                action="sign-up"
                                buttonText="Sign up with Google"
                                redirectTo="/dashboard"
                            />
                        </div>

                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/auth/sign-in"
                                className="font-medium text-primary underline-offset-4 hover:underline"
                            >
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
