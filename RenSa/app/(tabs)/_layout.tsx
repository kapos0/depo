import React, { useEffect, useState } from "react";
import { Redirect, Tabs, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/FirebaseConfig";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getData } from "@/lib/AsyncStorage";

export default function TabLayout() {
    const router = useRouter();

    async function getUserDetail() {
        const userInfo = getData("userDetail");
        if (!userInfo) return <Redirect href="/login" />;
    }
    useEffect(() => {
        getUserDetail();
    }, []);
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
