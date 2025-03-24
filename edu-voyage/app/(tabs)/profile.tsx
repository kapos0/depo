import React, { useContext, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { auth } from "@/lib/firebase";
import { UserContext } from "@/lib/UserContext";

import Colors from "@/assets/constant/Colors";
import Button from "@/components/Button";

export default function ProfilePage() {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    if (!user) auth.currentUser && router.push("/auth/signIn");

    async function handleLogOut() {
        setLoading(true);
        await auth.signOut();
        setLoading(false);
        router.push("/auth/signIn");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Profile</Text>
            <Image
                source={require("@/assets/images/logo.png")}
                style={styles.userImage}
            />
            <View style={styles.userDetails}>
                <Text style={styles.usernameText}>{user?.username}</Text>
                <Text style={styles.userEmailText}>{user?.email}</Text>
                <Button
                    text="+ Add Course"
                    type="fill"
                    onPress={() => router.push("/add-course")}
                    loading={loading}
                />
                <Button
                    text="Log-Out"
                    type="outline"
                    isDanger
                    onPress={handleLogOut}
                    loading={loading}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        display: "flex",
        flexDirection: "column",
        padding: 25,
    },
    heading: {
        fontSize: 32,
        fontWeight: "bold",
    },
    userImage: {
        height: 240,
        width: 240,
        alignSelf: "center",
    },
    userDetails: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    usernameText: {
        fontWeight: "bold",
        fontSize: 25,
        marginVertical: 10,
    },
    userEmailText: {
        fontSize: 20,
        color: Colors.GRAY,
    },
});
