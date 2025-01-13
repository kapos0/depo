import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import Colors from "@/constant/Colors";
import Header from "@/components/Header";
import HabitList from "@/components/HabitList";
import { auth } from "@/lib/FirebaseConfig";
import { Redirect } from "expo-router";

export default function HomeScreen() {
    const user = auth.currentUser;
    if (!user) return <Redirect href={"/login"} />;

    return (
        <FlatList
            data={[]}
            renderItem={() => null}
            ListHeaderComponent={
                <View style={styles.container}>
                    <Header />
                    <HabitList />
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: "100%",
    },
});
