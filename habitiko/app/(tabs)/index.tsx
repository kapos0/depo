import {
    client,
    DATABASE_ID,
    databases,
    HABITS_COLLECTION_ID,
    RealtimeResponse,
} from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/lib/databaseTypes";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
//import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Button, Surface, Text } from "react-native-paper";

export default function Index() {
    const router = useRouter();
    const { user, signOut, isLoadingUser } = useAuth();
    if (!user && !isLoadingUser) router.push("/auth");

    const [habits, setHabits] = useState<Habit[]>([]);

    const fetchHabits = useCallback(async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                HABITS_COLLECTION_ID,
                [Query.equal("user_id", user?.$id ?? "")]
            );
            if (response.documents.length > 0)
                setHabits(response.documents as Habit[]);
            else setHabits([]);
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    }, [user]);

    useEffect(() => {
        if (!user) return;
        fetchHabits();
        const channel = `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}`;
        const habitSubscription = client.subscribe(
            channel,
            (response: RealtimeResponse) => {
                if (
                    response.events.includes(
                        "databases.*.collections.*.documents.*.create"
                    ) ||
                    response.events.includes(
                        "databases.*.collections.*.documents.*.update"
                    ) ||
                    response.events.includes(
                        "databases.*.collections.*.documents.*.delete"
                    )
                )
                    fetchHabits(); // for the sake of simplicity, we are fetching all habits again
            }
        );
        return () => {
            habitSubscription();
        };
    }, [user, fetchHabits]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text variant="headlineSmall">Todays Habits</Text>
                <Button mode="text" onPress={signOut} icon={"logout"}>
                    Sign Out
                </Button>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {habits.length > 0 ? (
                    habits.map((habit, key) => (
                        <Surface
                            key={key}
                            style={[styles.card, false && styles.cardCompleted]}
                            elevation={0}
                        >
                            <View style={styles.cardContent} key={key}>
                                <Text style={styles.cardTitle}>
                                    {" "}
                                    {habit.title}
                                </Text>
                                <Text style={styles.cardDescription}>
                                    {habit.description}
                                </Text>
                                <View style={styles.cardFooter}>
                                    <View style={styles.streakBadge}>
                                        <FontAwesome5
                                            name="fire"
                                            size={18}
                                            color="#ff9800"
                                        />
                                        <Text style={styles.streakText}>
                                            {habit.streak_count} day streak
                                        </Text>
                                    </View>
                                    <View style={styles.frequencyBadge}>
                                        <Text style={styles.frequencyText}>
                                            {habit.frequency
                                                .charAt(0)
                                                .toUpperCase() +
                                                habit.frequency.slice(1)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>
                            No Habits yet. Add your first Habit!
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    title: {
        fontWeight: "bold",
    },

    card: {
        marginBottom: 18,
        borderRadius: 18,
        backgroundColor: "#f7f2fa",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },

    cardCompleted: {
        opacity: 0.6,
    },
    cardContent: {
        padding: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#22223b",
    },
    cardDescription: {
        fontSize: 15,
        marginBottom: 16,
        color: "#6c6c80",
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    streakBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff3e0",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    streakText: {
        marginLeft: 6,
        color: "#ff9800",
        fontWeight: "bold",
        fontSize: 14,
    },
    frequencyBadge: {
        backgroundColor: "#ede7f6",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    frequencyText: {
        color: "#7c4dff",
        fontWeight: "bold",
        fontSize: 14,
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyStateText: {
        color: "#666666",
    },
    swipeActionLeft: {
        justifyContent: "center",
        alignItems: "flex-start",
        flex: 1,
        backgroundColor: "#e53935",
        borderRadius: 18,
        marginBottom: 18,
        marginTop: 2,
        paddingLeft: 16,
    },
    swipeActionRight: {
        justifyContent: "center",
        alignItems: "flex-end",
        flex: 1,
        backgroundColor: "#4caf50",
        borderRadius: 18,
        marginBottom: 18,
        marginTop: 2,
        paddingRight: 16,
    },
});
