import { StyleSheet, Text, View } from "react-native";

export default function AddHabitScreen() {
    return (
        <View>
            <Text>Add Habit Screen</Text>
            <Text>Here you can add a new habit to track.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
    },

    input: {
        marginBottom: 16,
    },

    frequencyContainer: {
        marginBottom: 24,
    },
});
