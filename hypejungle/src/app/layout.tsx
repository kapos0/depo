import localFont from "next/font/local"
import "@/assets/globals.css"
import Navbar from "@/components/Navbar"
import "easymde/dist/easymde.min.css"

const workSans = localFont({
    src: [
        {
            path: "../assets/fonts/WorkSans-Black.ttf",
            weight: "900",
            style: "normal",
        },
        {
            path: "../assets/fonts/WorkSans-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "../assets/fonts/WorkSans-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../assets/fonts/WorkSans-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../assets/fonts/WorkSans-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../assets/fonts/WorkSans-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../assets/fonts/WorkSans-Black.ttf",
            weight: "900",
            style: "normal",
        },
        {
            path: "../assets/fonts/WorkSans-Thin.ttf",
            weight: "200",
            style: "normal",
        },
        {
            path: "../assets/fonts/WorkSans-ExtraLight.ttf",
            weight: "100",
            style: "normal",
        },
    ],
    variable: "--font-work-sans",
})

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
            <body className={workSans.variable}>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    )
}
