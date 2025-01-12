import AddHabitForm from "@/components/AddHabitForm";
import AddNewHabitHeader from "@/components/AddHabitHeader";
import { ScrollView } from "react-native";

export default function AddNewHabitPage() {
    return (
        <ScrollView>
            <AddNewHabitHeader />
            <AddHabitForm />
        </ScrollView>
    );
}
