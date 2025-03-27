import type { Metadata } from "next";
import "@/assets/globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

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
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
            </head>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
