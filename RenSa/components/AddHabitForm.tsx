import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import RnDateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constant/Colors";
import { TypeList, WhenToTake } from "@/constant/Options";
import {
    FormatDateForText,
    FormatReminderTime,
    getDateRange,
} from "@/lib/ConverDateTime";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/FirebaseConfig";
import { useRouter } from "expo-router";

export default function AddHabitForm() {
    const user = auth.currentUser;
    const router = useRouter();
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showReminderPicker, setShownReminderPicker] = useState(false);
    const [loading, setLoading] = useState(false);
    interface FormData {
        name?: string;
        type?: { name: string };
        when?: string;
        startDate?: Date;
        endDate?: Date;
        reminder?: string;
        frequency?: string;
    }

    const [formData, setFormData] = useState<FormData>({});
    function handleInputChange(field: keyof FormData, value: any) {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }
    useEffect(() => {
        handleInputChange("startDate", new Date());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    async function SaveHabit(): Promise<void> {
        setLoading(true);
        const docId = Date.now().toString();

        const dates = getDateRange(
            formData.startDate ?? new Date(),
            formData.endDate ?? new Date()
        );
        try {
            await setDoc(doc(db, "habitTracker", docId), {
                ...formData,
                status: "Waiting",
                dates: dates,
                userEmail: user?.email,
                docId: docId,
            });
            setLoading(false);
            router.push("/");
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add habit form</Text>
            <View style={styles.inputContainer}>
                <Ionicons
                    style={styles.icon}
                    name="medkit-outline"
                    size={24}
                    color="black"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Habit Name..."
                    onChangeText={(value) => handleInputChange("name", value)}
                />
            </View>
            <View>
                <FlatList
                    data={TypeList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 15 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.inputContainer,
                                { marginRight: 10 },
                                {
                                    backgroundColor:
                                        item.name === formData?.type?.name
                                            ? Colors.PRIMARY
                                            : Colors.WHITE,
                                },
                            ]}
                            onPress={() => handleInputChange("type", item)}
                        >
                            <Text
                                style={[
                                    styles.typeText,
                                    {
                                        color:
                                            item.name === formData?.type?.name
                                                ? Colors.WHITE
                                                : "#000000",
                                    },
                                ]}
                            >
                                {item?.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons
                    style={styles.icon}
                    name="eyedrop-outline"
                    size={24}
                    color="black"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Frequency"
                    onChangeText={(value) =>
                        handleInputChange("frequency", value)
                    }
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons
                    style={styles.icon}
                    name="time-outline"
                    size={24}
                    color="black"
                />
                <Picker
                    selectedValue={formData?.when}
                    onValueChange={(itemValue, itemIndex) =>
                        handleInputChange("when", itemValue)
                    }
                    style={{ width: "90%" }}
                >
                    {WhenToTake.map((item, index) => (
                        <Picker.Item label={item} key={index} />
                    ))}
                </Picker>
            </View>
            <View style={styles.dateContainer}>
                <TouchableOpacity
                    style={[styles.inputContainer, { flex: 1 }]}
                    onPress={() => setShowStartDate((prev) => !prev)}
                >
                    <Ionicons
                        style={styles.icon}
                        name="calendar-outline"
                        size={24}
                        color="black"
                    />
                    <Text style={styles.text}>
                        {formData.startDate
                            ? FormatDateForText(formData.startDate)
                            : "Start Date"}
                    </Text>
                </TouchableOpacity>
                {showStartDate && (
                    <RnDateTimePicker
                        minimumDate={new Date()}
                        onChange={(event, selectedDate) => {
                            const currentDate =
                                selectedDate || formData.startDate;
                            handleInputChange("startDate", currentDate);
                            setShowStartDate(false);
                        }}
                        value={formData.startDate ?? new Date()}
                    />
                )}
                <TouchableOpacity
                    style={[styles.inputContainer, { flex: 1 }]}
                    onPress={() => setShowEndDate((prev) => !prev)}
                >
                    <Ionicons
                        style={styles.icon}
                        name="calendar-outline"
                        size={24}
                        color="black"
                    />
                    <Text style={styles.text}>
                        {formData.endDate
                            ? FormatDateForText(formData.endDate)
                            : "End Date"}
                    </Text>
                </TouchableOpacity>
                {showEndDate && (
                    <RnDateTimePicker
                        minimumDate={new Date()}
                        onChange={(event, selectedDate) => {
                            const currentDate =
                                selectedDate || formData.endDate;
                            handleInputChange("endDate", currentDate);
                            setShowEndDate(false);
                        }}
                        value={formData.endDate ?? new Date()}
                    />
                )}
            </View>
            <View style={styles.dateContainer}>
                <TouchableOpacity
                    style={[styles.inputContainer, { flex: 1 }]}
                    onPress={() => setShownReminderPicker((prev) => !prev)}
                >
                    <Ionicons
                        style={styles.icon}
                        name="timer-outline"
                        size={24}
                    />
                    <Text style={styles.text}>
                        {formData?.reminder ?? "Add a Reminder"}
                    </Text>
                </TouchableOpacity>
                {showReminderPicker && (
                    <RnDateTimePicker
                        mode="time"
                        onChange={(event, selectedTime) => {
                            const currentTime =
                                selectedTime || formData.reminder;
                            handleInputChange(
                                "reminder",
                                FormatReminderTime(
                                    (
                                        (currentTime as Date) ?? new Date()
                                    ).getTime()
                                )
                            );
                            setShownReminderPicker(false);
                        }}
                        value={
                            formData.reminder
                                ? new Date(`1970-01-01T${formData.reminder}:00`)
                                : new Date()
                        }
                    />
                )}
            </View>
            <TouchableOpacity
                style={[
                    styles.buttonStyle,
                    {
                        marginTop: 15,
                        backgroundColor: loading ? Colors.GRAY : Colors.PRIMARY,
                    },
                ]}
                onPress={() => {
                    if (
                        !formData.name ||
                        !formData.type ||
                        !formData.frequency
                    ) {
                        Alert.alert("Plese fill all the req fields");
                        return;
                    }
                    SaveHabit();
                }}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Wait..." : "Add New Habit"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
    },
    header: {
        fontSize: 25,
        fontWeight: "bold",
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: Colors.WHITE,
        marginTop: 10,
        borderColor: Colors.LIGHT_GRAY_BORDER,
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    icon: {
        color: Colors.PRIMARY,
        borderRightWidth: 1,
        paddingRight: 12,
        borderColor: Colors.GRAY,
    },
    typeText: {
        fontSize: 16,
    },
    text: {
        fontSize: 16,
        padding: 5,
        flex: 1,
        marginLeft: 10,
    },
    dateContainer: {
        flexDirection: "row",
        gap: 10,
    },
    buttonStyle: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        width: "100%",
    },
    buttonText: {
        fontSize: 17,
        color: Colors.WHITE,
        textAlign: "center",
    },
});
