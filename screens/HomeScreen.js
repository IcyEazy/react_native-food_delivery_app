import {
  View,
  Text,
  StatusBar,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Categories from "../components/Categories";
// import { featured } from "../constants";
import FeaturedRow from "../components/FeaturedRow";
import { getFeaturedRestaurants } from "../api";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSearch, setSearch } from "../slices/searchSlice";

export default function HomeScreen() {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  // const [search, setSearch] = useState(""); // for search bar

  const dispatch = useDispatch();
  const search = useSelector(getSearch); // for search bar
  const handleTextChange = (text) => {
    // for search bar
    dispatch(setSearch(text));
    // setSearch(text);
  };

  const handleTextDebounce = useCallback(debounce(handleTextChange, 2000), []);

  // get featured restaurants data from api
  useEffect(() => {
    getFeaturedRestaurants().then((data) => {
      // console.log("data: ", data);
      setFeaturedRestaurants(data);
    });
  }, []);

  const ios = Platform.OS === "ios";

  return (
    <SafeAreaView style={{ backgroundColor: themeColors.bgColor(0.2) }}>
      <StatusBar barStyle="dark-content" />
      {/* search bar */}
      <View className="flex-row items-center space-x-2 px-4 py-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search stroke="gray" width={25} height={25} />
          <TextInput
            placeholder="Restaurants"
            value={search}
            onChangeText={handleTextDebounce}
            className="ml-2 flex-1"
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height={20} width={20} stroke="gray" />
            <Text className="text-gray-600">New York, NYC</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 rounded-full"
        >
          <Icon.Sliders
            height={20}
            width={20}
            strokeWidth={2.5}
            stroke="white"
          />
        </View>
      </View>

      {/* main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: ios ? 20 : 80,
        }}
      >
        {/* categories */}
        <Categories />

        {/* featured */}
        <View className="mt-5">
          {featuredRestaurants.map((item, index) => {
            let searchValue = search.toLowerCase(); // for search bar
            if (item.name.toLowerCase().includes(searchValue)) {
              return (
                <FeaturedRow
                  key={index}
                  title={item.name}
                  description={item.description}
                  restaurants={item.restaurants}
                />
              );
            } else if (search === "")
              return (
                // for search bar
                <FeaturedRow
                  key={index}
                  title={item.name}
                  description={item.description}
                  restaurants={item.restaurants}
                />
              );
            // return (
            //   <FeaturedRow
            //     key={index}
            //     title={item.name}
            //     description={item.description}
            //     restaurants={item.restaurants}
            //   />
            // );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
