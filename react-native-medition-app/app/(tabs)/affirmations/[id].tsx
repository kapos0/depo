import { AntDesign } from "@expo/vector-icons";
import {
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import AppGradient from "@/components/AppGradient";

export default function AffirmationPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
    const [sentences, setSentences] = useState<string[]>([]);
    useEffect(() => {
        for (let i = 0; i < AFFIRMATION_GALLERY.length; i++) {
            const affirmationData = AFFIRMATION_GALLERY[i].data;
            const affirmationToStart = affirmationData.find(
                (a) => a.id === Number(id)
            );
            if (affirmationToStart) {
                setAffirmation(affirmationToStart);
                const affirmationArray = affirmationToStart.text.split(".");
                //Remove the last element if it is empty
                if (affirmationArray[affirmationArray.length - 1] === "")
                    affirmationArray.pop();
                setSentences(affirmationArray);
                return;
            }
        }
    }, []);
    return (
        <View className="flex-1">
            <ImageBackground
                source={affirmation?.image}
                resizeMode="cover"
                className="flex-1"
            >
                <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
                    <Pressable onPress={() => router.back()}>
                        <AntDesign
                            name="leftcircleo"
                            size={24}
                            color="white"
                            className="absolute top-16 left-6 z-10"
                        />
                    </Pressable>
                    <ScrollView
                        className="mt-20"
                        showsVerticalScrollIndicator={false}
                    >
                        <View className="h-full justify-center">
                            <View className="h-4/5 justify-center">
                                {sentences?.map((sentence, index) => (
                                    <Text
                                        key={index}
                                        className="text-white text-2xl mb-12 font-bold text-center"
                                    >
                                        {sentence}.
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                </AppGradient>
            </ImageBackground>
        </View>
    );
}
