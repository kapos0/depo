import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import Colors from "@/assets/constant/Colors";

type ButtonProps = {
    text: string;
    type: "fill" | "outline";
    onPress: () => void;
};

export default function Button({ text, type, onPress }: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, styles[type]]}
        >
            <Text
                style={[
                    styles.buttonText,
                    { color: type === "fill" ? Colors.WHITE : Colors.PRIMARY },
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 15,
        width: "100%",
        borderRadius: 15,
        marginTop: 15,
    },
    fill: {
        backgroundColor: Colors.PRIMARY,
    },
    outline: {
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 18,
    },
});
