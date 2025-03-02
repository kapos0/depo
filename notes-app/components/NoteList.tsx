import { FlatList } from "react-native";
import NoteItem from "./NoteItem";

export default function NoteList({
    notes,
}: {
    notes: { id: number; content: string }[];
}) {
    return (
        <FlatList
            data={notes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <NoteItem item={item} />}
        />
    );
}
