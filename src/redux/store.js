import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
  },
});

export default store;
