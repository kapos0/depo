import { Text, View, Image, FlatList } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import avatar from "@/assets/images/avatar.png";
import {
    HOME_BALANCE,
    HOME_SUBSCRIPTIONS,
    HOME_USER,
    UPCOMING_SUBSCRIPTIONS,
} from "@/constants/data";
import { icons } from "@/constants/icons";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import ListHeading from "@/components/ListHeading";
import UpComingCard from "@/components/UpComingCard";
import SubsCriptionCard from "@/components/SubsCriptionCard";
import { useState } from "react";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
        string | null
    >(null);
    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
            <FlatList
                ListHeaderComponent={() => (
                    <>
                        <View className="home-header">
                            <View className="home-user">
                                <Image
                                    className="home-avatar"
                                    source={avatar}
                                />
                                <Text className="home-user-name">
                                    {HOME_USER.name}
                                </Text>
                                <Image
                                    source={icons.add}
                                    className="home-add-icon"
                                />
                            </View>
                        </View>
                        <View className="home-balance-card">
                            <Text className="home-balance-label">Balance</Text>
                            <View className="home-balance-row">
                                <Text className="home-balance-amount">
                                    {formatCurrency(HOME_BALANCE.amount)}
                                </Text>
                                <Text className="home-balance-date">
                                    {dayjs(HOME_BALANCE.nextRenewalDate).format(
                                        "MM/DD/YYYY",
                                    )}
                                </Text>
                            </View>
                        </View>
                        <View className="mb-5">
                            <ListHeading title="Upcoming" />
                            <FlatList
                                data={UPCOMING_SUBSCRIPTIONS}
                                renderItem={({ item }) => (
                                    <UpComingCard {...item} />
                                )}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={() => (
                                    <Text className="home-empty-state">
                                        No upcoming subscriptions
                                    </Text>
                                )}
                            />
                        </View>
                        <ListHeading title="All Subscriptions" />
                    </>
                )}
                data={HOME_SUBSCRIPTIONS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SubsCriptionCard
                        {...item}
                        expanded={expandedSubscriptionId === item.id}
                        onPress={() =>
                            setExpandedSubscriptionId(
                                expandedSubscriptionId === item.id
                                    ? null
                                    : item.id,
                            )
                        }
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text className="home-empty-state">
                        No subscriptions found
                    </Text>
                )}
                extraData={expandedSubscriptionId}
                ItemSeparatorComponent={() => <View className="h-4" />}
                contentContainerClassName="pb-30"
            />
        </SafeAreaView>
    );
}
