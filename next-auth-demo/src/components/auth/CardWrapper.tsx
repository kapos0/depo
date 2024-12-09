"use client"

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card"
import BackButton from "./BackBtn"
import Header from "./Header"
import Social from "./Social"

type Props = {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

export default function CardWrapper({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocial,
}: Props) {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}
