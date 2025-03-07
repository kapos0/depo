import { useState } from "react";
import { Stack } from "expo-router";
import { UserContext } from "@/lib/UserContext";
import { User } from "firebase/auth";

export default function RootLayout() {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Stack screenOptions={{ headerShown: false }} />
        </UserContext.Provider>
    );
}
