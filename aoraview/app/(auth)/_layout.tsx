import React from "react";
import { Stack } from "expo-router";
import Loader from "@/components/Loader";

export default function AuthLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="sign-in" />
                <Stack.Screen name="sign-up" />
            </Stack>

            <Loader isLoading={false} />
        </>
    );
}
