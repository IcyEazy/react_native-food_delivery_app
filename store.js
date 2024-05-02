import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import restaurantSlice from "./slices/restaurantSlice";
import searchSlice from "./slices/searchSlice";
import categoryReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurant: restaurantSlice,
    search: searchSlice,
    category: categoryReducer,
  },
});
