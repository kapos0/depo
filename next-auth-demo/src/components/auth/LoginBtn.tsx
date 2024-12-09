"use client"
import { useRouter } from "next/navigation"
type Props = {
    children: React.ReactNode
    mode?: "modal" | "redirect"
    asChild: boolean
}

export default function LoginButton({
    children,
    mode = "redirect",
    asChild,
}: Props) {
    const router = useRouter()
    function handleClick() {
        router.push("/auth/login")
    }
    return (
        <span
            className="cursor-pointer"
            onClick={handleClick}
        >
            {children}
        </span>
    )
}
