import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AddNoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";
import notesService from "@/services/notesService";

export type NoteType = {
    $id: number;
    content: string;
};

export default function NotesPage() {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchNotes() {
        setLoading(true);
        const response = await notesService.getNotes();
        if (!response.error) {
            // Sadece gerekli alanları içeren yeni bir dizi oluşturur
            const simplifiedNotes =
                response.data?.map((note: any) => ({
                    $id: note.$id,
                    content: note.content,
                })) ?? [];
            setNotes(simplifiedNotes);
        } else {
            setError(response.error);
            Alert.alert("Error", response.error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    function addNote() {
        if (newNote.trim() === "") return;

        setNotes((prev: NoteType[]) => [
            ...prev,
            {
                $id: Math.floor(Math.random() * 1000),
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
