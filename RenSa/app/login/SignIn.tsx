import Colors from "@/constant/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/FirebaseConfig";
import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert,
    ToastAndroid,
} from "react-native";

interface SignInParams {
    email: string;
    password: string;
}

export default function SignIn() {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function OnSignIn({ email, password }: SignInParams): void {
        if (!email || !password) {
            if (Platform.OS !== "android") {
                Alert.alert("missing fields");
            } else {
                ToastAndroid.show("missing fields", ToastAndroid.BOTTOM);
            }
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then(async (_userCredential) => {
                router.replace("/(tabs)");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error Message: " + errorMessage);
                if (errorCode === "auth/invalid-credential") {
                    Alert.alert("invalid credential");
                }
            });
    }

    return (
        <View style={styles.textContainer}>
            <Text style={styles.textHeader}>Let's Sign You In</Text>
            <Text style={styles.subText}>Welcome Back</Text>
            <Text style={styles.subText}>You've been missed!</Text>
            <View style={styles.inputContainer}>
                <Text>Email</Text>
                <TextInput
                    placeholder="Email"
                    style={styles.textInput}
                    onChangeText={(value) => setEmail(value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Password</Text>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.textInput}
                    onChangeText={(value) => setPassword(value)}
                />
            </View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => OnSignIn({ email, password })}
            >
                <Text style={styles.button}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.buttonContainer,
                    {
                        backgroundColor: Colors.WHITE,
                        borderWidth: 1,
                        borderColor: Colors.PRIMARY,
                    },
                ]}
                onPress={() => router.push("/login/SignUp")}
            >
                <Text style={[styles.button, { color: Colors.PRIMARY }]}>
                    Create Account
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    textContainer: {
        padding: 25,
    },
    textHeader: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 15,
    },
    subText: {
        marginTop: 10,
        color: Colors.GRAY,
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        fontSize: 17,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: Colors.WHITE,
    },
    inputContainer: { marginTop: 25 },
    buttonContainer: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginTop: 20,
    },
    button: {
        fontSize: 17,
        color: Colors.WHITE,
        textAlign: "center",
    },
});
