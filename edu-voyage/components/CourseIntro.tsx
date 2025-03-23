import React, { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { UserContext } from "@/lib/UserContext";

import {
    doc,
    setDoc,
    getDoc,
    query,
    where,
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import Button from "./Button";

import { imageAssets } from "@/assets/constant/Option";
import Colors from "@/assets/constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CourseIntro({
    course,
    enroll,
}: {
    course?: Record<string, unknown>;
    enroll?: boolean;
}) {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    if (!course) return null;

    async function enrollCourse() {
        setLoading(true);
        const coursesRef = collection(db, "courses");
        const q = query(
            coursesRef,
            where("createdBy", "==", user?.email),
            where("courseTitle", "==", course?.courseTitle)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            setLoading(false);
            alert("You are already enrolled in this course.");
            return;
        }

        const docId = user?.email + " " + Date.now().toString();
        const data = {
            ...Object.fromEntries(
                Object.entries(course || {}).filter(
                    ([key]) =>
                        key !== "completedChapters" && key !== "quizResults"
                )
            ),
            createdBy: user?.email,
            createdAt: Date.now(),
            enrolled: true,
        };
        await setDoc(doc(db, "courses", docId), data);
        setLoading(false);
        router.push({
            pathname: `/course-view/[courseId]`,
            params: {
                courseId: docId,
                courseParam: JSON.stringify(data),
                enrollParam: JSON.stringify(enroll),
            },
        });
    }

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
                {enroll ? (
                    <Button
                        text="Enroll Now"
                        type="fill"
                        loading={loading}
                        onPress={enrollCourse}
                    />
                ) : (
                    <Button text="Start Now" type="fill" onPress={() => {}} />
                )}
            </View>
            <Pressable
                style={styles.backButton}
                onPress={() => router.push("/(tabs)/home")}
            >
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
