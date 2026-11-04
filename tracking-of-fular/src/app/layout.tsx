import type { Metadata } from "next";
import "@/css/globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
    title: "Fular | Kişisel takip panon",
    description: "Kitap, film, podcast ve daha fazlasını kişisel panolarında takip et.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="tr" className={cn("font-sans")}>
            <body className="antialiased">
                <Navbar />
                {children}
            </body>
        </html>
    );
}
