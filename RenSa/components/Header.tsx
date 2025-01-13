import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "@/lib/FirebaseConfig";
import Colors from "@/constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function Header() {
    const user = auth.currentUser;
    const router = useRouter();
    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => {
                            auth.signOut()
                                .then(() => {
                                    router.replace("/login");
                                })
                                .catch((error) => {
                                    console.error("Error signing out: ", error);
                                });
                        }}
                    >
                        <Image
                            source={require("@/assets/images/smiley.png")}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}>
                        Hello {user?.displayName} 👋
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        router.push("/add-new-habit");
                    }}
                >
                    <Ionicons
                        name="medkit-outline"
                        size={34}
                        color={Colors.PRIMARY}
                    />
                </TouchableOpacity>
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
