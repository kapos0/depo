"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"
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

export default function SignIn() {
    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [pending, setPending] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setPending(true)
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })
        if (res?.ok) {
            router.push("/")
            toast.success("Login Successful")
        } else {
            toast.error("Something went wrong")
            setError("Something went wrong")
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
                    <CardTitle className="text-center">Sign in</CardTitle>
                    <CardDescription className="text-sm text-center text-accent-foreground">
                        Use email or service, to sign in
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
                            type="email"
                            disabled={pending}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            required
                        />
                        <Input
                            type="password"
                            disabled={pending}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            required
                        />
                        <Button
                            className="w-full"
                            size="lg"
                            disabled={pending}
                        >
                            Sign In
                        </Button>
                    </form>
                    <Separator />
                    <div className="flex my-2 justify-evenly mx-auto items-center">
                        <Button
                            disabled={pending}
                            onClick={() => {}}
                            variant="outline"
                            size="lg"
                            className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
                        >
                            <FcGoogle className="size-8 left-2.5 top-2.5" />
                        </Button>
                        <Button
                            disabled={pending}
                            onClick={(event) => handleProvider(event, "github")}
                            variant="outline"
                            size="lg"
                            className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
                        >
                            <FaGithub className="size-8 left-2.5 top-2.5" />
                        </Button>
                    </div>
                    <p className="text-center text-sm mt-2 text-muted-foreground">
                        Don't have an account?
                        <Link
                            href="sign-up"
                            className="text-sky-700 ml-4 hover:underline cursor-pointer"
                        >
                            Sign Up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
