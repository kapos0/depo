import Colors from "@/constant/Colors";
import ConstantString from "@/constant/ConstantString";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmptyState() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require("@/assets/images/medicine.png")}
            />
            <Text style={styles.text}>{ConstantString.NoHabits}</Text>
            <Text style={styles.subText}>{ConstantString.HabitsSubText}</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    {ConstantString.AddNewHabitBtn}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        display: "flex",
        alignItems: "center",
    },
    image: {
        width: 120,
        height: 120,
    },
    text: {
        fontSize: 35,
        fontWeight: "bold",
        marginTop: 30,
    },
    subText: {
        fontSize: 16,
        color: Colors.DARK_GRAY,
        textAlign: "center",
        marginTop: 20,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 10,
        width: "100%",
        marginTop: 30,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 17,
        color: Colors.WHITE,
    },
});
