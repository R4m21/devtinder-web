import { createSlice } from "@reduxjs/toolkit";
import { removeUser } from "./userSlice";

const requesdtsSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return [...state, ...action.payload];
    },
    updateRequests: (state, action) => {
      return state.filter((item) => item._id !== action.payload.requestId);
    },
    removeRequests: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state, action) => {
      return [];
    });
  },
});

export const { addRequests, updateRequests, removeRequests } =
  requesdtsSlice.actions;
export default requesdtsSlice.reducer;
