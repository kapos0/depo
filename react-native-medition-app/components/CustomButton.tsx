import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type CustomButtonProps = {
    onPress: () => void;
    title: String;
    textStyles?: String;
    containerStyles?: String;
};

export default function CustomButton({
    onPress,
    title,
    textStyles = "",
    containerStyles = "",
}: CustomButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`bg-white rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
            onPress={onPress}
        >
            <Text className={`font-semibold text-large ${textStyles}`}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}
