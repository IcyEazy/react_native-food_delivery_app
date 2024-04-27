import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
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
  let item = params;
  //   console.log("Restaurant: ", item);
  const dispatch = useDispatch();

  useEffect(() => {
    if (item && item._id) {
      dispatch(setRestaurant({ ...item }));
    }
  }, []);
  return (
    <View>
      <CartIcon />
      <StatusBar barStyle={"light-content"} />
      <ScrollView>
        <View className="relative">
          <Image
            className="w-full h-72"
            source={{ uri: item.image ? imageUrlFor(item.image).url() : "" }}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-[#F9F9F9] -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">{item.name}</Text>
            <View className="flex-row gap-2 my-1">
              <View className="flex-row items-center gap-1">
                <Text className="text-yellow-500 text-xl">&#9733;</Text>
                <Text className="text-xs">
                  <Text className="text-gray-700">{item.rating}</Text>
                  <Text className="text-gray-700">
                    ({item.reviews} reviews) •{" "}
                    <Text className="font-semibold">{item?.type?.name}</Text>
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Icon.MapPin color="gray" width={15} height={15} />
                <Text className="text-gray-700 text-xs">
                  Nearby• {item.address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2">{item.description}</Text>
          </View>
        </View>
        <View className="pb-36 bg-[#F9F9F9]">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {/* dishes */}
          {item.dishes.map((dish, index) => (
            <DishRow key={index} dish={{ ...dish }} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
