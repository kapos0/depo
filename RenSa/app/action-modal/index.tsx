import HabitItem from "@/components/HabitItem";
import Colors from "@/constant/Colors";
import { HabitType } from "@/lib/Types";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import moment from "moment";

export default function ActionModalPage() {
    const router = useRouter();
    const { item, selectedDate } = useLocalSearchParams();
    const parsedHabit: HabitType & { docId: string } = JSON.parse(
        item as string
    );
    const [loading, setLoading] = useState<boolean>(false);
    async function UpdateActionStatus(status: "Missed" | "Compeleted") {
        try {
            const docRef = doc(db, "habitTracker", parsedHabit?.docId);
            setLoading(true);
            await updateDoc(docRef, {
                actions: arrayUnion({
                    status: status,
                    time: moment().format("LT"),
                    date: selectedDate,
                }),
            });
            setLoading(true);
            router.push("/");
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }
    return (
        <View style={styles.container}>
            <Image
                source={require("@/assets/images/notification.gif")}
                style={styles.image}
            />
            <Text style={styles.textSelectedDate}>{selectedDate}</Text>
            <Text style={styles.textReminder}>{parsedHabit.reminder}</Text>
            <Text style={styles.subText}>It's time to make</Text>
            <HabitItem habitItem={parsedHabit} />
            {loading ? (
                <Text style={styles.textReminder}>Loading...</Text>
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => UpdateActionStatus("Missed")}
                    >
                        <Ionicons name="close-outline" size={24} color="red" />
                        <Text style={styles.closeButtonText}>Missed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.successButton}
                        onPress={() => UpdateActionStatus("Compeleted")}
                    >
                        <Ionicons
                            name="checkmark-outline"
                            size={24}
                            color="white"
                        />
                        <Text style={styles.successButtonText}>Completed</Text>
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity
                onPress={() => router.back()}
                style={styles.dismissButton}
            >
                <Ionicons name="close-circle" size={45} color={Colors.GRAY} />
                <Text>Dismiss</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.WHITE,
        height: "100%",
    },
    image: {
        width: 120,
        height: 120,
    },
    textSelectedDate: {
        fontSize: 18,
    },
    textReminder: {
        fontSize: 42,
        fontWeight: "bold",
        color: Colors.PRIMARY,
    },
    subText: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
        marginTop: 25,
    },
    closeButton: {
        padding: 10,
        flexDirection: "row",
        gap: 6,
        borderWidth: 1,
        alignItems: "center",
        borderColor: "red",
        borderRadius: 10,
    },
    closeButtonText: {
        fontSize: 20,
        color: "red",
    },
    successButton: {
        padding: 10,
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: Colors.GREEN,
    },
    successButtonText: {
        fontSize: 20,
        color: Colors.WHITE,
    },
    dismissButton: {
        position: "absolute",
        bottom: 55,
    },
});
