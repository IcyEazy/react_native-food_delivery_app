import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
// import { categories } from "../constants";
import { getCategories } from "../api";
import { imageUrlFor } from "../sanity";
import { useDispatch } from "react-redux";
import { setCategory } from "../slices/searchSlice";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    getCategories().then((data) => {
      // console.log("got data: ", data);
      setCategories(data);
    });
  }, []);

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((category, index) => {
          let isActive = activeCategory === category._id;
          let btnClass = isActive ? " bg-gray-600" : " bg-gray-200";
          let textClass = isActive
            ? " font-semibold text-gray-800"
            : " text-gray-500";
          return (
            <View key={index} className="flex justify-center items-center mr-6">
              <TouchableOpacity
                onPress={() => {
                  handleCategoryPress(category._id);
                  dispatch(setCategory(category.name));
                }}
                className={`p-1 rounded-full shadow bg-gray-200 ${btnClass}`}
              >
                <Image
                  source={{ uri: imageUrlFor(category.image).url() }}
                  className="w-[45px] h-[45px] rounded-full object-cover"
                />
              </TouchableOpacity>
              <Text className={`text-sm ${textClass}`}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
