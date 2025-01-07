import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Pressable,
} from "react-native";
import icedCoffeeImg from "@/assets/images/iced-coffee.png";
import { Link } from "expo-router";

function App() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={icedCoffeeImg}
                resizeMode="cover"
                style={styles.image}
            >
                <Text style={styles.title}>Cofee Shop</Text>
                <Link
                    href="/contact"
                    style={{ marginHorizontal: "auto" }}
                    asChild
                >
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Contact</Text>
                    </Pressable>
                </Link>
            </ImageBackground>
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    image: {
        width: "100%",
        height: "100%",
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    title: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        marginBottom: 120,
    },
    link: {
        color: "white",
        fontSize: 42,
        textDecorationLine: "underline",
        padding: 4,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    button: {
        height: 60,
        borderRadius: 20,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.75)",
        padding: 6,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        padding: 4,
    },
});
