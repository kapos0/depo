import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { auth } from "@/lib/FirebaseConfig";
import Colors from "@/constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
    const user = auth.currentUser;

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.container}>
                    <Image
                        source={require("@/assets/images/smiley.png")}
                        style={styles.image}
                    />
                    <Text style={styles.text}>
                        Hello {user?.displayName} 👋
                    </Text>
                </View>
                <Ionicons
                    name="settings-outline"
                    size={34}
                    color={Colors.DARK_GRAY}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        marginTop: 20,
    },
    innerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
    },
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    image: {
        width: 45,
        height: 45,
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
    },
});
