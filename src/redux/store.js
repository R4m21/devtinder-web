import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    feed: feedReducer,
  },
});

export default store;
