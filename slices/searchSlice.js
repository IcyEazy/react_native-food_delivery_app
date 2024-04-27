import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  search: "",
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
  },
});

// Action creators are generated for each case reducer function
export const { setSearch, clearSearch } = searchSlice.actions;

export const getSearch = (state) => state.search.search;

// export the reducer

export default searchSlice.reducer;
