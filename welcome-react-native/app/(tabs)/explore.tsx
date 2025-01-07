import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Explore() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>İşte dostum burada</Text>
        </View>
    );
}

export default Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
    },
});
