import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>Hello</h1>
            <p>This is the landing page please go to the dashboard or login</p>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/auth/sign-in">Sign In</Link>
            <Link href="/auth/sign-up">Sign Up</Link>
        </div>
    );
}
