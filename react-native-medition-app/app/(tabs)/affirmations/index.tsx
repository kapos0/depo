import AppGradient from "@/components/AppGradient";
import { View, Text, ScrollView } from "react-native";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import GuidedAffirmationsGallery from "@/components/GuidedAffirmationsGallery";
export default function AffirmationsPage() {
    return (
        <View className="flex-1">
            <AppGradient colors={["#2e1f58", "#54426b", "#a790af"]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text className="text-zinc-50 text-3xl font-bold">
                        Change your beliefs with affirmations
                    </Text>
                    <View>
                        {AFFIRMATION_GALLERY.map((gallery, index) => (
                            <GuidedAffirmationsGallery
                                key={index}
                                title={gallery.title}
                                previews={gallery.data}
                            />
                        ))}
                    </View>
                </ScrollView>
            </AppGradient>
        </View>
    );
}
