import "@/assets/globals.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="description"
                    content="A Better Auth Starter Kit for Next.js"
                />
                <link rel="icon" href="/favicon.ico" />
                <title>Better Auth Demo</title>
            </head>
            <body>
                {children} <ToastContainer />
            </body>
        </html>
    );
}
