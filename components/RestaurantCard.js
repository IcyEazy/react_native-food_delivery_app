import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { imageUrlFor } from "../sanity";

export default function RestaurantCard({ restaurant }) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Restaurant", { ...restaurant })}
    >
      <View
        style={{
          shadowColor: themeColors.bgColor(0.2),
          shadowRadius: 7,
          elevation: 7,
          shadowOpacity: 0.2,
        }}
        className="bg-[#F9F9F9] mr-6 rounded-3xl shadow-lg"
      >
        <Image
          className="h-36 w-64 rounded-t-3xl"
          source={{
            uri: restaurant.image ? imageUrlFor(restaurant.image).url() : "",
          }}
        />
        <View className="px-3 pb-4 space-y-2">
          <Text className="font-bold pt-2 text-lg">{restaurant.name}</Text>
          <View className="flex-row items-center gap-1">
            <Text className="text-yellow-500 text-xl">&#9733;</Text>
            <Text className="text-xs">
              <Text className="text-gray-700">{restaurant.rating}</Text>
              <Text className="text-gray-700">
                ({restaurant.reviews} reviews) •{" "}
                <Text className="font-semibold">{restaurant?.type?.name}</Text>
              </Text>
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Icon.MapPin color="gray" width={15} height={15} />
            <Text className="text-gray-700 text-xs">
              Nearby• {restaurant.address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
