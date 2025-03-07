import React from "react";
import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <Ionicons
                                name="home-outline"
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarLabel: "Home",
                }}
            />
        </Tabs>
    );
}
