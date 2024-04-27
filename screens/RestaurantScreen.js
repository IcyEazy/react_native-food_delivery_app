import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import DishRow from "../components/DishRow";
import CartIcon from "../components/CartIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../slices/restaurantSlice";
import { imageUrlFor } from "../sanity";

export default function RestaurantScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  let restaurant = params;
  //   console.log("Restaurant: ", item);
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurant && restaurant._id) {
      dispatch(setRestaurant({ ...restaurant }));
    }
  }, []);

  const ios = Platform.OS === "ios";
  return (
    <View>
      <CartIcon />
      <StatusBar barStyle={"light-content"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative">
          <Image
            className="w-full h-72"
            source={{
              uri: restaurant.image ? imageUrlFor(restaurant.image).url() : "",
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className={`absolute ${
              ios ? "top-14" : "top-7"
            } left-4 bg-gray-50 p-2 rounded-full shadow`}
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">{restaurant.name}</Text>
            <View className="flex-row gap-2 my-1">
              <View className="flex-row items-center gap-1">
                <Text className="text-yellow-500 text-xl">&#9733;</Text>
                <Text className="text-xs">
                  <Text className="text-gray-700">{restaurant.rating}</Text>
                  <Text className="text-gray-700">
                    ({restaurant.reviews} reviews) •{" "}
                    <Text className="font-semibold">
                      {restaurant?.type?.name}
                    </Text>
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
            <Text className="text-gray-500 mt-2">{restaurant.description}</Text>
          </View>
        </View>
        <View className="pb-36 bg-[#F9F9F9]">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {/* dishes */}
          {restaurant.dishes.map((dish, index) => (
            <DishRow key={index} dish={{ ...dish }} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
