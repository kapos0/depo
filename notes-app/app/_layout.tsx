import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#ff8c00" },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
                contentStyle: {
                    paddingHorizontal: 10,
                    paddingTop: 10,
                    backgroundColor: "#f0f0f0",
                },
            }}
        >
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
        </Stack>
    );
}
