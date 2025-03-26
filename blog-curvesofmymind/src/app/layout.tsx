import type { Metadata } from "next";
import "@/assets/globals.css";

export const metadata: Metadata = {
    title: "Blog app",
    description: "This is a blog app with admin dashboard using",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
