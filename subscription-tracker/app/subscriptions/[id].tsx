import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Subscription = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <View>
            <Text>subscription {id}</Text>
            <Link href="/">Go back</Link>
        </View>
    );
};

export default Subscription;
