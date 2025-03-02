import { FlatList } from "react-native";
import NoteItem from "./NoteItem";
import { NoteType } from "@/app/notes";

export default function NoteList({ notes }: { notes: NoteType[] }) {
    return (
        <FlatList
            data={notes}
            keyExtractor={(item) => item.$id.toString()}
            renderItem={({ item }) => <NoteItem item={item} />}
        />
    );
}
