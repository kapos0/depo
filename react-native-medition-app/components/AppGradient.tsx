import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import Content from "./Content";

export default function AppGradient({
    children,
    colors,
}: {
    children: ReactNode;
    colors: string[];
}) {
    return (
        <LinearGradient
            colors={colors}
            className="flex-1"
        >
            <Content>{children}</Content>
        </LinearGradient>
    );
}
