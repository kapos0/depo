import React from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import CourseIntro from "@/components/CourseIntro";
import CourseChapters from "@/components/CourseChapters";

import { Colors } from "react-native/Libraries/NewAppScreen";

export default function CourseViewPage() {
    const { courseParam } = useLocalSearchParams();
    const course = Array.isArray(courseParam)
        ? JSON.parse(courseParam[0])
        : JSON.parse(courseParam);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[]}
                renderItem={() => null}
                ListHeaderComponent={
                    <View>
                        <CourseIntro course={course} />
                        <CourseChapters courseChapters={course?.chapters} />
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
