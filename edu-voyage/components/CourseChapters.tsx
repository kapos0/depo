import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import Colors from "@/assets/constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CourseChapters({
    courseChapters,
}: {
    courseChapters: Record<string, unknown>[];
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.chaptersText}>CourseChapters</Text>
            <FlatList
                data={courseChapters}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.chapterContainer}>
                        <View style={styles.chapterInnerContainer}>
                            <Text style={styles.chapterText}>{index + 1}.</Text>
                            <Text style={styles.chapterText}>
                                {item.chapterName as string}
                            </Text>
                        </View>
                        <Ionicons
                            name="play"
                            size={24}
                            color={Colors.PRIMARY}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    chaptersText: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
    },
    chapterContainer: {
        padding: 18,
        borderWidth: 0.5,
        borderRadius: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    chapterInnerContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    chapterText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
