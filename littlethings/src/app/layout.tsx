import { SessionProvider } from "next-auth/react";
import ThemeComp from "@/components/ThemeComp";
import Header from "@/components/Header";
import "@/assets/globals.css";
import ToastProvider from "@/components/toast-component";

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
                    <main className="flex items-center justify-center min-h-screen">
                        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                            <SessionProvider>
                                {children}
                                <ToastProvider />
                            </SessionProvider>
                        </div>
                    </main>
                </ThemeComp>
            </body>
        </html>
    );
}
