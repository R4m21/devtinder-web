import { createSlice } from "@reduxjs/toolkit";

const requesdtsSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return [...state, ...action.payload];
    },
    removeRequests: () => {
      return [];
    },
  },
});

export const { addRequests, removeRequests } = requesdtsSlice.actions;
export default requesdtsSlice.reducer;
