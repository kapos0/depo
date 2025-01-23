import { SessionProvider } from "next-auth/react";
import ThemeComp from "@/components/ThemeComp";
import Header from "@/components/Header";
import ToastProvider from "@/components/toast-component";
import "@/assets/globals.css";

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
                <title>Little Things</title>
            </head>
            <body>
                <ThemeComp>
                    <Header />
                    <SessionProvider>
                        {children}
                        <ToastProvider />
                    </SessionProvider>
                </ThemeComp>
            </body>
        </html>
    );
}
