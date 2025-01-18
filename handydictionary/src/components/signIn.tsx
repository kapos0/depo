import { signIn, signOut } from "@/lib/auth";

export default function SignIn() {
    return (
        <div>
            <form
                action={async () => {
                    "use server";
                    const result = await signIn("credentials", {
                        email: "dalinnx1@gmail.com",
                        password: "deneme1",
                    });
                    console.log(result);
                }}
            >
                <button type="submit">Signin with Email and Password</button>
            </form>
            <form
                action={async () => {
                    "use server";
                    const result = await signOut();
                    console.log(result);
                }}
            >
                <button type="submit">Sign Out</button>
            </form>
        </div>
    );
}
