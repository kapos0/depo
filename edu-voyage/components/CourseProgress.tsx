import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

import Colors from "@/assets/constant/Colors";
import { imageAssets } from "@/assets/constant/Option";

export default function CourseProgress({
    courses,
}: {
    courses: Record<string, unknown>[];
}) {
    function getProgress(course: {
        completedChapters?: { length: number }[];
        chapters?: { length: number }[];
    }): number | undefined {
        const completedChapters = course?.completedChapters?.length;
        const totalChapters = course?.chapters?.length;
        if (completedChapters && totalChapters)
            return completedChapters / totalChapters;
        else return undefined;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Progress</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={courses}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.proggresContainer}>
                        <Image
                            source={
                                imageAssets[
                                    item?.banner_image as keyof typeof imageAssets
                                ]
                            }
                            style={styles.proggresImage}
                        />
                        <View style={styles.proggressChapters}>
                            <Text
                                numberOfLines={2}
                                style={styles.proggressTitle}
                            >
                                {item?.courseTitle as string}
                            </Text>
                            <Text style={styles.proggressText}>
                                {(item?.chapters as { length: number })?.length}{" "}
                                Chapters
                            </Text>
                            <Progress.Bar
                                progress={getProgress(item) || 0}
                                width={250}
                            />
                            <Text style={styles.proggressBarText}>
                                {Array.isArray(item?.completedChapters)
                                    ? item.completedChapters.length
                                    : 0}{" "}
                                of{" "}
                                {Array.isArray(item?.chapters)
                                    ? item.chapters.length
                                    : 0}{" "}
                                Chapters Completed
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    headingText: {
        fontSize: 25,
        fontWeight: "bold",
    },
    proggresContainer: {
        padding: 15,
        margin: 7,
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 15,
        flex: 1,
        flexDirection: "row",
        gap: 10,
    },
    proggressChapters: {
        flex: 1,
    },
    proggresImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    proggressTitle: {
        fontWeight: "bold",
        fontSize: 19,
    },
    proggressText: { fontSize: 15, marginBottom: 3 },
    proggressBarText: { marginTop: 5 },
});
