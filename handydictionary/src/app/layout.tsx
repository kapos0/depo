import "@/assets/globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>Handy Dictionary</title>
                <link
                    rel="shortcut icon"
                    href="favicon.ico"
                    type="image/x-icon"
                />
            </head>
            <body>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}
