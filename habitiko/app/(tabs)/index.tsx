import { useAuth } from "@/lib/auth-context";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
    const { signOut } = useAuth();
    return (
        <View>
            <Text>Welcome to the Home Page!</Text>
            <Text>Navigate to the Login page from here.</Text>
            <Button mode="text" onPress={signOut} icon={"logout"}>
                Sign Out
            </Button>
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
