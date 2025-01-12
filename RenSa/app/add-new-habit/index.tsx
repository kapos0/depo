import AddHabitForm from "@/components/AddHabitForm";
import AddNewHabitHeader from "@/components/AddHabitHeader";
import { View, Text, StyleSheet } from "react-native";

export default function AddNewHabitPage() {
    return (
        <View>
            <View>
                <AddNewHabitHeader />
                <AddHabitForm />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
