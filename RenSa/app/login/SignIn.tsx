import Colors from "@/constant/Colors";
import { useRouter } from "expo-router";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function SignIn() {
    const router = useRouter();
    return (
        <View style={styles.textContainer}>
            <Text style={styles.textHeader}>Let's Sign You In</Text>
            <Text style={styles.subText}>Welcome Back</Text>
            <Text style={styles.subText}>You've been missed!</Text>
            <View style={styles.inputContainer}>
                <Text>Email</Text>
                <TextInput placeholder="Email" style={styles.textInput} />
            </View>
            <View style={styles.inputContainer}>
                <Text>Password</Text>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.textInput}
                />
            </View>
            <TouchableOpacity style={styles.buttonContainer}>
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
