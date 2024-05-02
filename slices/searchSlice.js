import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    clearSearch: (state) => {
      state.search = "";
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearch, clearSearch, setCategory } = searchSlice.actions;

export const getSearch = (state) => state.search.search;

export const getCategory = (state) => state.category.category;

// export the reducer

export default searchSlice.reducer;
