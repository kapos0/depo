import type { Metadata } from "next";
import "@/css/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
    title: "Tracing of Fular",
    description: "A web application for tracking and managing fulars.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={cn("font-sans", geist.variable)}>
            <body className="antialiased">{children}</body>
        </html>
    );
}
