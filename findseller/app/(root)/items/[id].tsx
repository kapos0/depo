import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function itemPage() {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>itemPage {id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
