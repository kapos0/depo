import { View, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constant/Colors";
import Header from "@/components/Header";
import EmptyState from "@/components/EmptyState";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Header />
            <EmptyState />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: "100%",
    },
});
