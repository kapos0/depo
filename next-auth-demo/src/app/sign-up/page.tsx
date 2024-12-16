"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { Separator } from "@radix-ui/react-separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { TriangleAlert } from "lucide-react"
import { signIn } from "next-auth/react"

type formDataType = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export default function SignUp() {
    const router = useRouter()
    const [form, setForm] = useState<formDataType>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState<boolean>(false)
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setPending(true)
        const res = await fetch("api/auth/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
        const data = await res.json()
        if (res.ok) {
            setPending(false)
            toast.success(data.message, {
                action: {
                    label: "Close",
                    onClick: () => {},
                },
            })
            router.push("/sign-in")
        } else {
            setPending(false)
            setError(data.message)
        }
    }
    const handleProvider = (
        event: React.MouseEvent<HTMLButtonElement>,
        value: "github" | "google"
    ) => {
        event.preventDefault()
        signIn(value, { callbackUrl: "/" })
    }
    return (
        <div className="h-full flex items-center justify-center bg-[#1b0918]">
            <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
                <CardHeader>
                    <CardTitle className="text-center">Sign Up</CardTitle>
                    <CardDescription className="text-sm text-center text-accent-foreground">
                        Use email or service, to sign up
                    </CardDescription>
                </CardHeader>
                {!!error && (
                    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                        <TriangleAlert />
                        <p>{error}</p>
                    </div>
                )}
                <CardContent className="px-2 sm:px-6">
                    <form
                        onSubmit={handleSubmit}
                        className="sm:space-y-3"
                    >
                        <Input
                            type="text"
                            disabled={pending}
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => {
                                setForm((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }}
                            required
                        />
                        <Input
                            type="email"
                            disabled={pending}
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => {
                                setForm((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }}
                            required
                        />
                        <Input
                            type="password"
                            disabled={pending}
                            placeholder="Enter Password"
                            value={form.password}
                            onChange={(e) => {
                                setForm((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }}
                            required
                        />
                        <Input
                            type="password"
                            disabled={pending}
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={(e) => {
                                setForm((prev) => ({
                                    ...prev,
                                    confirmPassword: e.target.value,
                                }))
                            }}
                            required
                        />
                        <Button
                            className="w-full"
                            size="lg"
                            disabled={pending}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Separator />
                    <div className="flex my-2 justify-evenly mx-auto items-center">
                        <Button
                            disabled={false}
                            onClick={() => {}}
                            variant="outline"
                            size="lg"
                            className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
                        >
                            <FcGoogle className="size-8 left-2.5 top-2.5" />
                        </Button>
                        <Button
                            disabled={false}
                            onClick={(event) => handleProvider(event, "github")}
                            variant="outline"
                            size="lg"
                            className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
                        >
                            <FaGithub className="size-8 left-2.5 top-2.5" />
                        </Button>
                    </div>
                    <p className="text-center text-sm mt-2 text-muted-foreground">
                        Have an account?
                        <Link
                            href="sign-in"
                            className="text-sky-700 ml-4 hover:underline cursor-pointer"
                        >
                            Sign In
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
