import { createSlice } from "@reduxjs/toolkit";
import { removeUser } from "./userSlice";

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
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state, action) => {
      return [];
    });
  },
});

export const { addFeed, updateFeed, removedFeed } = feedSlice.actions;
export default feedSlice.reducer;
