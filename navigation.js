import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import CartScreen from "./screens/CartScreen";
import OrderPreparingScreen from "./screens/OrderPreparingScreen";
import DeliveryScreen from "./screens/DeliveryScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Restaurant"
          component={RestaurantScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            presentation: "modal",
            headerShown: false,
            animation: "slide_from_bottom",
            animationDuration: 500,
          }}
        />
        <Stack.Screen
          name="OrderPreparing"
          component={OrderPreparingScreen}
          options={{
            headerShown: false,
            presentation: "fullScreenModal",
            animation: "slide_from_bottom",
            animationDuration: 500,
          }}
        />
        <Stack.Screen
          name="Delivery"
          component={DeliveryScreen}
          options={{
            headerShown: false,
            presentation: "fullScreenModal",
            animation: "slide_from_bottom",
            animationDuration: 500,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
