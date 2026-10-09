import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-background">
            <Text className="text-xl font-bold text-success">
                Welcome to oldu!
            </Text>
            <Link
                href="/onBoarding"
                className="mt-4 rounded bg-primary text-white p-4"
            >
                Go go to On Boarding
            </Link>
            <Link
                href="/(auth)/sign-in"
                className="mt-4 rounded bg-primary text-white p-4"
            >
                Go go to Sign In
            </Link>
            <Link
                href="/(auth)/sign-up"
                className="mt-4 rounded bg-primary text-white p-4"
            >
                Go go to Sign Up
            </Link>
            <Link
                href="/subscriptions/spotify"
                className="mt-4 rounded bg-primary text-white p-4"
            >
                Go to spotify subscription
            </Link>
            <Link
                className="mt-4 rounded bg-primary text-white p-4"
                href={{
                    pathname: "/subscriptions/[id]",
                    params: { id: "gemini" },
                }}
            >
                Go to gemini subscription
            </Link>
        </View>
    );
}
