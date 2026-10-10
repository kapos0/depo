import "@/global.css";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fonstLoaded] = useFonts({
        "sans-regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
        "sans-bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
        "sans-semibold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
        "sans-medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
        "sans-light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
        "sans-extrabold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    });

    useEffect(() => {
        if (fonstLoaded) SplashScreen.hideAsync();
    }, [fonstLoaded]);
    if (!fonstLoaded) return null;

    return <Stack screenOptions={{ headerShown: false }} />;
}
