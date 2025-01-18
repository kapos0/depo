import "@/assets/globals.css";

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
                <title>Auth.js demo</title>
            </head>
            <body>
                <main className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
