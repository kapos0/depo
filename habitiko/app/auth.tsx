import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen() {
    const theme = useTheme();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title} variant="headlineMedium">
                    {false ? "Create Account" : "Welcome Back"}
                </Text>

                <TextInput
                    label="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="example@gmail.com"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={() => {}}
                />

                <TextInput
                    label="Password"
                    autoCapitalize="none"
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={() => {}}
                />

                {false && (
                    <Text style={{ color: theme.colors.error }}>error</Text>
                )}

                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => {}}
                >
                    {false ? "Sign Up" : "Sign In"}
                </Button>

                <Button
                    mode="text"
                    onPress={() => {}}
                    style={styles.switchModeButton}
                >
                    {false
                        ? "Already have an account? Sign In"
                        : "Don't have an account? Sign Up"}
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
    switchModeButton: {
        marginTop: 16,
    },
});
