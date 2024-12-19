import "@/assets/globals.css"
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
                <title>Hype Jungle</title>
            </head>
            <body>{children}</body>
        </html>
    )
}
