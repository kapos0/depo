import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "@/assets/globals.css";

import NavBar from "@/components/NavBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <head>
                    <title>Mind Flicks</title>
                    <link
                        rel="shortcut icon"
                        href="favicon.ico"
                        type="image/x-icon"
                    />
                </head>
                <body className="min-h-screen">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <NavBar />
                        <main className="py-8">
                            <div className="max-w-7xl mx-auto px-4">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    <div className="hidden lg:block lg:col-span-3">
                                        Side Bar
                                    </div>
                                    <div className="lg:col-span-9">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
