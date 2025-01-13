import Colors from "@/constant/Colors";
import { GetDateRangeToText } from "@/lib/ConverDateTime";
import { auth, db } from "@/lib/FirebaseConfig";
import { HabitType } from "@/lib/Types";
import { collection, query, where, getDocs } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native";
import HabitItem from "./HabitItem";
import EmptyState from "./EmptyState";
import { useRouter } from "expo-router";

export default function HabitList() {
    const user = auth.currentUser;
    const router = useRouter();
    const [habitList, setHabitList] = useState<HabitType[]>([]);
    const [dateRange, setDateRange] = useState<
        { date: string; day: string; formattedDate: string }[]
    >([]);
    const [selectedDate, setSelectedDate] = useState(
        moment().format("MM/DD/YYYY")
    );
    const [loading, setLoading] = useState<boolean>(false);

    function GetDateRangeList() {
        const dateRange = GetDateRangeToText();
        setDateRange(dateRange);
    }

    async function GetHabitList() {
        if (!user?.email) return;
        setLoading(true);
        try {
            const q = query(
                collection(db, "habitTracker"),
                where("userEmail", "==", user.email),
                where("dates", "array-contains", selectedDate)
            );
            const querySnapshot = await getDocs(q);

            const habits: HabitType[] = [];
            querySnapshot.forEach((doc) => {
                habits.push(doc.data() as HabitType);
            });

            setLoading(false);
            setHabitList(habits);
        } catch (error) {
            setLoading(false);
            console.error("Hata:", error);
        }
    }

    useEffect(() => {
        GetDateRangeList();
    }, []);

    useEffect(() => {
        GetHabitList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    return (
        <View style={styles.container}>
            <Image
                source={require("@/assets/images/medication.jpeg")}
                style={styles.image}
            />
            <FlatList
                data={dateRange}
                horizontal={true}
                style={styles.flatList}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.formattedDate}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedDate(item.formattedDate)}
                        style={[
                            styles.dateContainer,
                            {
                                backgroundColor:
                                    item.formattedDate === selectedDate
                                        ? Colors.PRIMARY
                                        : Colors.LIGHT_GRAY_BORDER,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.subDateText,
                                {
                                    color:
                                        item.formattedDate === selectedDate
                                            ? Colors.WHITE
                                            : "#000000",
                                },
                            ]}
                        >
                            {item.day}
                        </Text>
                        <Text
                            style={[
                                styles.dateText,
                                {
                                    color:
                                        item.formattedDate === selectedDate
                                            ? Colors.WHITE
                                            : "#000000",
                                },
                            ]}
                        >
                            {item.date}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <FlatList
                data={habitList}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: "/action-modal",
                                params: {
                                    item: JSON.stringify(item),
                                    selectedDate,
                                },
                            })
                        }
                    >
                        <HabitItem
                            habitItem={item}
                            selectedDate={selectedDate}
                        />
                    </TouchableOpacity>
                )}
                onRefresh={() => GetHabitList()}
                refreshing={loading}
                ListEmptyComponent={<EmptyState />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 15,
    },
    dateContainer: {
        padding: 15,
        backgroundColor: Colors.LIGHT_GRAY_BORDER,
        display: "flex",
        alignItems: "center",
        marginRight: 10,
        borderRadius: 15,
    },
    subDateText: {
        fontSize: 20,
    },
    dateText: {
        fontSize: 26,
        fontWeight: "bold",
    },
    flatList: {
        marginTop: 15,
    },
});
