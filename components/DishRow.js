import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectCartItemsById,
} from "../slices/cartSlice";
import { imageUrlFor } from "../sanity";

export default function DishRow({ dish }) {
  const dispatch = useDispatch();
  const totalItems = useSelector((state) =>
    selectCartItemsById(state, dish._id)
  );

  const handleIncrease = () => {
    dispatch(addToCart({ ...dish }));
  };

  const handleDecrease = () => {
    dispatch(removeFromCart({ id: dish._id }));
  };

  return (
    <View className="flex-row items-center bg-[#F9F9F9] p-3 rounded-3xl shadow-2xl mb-3 mx-2">
      <Image
        className="rounded-3xl"
        source={{ uri: imageUrlFor(dish.image).url() }}
        style={{ width: 100, height: 100 }}
      />
      <View className="flex flex-1 space-y-3">
        <View className="pl-3">
          <Text className="text-xl">{dish.name}</Text>
          <Text className="text-gray-700">{dish.description}</Text>
        </View>
        <View className="flex-row justify-between pl-3 items-center">
          <Text className="text-gray-700 text-lg font-bold">${dish.price}</Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={handleDecrease}
              disabled={!totalItems.length}
              className="p-1 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}
            >
              <Icon.Minus
                strokeWidth={2}
                height={20}
                width={20}
                stroke="white"
              />
            </TouchableOpacity>
            <Text className="px-3">{totalItems.length}</Text>
            <TouchableOpacity
              onPress={handleIncrease}
              className="p-1 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}
            >
              <Icon.Plus
                strokeWidth={2}
                height={20}
                width={20}
                stroke="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
