import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      let newCart = [...state.items]; //make a copy of the state
      let itemIndex = state.items.findIndex(
        (item) => item._id === action.payload.id
      ); //find the index of the item in the cart
      if (itemIndex >= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        console.log("Item not found in cart");
      }
      state.items = newCart; //set the state to the new cart
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsById = (state, id) =>
  state.cart.items.filter((item) => item._id === id);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => (total = total + item.price), 0);

export default cartSlice.reducer;
