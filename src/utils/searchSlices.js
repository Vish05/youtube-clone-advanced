import { createSlice } from "@reduxjs/toolkit";

const searchSlide = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResults: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { cacheResults } = searchSlide.actions;
export default searchSlide.reducer;
