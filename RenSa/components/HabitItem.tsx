import Colors from "@/constant/Colors";
import { HabitType } from "@/lib/Types";
import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HabitItem({
    habitItem,
    selectedDate,
}: {
    habitItem: HabitType;
    selectedDate?: string;
}) {
    return (
        <View style={[styles.container, { marginTop: 15 }]}>
            <View style={styles.subContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: habitItem?.type?.icon }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.textName}>{habitItem?.name}</Text>
                        <Text style={styles.textWhen}>{habitItem?.when}</Text>
                        <Text style={styles.textDose}>
                            {habitItem?.frequency} {habitItem?.type?.name}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.reminderContainer}>
                <Ionicons name="timer-outline" size={24} color="black" />
                <Text style={styles.textReminder}>{habitItem?.reminder}</Text>
            </View>
            <View style={styles.statusContainer}>
                {Array.isArray(habitItem?.actions) &&
                    habitItem?.actions.some(
                        (item: any) => item.date === selectedDate
                    ) && (
                        <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color={Colors.GREEN}
                        />
                    )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        //backgroundColor: Colors.LIGHT_PRIMARY,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY_BORDER,
        marginBottom: 10,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
    imageContainer: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginRight: 15,
    },
    image: {
        width: 60,
        height: 60,
    },
    subContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    textName: {
        fontSize: 22,
        fontWeight: "bold",
    },
    textWhen: {
        fontSize: 17,
    },
    textDose: {
        color: "#000000",
    },
    textReminder: {
        fontWeight: "bold",
        fontSize: 18,
    },
    reminderContainer: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY_BORDER,
        alignItems: "center",
    },
    statusContainer: {
        position: "absolute",
        top: 5,
        padding: 7,
    },
});
