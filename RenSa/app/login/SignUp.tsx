import Colors from "@/constant/Colors";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/FirebaseConfig";
import {
    View,
    Text,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Alert,
} from "react-native";
import { useState } from "react";
import { storeData } from "@/lib/AsyncStorage";

export default function SignUp() {
    const router = useRouter();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function onCreateAccount({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        if (password !== confirmPassword)
            if (Platform.OS !== "android") {
                Alert.alert("passwords do not match");
            } else {
                ToastAndroid.show(
                    "passwords do not match",
                    ToastAndroid.BOTTOM
                );
            }
        if (!email || !password || !userName) {
            if (Platform.OS !== "android") {
                Alert.alert("missing fields");
            } else {
                ToastAndroid.show("missing fields", ToastAndroid.BOTTOM);
            }
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    await updateProfile(user, {
                        displayName: userName,
                    });
                    await storeData("useDetail", user);
                    router.push("/(tabs)");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode == "auth/email-already-in-use")
                        if (Platform.OS !== "android") {
                            ToastAndroid.show(
                                "Email elready exits",
                                ToastAndroid.BOTTOM
                            );
                        } else {
                            Alert.alert("Email already exits");
                        }
                });
        }
    }
    return (
        <View style={styles.textContainer}>
            <Text style={styles.textHeader}>Let's Sign You Up</Text>
            <Text style={styles.subText}>Create your account</Text>
            <Text style={styles.subText}>You've been waited!</Text>
            <View style={styles.inputContainer}>
                <Text>User Name</Text>
                <TextInput
                    placeholder="User Name"
                    style={styles.textInput}
                    onChangeText={(value) => setUserName(value)}
                />
            </View>
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
            <View style={[styles.inputContainer]}>
                <Text style={{ color: Colors.GRAY }}>
                    Re Enter Your Password
                </Text>
                <TextInput
                    placeholder="Re Enter Your Password"
                    secureTextEntry={true}
                    style={styles.textInput}
                    onChangeText={(value) => setConfirmPassword(value)}
                />
            </View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                    onCreateAccount({ email, password });
                }}
            >
                <Text style={styles.button}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push("/login/SignIn")}
                style={[
                    styles.buttonContainer,
                    {
                        backgroundColor: Colors.WHITE,
                        borderWidth: 1,
                        borderColor: Colors.PRIMARY,
                    },
                ]}
            >
                <Text style={[styles.button, { color: Colors.PRIMARY }]}>
                    Do you have an account sign in!
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
