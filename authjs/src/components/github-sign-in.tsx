import { githubSignIn } from "@/actions/githubSignIn";
import { Button } from "@/components/ui/button";
import { Github } from "@/components/ui/github";

function GithubSignIn() {
    return (
        <form action={githubSignIn}>
            <Button className="w-full" variant="outline">
                <Github />
                Continue with GitHub
            </Button>
        </form>
    );
}

export { GithubSignIn };
