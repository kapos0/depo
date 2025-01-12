import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constant/Colors";

export default function LoginScreen() {
    const router = useRouter();
    return (
        <View>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/images/login.png")}
                    style={styles.image}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Stay on Track, Stay on Focus</Text>
                <Text style={styles.subText}>Track your habits, deneme</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/login/SignIn")}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
                <Text style={styles.noteText}>
                    Note: By clicking continue button you will agree to our
                    terms and condition
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: 40,
    },
    image: {
        width: 210,
        height: 450,
        borderRadius: 23,
    },
    textContainer: {
        padding: 25,
        backgroundColor: Colors.PRIMARY,
        height: "100%",
    },
    text: {
        fontSize: 30,
        color: Colors.WHITE,
        textAlign: "center",
        fontWeight: "bold",
    },
    subText: {
        color: Colors.WHITE,
        textAlign: "center",
        fontSize: 17,
        marginTop: 20,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 99,
        marginTop: 25,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
        color: Colors.PRIMARY,
    },
    noteText: {
        color: Colors.WHITE,
        marginTop: 4,
    },
});