import React, { useContext, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import { UserContext } from "@/lib/UserContext";

import styles from "./authStyles";
import logoImg from "@/assets/images/logo.png";
import Colors from "@/assets/constant/Colors";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { user, setUser } = useContext(UserContext);

    async function handleSignIn() {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (response) => {
                const user = response.user;
                setUser(user);
                await getUserFromDB();
                setLoading(false);
                router.replace("/(tabs)/home");
            })
            .catch((error) => {
                console.error((error as Error).message);
                setLoading(false);
                setError((error as Error).message);
                Alert.alert("Error", (error as Error).message);
            });
    }

    async function getUserFromDB() {
        const response = await getDoc(doc(db, "users", email));
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logoImg} style={styles.logo} />
            <Text style={styles.containerHeaderText}>Welcome, Log In</Text>
            {error ? <Text>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(value) => setEmail(value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(value) => setPassword(value)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignIn}
                disabled={loading}
            >
                {!loading ? (
                    <Text style={styles.buttonText}>Sign In</Text>
                ) : (
                    <ActivityIndicator size="large" color={Colors.WHITE} />
                )}
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
