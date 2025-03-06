import React from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./authStyles";
import logoImg from "@/assets/images/logo.png";

export default function SignInPage() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <Image source={logoImg} style={styles.logo} />
            <Text style={styles.containerHeaderText}>Welcome, Log In</Text>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <Pressable
                onPress={() => router.push("/auth/signUp")}
                style={{ marginTop: 25 }}
            >
                <Text style={{ textDecorationLine: "underline" }}>
                    Don't have an account?
                </Text>
            </Pressable>
        </SafeAreaView>
    );
}
