import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function AddNewHabitHeader() {
    const router = useRouter();
    return (
        <View>
            <Image
                source={require("@/assets/images/consult.png")}
                style={styles.image}
            />
            <TouchableOpacity
                onPress={() => {
                    router.back();
                }}
                style={styles.button}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    image: {
        height: 280,
        width: "100%",
    },
    button: {
        position: "absolute",
        padding: 25,
        cursor: "pointer",
    },
});
