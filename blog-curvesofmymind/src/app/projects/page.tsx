import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Projects() {
    return (
        <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
            <h1 className="text-3xl font-semibold">Look for my portfolio</h1>
            <p className="text-md text-muted-foreground">
                I am working hard to become a Full-Stack developer. I find
                myself successful in teamwork and I value the synergy that comes
                from working together. I also have experience as a computer
                technician; I am proficient in computer hardware.
            </p>
            <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
                <div className="flex-1 justify-center flex flex-col p-4">
                    <h2 className="text-2xl font-medium">
                        Want to learn more about me?
                    </h2>
                    <p className="text-muted-foreground my-2">
                        You can click the button below for all the details about
                        my projects and me.
                    </p>
                    <div className="flex justify-center sm:justify-start">
                        <a
                            href="https://turhanportfolyo.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-tl-xl rounded-bl-none">
                                Turhan&apos;s Portfolio
                            </Button>
                        </a>
                    </div>
                </div>
                <div className="p-4 flex-1">
                    <div className="relative w-full aspect-video">
                        <Image
                            src="/bg.jpg"
                            alt="JavaScript programming illustration"
                            fill
                            className="object-cover rounded-tr-xl rounded-br-3xl"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
