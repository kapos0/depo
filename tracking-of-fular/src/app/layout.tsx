import type { Metadata } from "next";
import "@/css/globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
    title: "Tracing of Fular",
    description: "A web application for tracking and managing fulars.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={cn("font-sans")}>
            <body className="antialiased">
                <Navbar />
                {children}
            </body>
        </html>
    );
}
