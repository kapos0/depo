import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "@/lib/UserContext";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
    const { user } = useContext(UserContext);
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>Hello, {user?.username}</Text>
                <Text style={styles.subText}>Let's Get Started!</Text>
            </View>
            <TouchableOpacity>
                <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        fontSize: 25,
        fontWeight: "semibold",
    },
    subText: {
        fontSize: 15,
        fontWeight: "thin",
    },
});
