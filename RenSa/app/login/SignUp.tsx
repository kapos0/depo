import Colors from "@/constant/Colors";
import { useRouter } from "expo-router";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function SignUp() {
    const router = useRouter();
    return (
        <View style={styles.textContainer}>
            <Text style={styles.textHeader}>Let's Sign You Up</Text>
            <Text style={styles.subText}>Create your account</Text>
            <Text style={styles.subText}>You've been waited!</Text>
            <View style={styles.inputContainer}>
                <Text>User Name</Text>
                <TextInput placeholder="User Name" style={styles.textInput} />
            </View>
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
            <View style={[styles.inputContainer]}>
                <Text style={{ color: Colors.GRAY }}>
                    Re Enter Your Password
                </Text>
                <TextInput
                    placeholder="Re Enter Your Password"
                    secureTextEntry={true}
                    style={styles.textInput}
                />
            </View>
            <TouchableOpacity style={styles.buttonContainer}>
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
