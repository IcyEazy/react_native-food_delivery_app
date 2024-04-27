import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function OrderPreparingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    //move to delivery screen after 3 seconds
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 3000);
  }, []);

  return (
    <View className="flex-1 bg-[#f9f9f9] justify-center items-center">
      <Image
        source={require("../assets/images/deliveryBike.gif")}
        className="w-80 h-80"
      />
    </View>
  );
}
