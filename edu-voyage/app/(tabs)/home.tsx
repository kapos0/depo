import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, FlatList } from "react-native";

import Header from "@/components/Header";
import NoContent from "@/components/NoContent";

import { UserContext } from "@/lib/UserContext";

import { db } from "@/lib/firebase";
import {
    collection,
    DocumentSnapshot,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import Colors from "@/assets/constant/Colors";
import CourseList from "@/components/CourseList";
import Practices from "@/components/Practices";
import CourseProgress from "@/components/CourseProgress";

export default function HomePage() {
    const { user } = useContext(UserContext);
    const [courses, setCourses] = useState<Record<string, unknown>[]>([]);

    async function getCourses() {
        setCourses([]);
        const coursesQuery = query(
            collection(db, "courses"),
            where("createdBy", "==", user?.email)
        );
        const coursesSnapshot = await getDocs(coursesQuery);
        coursesSnapshot.forEach((course: DocumentSnapshot) => {
            const courseData = course.data();
            if (courseData) setCourses((prev) => [...(prev || []), courseData]);
        });
    }

    useEffect(() => {
        user && getCourses();
    }, [user]);

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <FlatList
                data={[]}
                renderItem={() => null}
                ListHeaderComponent={
                    courses?.length === 0 ? (
                        <NoContent />
                    ) : (
                        <View>
                            <CourseProgress courses={courses} />
                            <Practices />
                            <CourseList courses={courses} />
                        </View>
                    )
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
});
