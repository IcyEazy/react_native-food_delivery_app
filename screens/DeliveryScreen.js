import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { featured } from "../constants";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { emptyCart } from "../slices/cartSlice";
import { clearSearch } from "../slices/searchSlice";

export default function DeliveryScreen() {
  const restaurant = useSelector(selectRestaurant);
  //   const restaurant = featured[0].restaurants[0];
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cancelOrder = () => {
    navigation.navigate("Home");
    dispatch(emptyCart());
    dispatch(clearSearch());
  };

  return (
    <View className="flex-1">
      {/* map view */}
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        className="flex-1"
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.name}
          description={restaurant.description}
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>
      <View className="rounded-t-3xl -mt-12 bg-[#f9f9f9] relative">
        <View className="flex-row justify-between items-center px-5 pt-10">
          <View>
            <Text className="text-lg text-gray-700 font-semibold">
              Estimated Arrival
            </Text>
            <Text className="text-3xl text-gray-700 font-extrabold">
              45-55 Minutes
            </Text>
            <Text className="text-lg mt-2 text-gray-700 font-semibold">
              Your order at {restaurant.name}
            </Text>
            <Text className="text-lg mt-2 text-gray-700 font-semibold">
              is on its way! 🚚
            </Text>
          </View>
          <Image
            className="w-24 h-24"
            source={require("../assets/images/deliveryGuy.jpeg")}
          />
        </View>
        <View
          className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
          style={{ backgroundColor: themeColors.bgColor(1) }}
        >
          <View
            className="p-1 rounded-full"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
          >
            <Image
              source={require("../assets/images/eazy.jpeg")}
              className="w-16 h-16 rounded-full"
            />
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-lg text-white font-bold">Israel Collins</Text>
            <Text className="font-semibold text-white">Your Rider</Text>
          </View>
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity className="bg-white p-2 rounded-full">
              <Icon.Phone
                fill={themeColors.bgColor(1)}
                stroke={themeColors.bgColor(1)}
                width={24}
                height={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancelOrder}
              className="bg-white p-2 rounded-full"
            >
              <Icon.X stroke={"red"} strokeWidth={4} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
