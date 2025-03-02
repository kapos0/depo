import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AddNoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";

export default function NotesPage() {
    const [notes, setNotes] = useState([
        { id: 1, content: "This is the first note" },
        { id: 2, content: "This is the second note" },
        { id: 3, content: "This is the third note" },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState("");

    function addNote() {
        if (newNote.trim() === "") return;

        setNotes((prev) => [
            ...prev,
            {
                id: notes.length + 1,
                content: newNote.trim(),
            },
        ]);
        setNewNote("");
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <NoteList notes={notes} />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+ Add a note</Text>
            </TouchableOpacity>
            <AddNoteModal
                modalVisible={modalVisible}
                addNote={addNote}
                setModalVisible={setModalVisible}
                newNote={newNote}
                setNewNote={setNewNote}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 16,
    },
    noNotesText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "#555",
        marginTop: 15,
    },
});
