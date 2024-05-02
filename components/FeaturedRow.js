import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import RestaurantCard from "./RestaurantCard";
import { useSelector } from "react-redux";
import { getCategory } from "../slices/searchSlice";

export default function FeaturedRow({ title, restaurants, description }) {
  const categoryName = useSelector(getCategory);
  return (
    <View>
      <View className="flex-row items-center justify-between px-4">
        <View>
          <Text className="text-lg font-bold">{title}</Text>
          <Text className="text-xs text-gray-500">{description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: themeColors.text }} className="font-semibold">
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="py-5 overflow-visible"
      >
        {restaurants?.map((restaurant, index) => {
          if (restaurant?.type?.name !== categoryName && categoryName !== "") {
            return null;
          }
          return <RestaurantCard key={index} restaurant={restaurant} />;
        })}
      </ScrollView>
    </View>
  );
}
