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

export default function SignUpPage() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <Image source={logoImg} style={styles.logo} />
            <Text style={styles.containerHeaderText}>Create New Account</Text>
            <TextInput style={styles.input} placeholder="User Name" />
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <Pressable
                onPress={() => router.push("/auth/signIn")}
                style={{ marginTop: 25 }}
            >
                <Text style={{ textDecorationLine: "underline" }}>
                    Already have an account?
                </Text>
            </Pressable>
        </SafeAreaView>
    );
}
