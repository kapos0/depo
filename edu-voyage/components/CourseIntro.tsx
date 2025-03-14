import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import Button from "./Button";

import { imageAssets } from "@/assets/constant/Option";
import Colors from "@/assets/constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CourseIntro({
    course,
}: {
    course?: Record<string, unknown>;
}) {
    const router = useRouter();
    if (!course) return null;
    return (
        <View>
            <Image
                source={
                    imageAssets[
                        course?.banner_image as keyof typeof imageAssets
                    ]
                }
                style={styles.image}
            />
            <View style={styles.innerContainer}>
                <Text style={styles.courseTitleText}>
                    {course?.courseTitle as string}
                </Text>
                <View style={styles.courseChapters}>
                    <Ionicons
                        name="book-outline"
                        size={20}
                        color={Colors.PRIMARY}
                    />
                    <Text style={{ color: Colors.PRIMARY }}>
                        {(course?.chapters as { length: number })?.length}{" "}
                        Chapters
                    </Text>
                </View>
                <Text style={styles.courseDescHeadingText}>Description: </Text>
                <Text style={styles.courseDescText}>
                    {course?.description as string}
                </Text>
                <Button text="Start Now" type="fill" onPress={() => {}} />
            </View>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 280,
    },
    innerContainer: {
        padding: 20,
    },
    courseTitleText: {
        fontWeight: "bold",
        fontSize: 25,
    },
    courseChapters: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        marginVertical: 5,
    },
    courseDescHeadingText: {
        fontWeight: "bold",
        fontSize: 18,
    },
    courseDescText: {
        fontSize: 18,
        color: Colors.GRAY,
    },
    backButton: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 50,
    },
});
