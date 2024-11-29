import "../assets/globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <title>My Blog App</title>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
