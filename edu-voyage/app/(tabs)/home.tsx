import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import Header from "@/components/Header";

import NoContent from "@/components/NoContent";

import Colors from "@/assets/constant/Colors";

export default function HomePage() {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <NoContent />
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
