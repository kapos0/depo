import { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";

export default function NotesPage() {
    const [notes, setNotes] = useState([
        { id: 1, content: "This is the first note" },
        { id: 2, content: "This is the second note" },
        { id: 3, content: "This is the third note" },
    ]);

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={stylesTemp.noteItem}>
                        <Text style={stylesTemp.noteText}>{item.content}</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add a note</Text>
            </TouchableOpacity>
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
const stylesTemp = StyleSheet.create({
    noteItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    noteText: {
        fontSize: 18,
    },
    delete: {
        fontSize: 18,
        color: "red",
    },
    actions: {
        flexDirection: "row",
    },
    edit: {
        fontSize: 18,
        marginRight: 10,
        color: "blue",
    },
});
