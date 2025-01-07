import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Text,
    View,
    TextInput,
    Pressable,
    StyleSheet,
    StatusBar,
    FlatList,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { data, todoDataType } from "@/data/todos";

export default function Index() {
    const [todos, setTodos] = useState<todoDataType[]>(
        data.sort((a, b) => b.id - a.id) // Sort by id in descending order
    );
    const [text, setText] = useState<string>("");
    const [isEditingElId, setIsEditingElId] = useState<number | undefined>(
        undefined
    );
    function addTodo() {
        if (text.trim()) {
            const newId = todos.length > 0 ? todos[0].id + 1 : 1; //because we reversed the list because the first el is the greatest id because of this we use todos[0]
            setTodos([{ id: newId, title: text, completed: false }, ...todos]);
            setText("");
        }
    }

    function handleAddButtonClick() {
        if (isEditingElId === undefined) addTodo();
        else editTodo(isEditingElId, text);
    }

    function toggleCompletedTodo(id: number) {
        setTodos((prev) =>
            prev.map((todo) => {
                if (todo.id == id)
                    return { ...todo, completed: !todo.completed };
                return todo;
            })
        );
    }
    function deleteTodo(id: number) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
    function editTodo(id: number, newTitle: string) {
        setTodos((prev) =>
            prev.map((todo) => {
                if (todo.id == id) return { ...todo, title: newTitle };
                setText("");
                setIsEditingElId(undefined);
                return todo;
            })
        );
    }
    function renderItem({ item }: { item: todoDataType }) {
        return (
            <View style={styles.todoItem}>
                <Text
                    style={[
                        styles.todoText,
                        item.completed && styles.completedText,
                    ]}
                    onPress={() => toggleCompletedTodo(item.id)}
                    onLongPress={() => {
                        setText(item.title);
                        setIsEditingElId(item.id);
                    }}
                >
                    {item.title}
                </Text>
                <Pressable onPress={() => deleteTodo(item.id)}>
                    <MaterialCommunityIcons
                        name="delete-circle"
                        size={36}
                        color="red"
                        selectable={undefined}
                    />
                </Pressable>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new Todo"
                    placeholderTextColor="gray"
                    value={text}
                    onChangeText={setText}
                />
                <Pressable
                    onPress={handleAddButtonClick}
                    style={styles.addButton}
                >
                    <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
            </View>
            <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={(todo) => todo.id.toString()}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        padding: 10,
        width: "100%",
        maxWidth: 1024,
        marginHorizontal: "auto",
        pointerEvents: "auto",
    },
    input: {
        flex: 1,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        fontSize: 18,
        minWidth: 0,
        color: "white",
    },
    addButton: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
    },
    addButtonText: {
        fontSize: 18,
        color: "black",
    },
    todoItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        padding: 10,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "100%",
        maxWidth: 1024,
        marginHorizontal: "auto",
        pointerEvents: "auto",
    },
    todoText: {
        flex: 1,
        fontSize: 18,
        color: "white",
    },
    completedText: {
        textDecorationLine: "line-through",
        color: "gray",
    },
});
