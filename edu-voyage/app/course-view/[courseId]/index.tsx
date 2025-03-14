import React, { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { UserContext } from "@/lib/UserContext";

import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CourseIntro from "@/components/CourseIntro";
import CourseChapters from "@/components/CourseChapters";

import { Colors } from "react-native/Libraries/NewAppScreen";

export default function CourseViewPage() {
    const userEmail = useContext(UserContext).user?.email;
    const { courseParam, courseId } = useLocalSearchParams();
    const [course, setCourse] = useState<DocumentData>();

    async function getCourseById() {
        const docRef = await getDoc(
            doc(db, "courses", userEmail + " " + String(courseId))
        );
        setCourse(docRef.data());
    }

    useEffect(() => {
        if (!courseParam) getCourseById();
        else
            setCourse(
                Array.isArray(courseParam)
                    ? JSON.parse(courseParam[0])
                    : JSON.parse(courseParam)
            );
    }, [courseId]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[]}
                renderItem={() => null}
                ListHeaderComponent={
                    <View>
                        <CourseIntro course={course} />
                        <CourseChapters
                            courseChapters={course?.chapters}
                            completedChapters={course?.completedChapters}
                            docId={course?.docId}
                        />
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
});
