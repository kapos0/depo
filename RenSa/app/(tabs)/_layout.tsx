import React, { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/FirebaseConfig";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null
    );

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                router.replace("/login");
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (isAuthenticated === null) {
        return null;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="AddNew"
                options={{
                    tabBarLabel: "Add New",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome
                            name="plus-square"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
