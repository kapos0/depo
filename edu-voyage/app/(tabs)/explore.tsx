import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import ExploreCourseList from "@/components/ExploreCourseList";

import { CourseCategory } from "@/assets/constant/Option";
import Colors from "@/assets/constant/Colors";

export default function ExplorePage() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Explore More Courses</Text>
            {CourseCategory.map((item, index) => (
                <View key={index} style={styles.catContainer}>
                    <ExploreCourseList category={item} />
                </View>
            ))}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: "100%",
        flex: 1,
    },
    heading: {
        fontWeight: "bold",
        fontSize: 30,
    },
    catContainer: {
        marginTop: 10,
    },
    catTitle: {
        fontWeight: "bold",
        fontSize: 20,
    },
});
