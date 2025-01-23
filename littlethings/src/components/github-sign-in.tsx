import { githubSignIn } from "@/actions/githubSignIn";
import { Button } from "@/components/ui/button";

function GithubSignIn() {
    return (
        <form action={githubSignIn}>
            <Button className="w-full" variant="default">
                Continue with GitHub
            </Button>
        </form>
    );
}

export { GithubSignIn };
