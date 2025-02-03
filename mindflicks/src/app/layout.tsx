import { SessionProvider } from "next-auth/react";
import "@/assets/globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>Mind Flicks</title>
                <meta charSet="UTF-8" />
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
