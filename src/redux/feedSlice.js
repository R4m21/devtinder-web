import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return [...state, ...action.payload];
    },
    updateFeed: (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    },
    removedFeed: (state) => {
      return [];
    },
  },
});

export const { addFeed, updateFeed, removedFeed } = feedSlice.actions;
export default feedSlice.reducer;
