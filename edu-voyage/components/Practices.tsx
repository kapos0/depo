import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { PraticeOption } from "@/assets/constant/Option";
import Colors from "@/assets/constant/Colors";

export default function Practices() {
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Practices</Text>
            <FlatList
                data={PraticeOption}
                numColumns={3}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.practiceContainer}>
                        <Image
                            source={item?.image}
                            style={styles.practiceImage}
                        />
                        <Text style={styles.practiceText}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    headingText: {
        fontSize: 25,
        fontWeight: "bold",
    },
    practiceContainer: {
        flex: 1,
        margin: 5,
        marginLeft: 10,
        aspectRatio: 1,
    },
    practiceImage: {
        width: "100%",
        height: "100%",
        maxHeight: 160,
        borderRadius: 15,
    },
    practiceText: {
        position: "absolute",
        padding: 15,
        fontSize: 15,
        color: Colors.WHITE,
    },
});
